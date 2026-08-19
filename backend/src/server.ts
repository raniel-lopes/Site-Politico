import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { authenticateToken, AuthRequest } from './middleware/auth.js';

dotenv.config();

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 5000;

// Rate limiters to prevent spam on public contact forms
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Muitas requisições deste IP, tente novamente mais tarde.' }
});

const formLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // Limit each IP to 10 form submissions per hour
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Limite de envio de formulários atingido. Tente novamente em uma hora.' }
});

app.use(cors({
  origin: '*', // Allow all origins for simplicity in development and deployment
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Increase JSON payload limit to allow simple inline/base64 news image uploads
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Helper function to generate slug from title
const generateSlug = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove accents
    .replace(/[^\w\s-]/g, '')       // remove special chars
    .replace(/\s+/g, '-')           // replace spaces with dash
    .replace(/-+/g, '-')            // remove consecutive dashes
    .trim();
};

// Resilient email dispatcher
const sendAlertEmail = async (subject: string, textContent: string) => {
  console.log(`[EMAIL SIMULATOR] Novo e-mail enviado: ${subject}\n---\n${textContent}\n---`);
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.mailtrap.io',
      port: parseInt(process.env.SMTP_PORT || '2525'),
      auth: {
        user: process.env.SMTP_USER || 'mock_user',
        pass: process.env.SMTP_PASS || 'mock_pass',
      },
    });

    const mailOptions = {
      from: `"Mandato Anderson Ninho" <${process.env.SMTP_USER || 'contato@andersonninho.com.br'}>`,
      to: process.env.SMTP_TO || 'contato@andersonninho.com.br',
      subject: `[Site Mandato] ${subject}`,
      text: textContent,
    };

    // Only attempt real send if we don't have mock/default credentials
    if (process.env.SMTP_USER && process.env.SMTP_USER !== 'mock_user' && process.env.SMTP_USER !== '') {
      await transporter.sendMail(mailOptions);
      console.log('[EMAIL] E-mail enviado com sucesso para a assessoria.');
    }
  } catch (error) {
    console.error('[EMAIL ERROR] Falha ao enviar e-mail:', error);
  }
};

// Seed default admin on startup
const seedAdmin = async () => {
  try {
    const userCount = await prisma.user.count();
    if (userCount === 0) {
      const username = process.env.ADMIN_USERNAME || 'admin';
      const password = process.env.ADMIN_PASSWORD || 'admin123';
      const hashedPassword = await bcrypt.hash(password, 10);
      
      await prisma.user.create({
        data: {
          username,
          passwordHash: hashedPassword,
          name: 'Anderson Ninho (Admin)',
          role: 'admin'
        }
      });
      console.log(`[SEED] Usuário administrador criado com sucesso! Usuário: ${username} | Senha: ${password}`);
    }
  } catch (error) {
    console.error('[SEED ERROR] Erro ao seedar usuário admin:', error);
  }
};

// ==========================================
// 1. AUTHENTICATION ENDPOINTS
// ==========================================

app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Usuário e senha são obrigatórios.' });
  }

  try {
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    const secret = process.env.JWT_SECRET || 'mandato_inteligente_super_secret_key_2026_alba';
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      secret,
      { expiresIn: '7d' }
    );

    return res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    console.error('[AUTH ERROR] Erro no login:', error);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});

app.get('/api/auth/me', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: { id: true, username: true, name: true, role: true }
    });
    
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    return res.json(user);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar dados do usuário.' });
  }
});

// ==========================================
// 2. PUBLIC INTAKE ROUTES (Forms)
// ==========================================

// General Contact Form
app.post('/api/contact', formLimiter, async (req, res) => {
  const { name, email, whatsapp, subject, message } = req.body;

  if (!name || !email || !whatsapp || !subject || !message) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  try {
    const savedMsg = await prisma.contactMessage.create({
      data: { name, email, whatsapp, subject, message }
    });

    // Alert assessoria
    await sendAlertEmail(
      `Novo Contato: ${subject} de ${name}`,
      `Nome: ${name}\nE-mail: ${email}\nWhatsApp: ${whatsapp}\nAssunto: ${subject}\nMensagem:\n${message}`
    );

    return res.status(201).json({ success: true, message: 'Mensagem enviada com sucesso!', data: savedMsg });
  } catch (error) {
    console.error('[CONTACT ERROR] Erro ao salvar mensagem:', error);
    return res.status(500).json({ error: 'Erro ao salvar sua mensagem. Tente novamente mais tarde.' });
  }
});

// Suggest Amendment Form
app.post('/api/suggestions', formLimiter, async (req, res) => {
  const { name, email, whatsapp, topic, message } = req.body;

  if (!name || !email || !whatsapp || !topic || !message) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  try {
    const savedSuggestion = await prisma.suggestion.create({
      data: { name, email, whatsapp, topic, message }
    });

    // Alert assessoria
    await sendAlertEmail(
      `Nova Sugestão de Emenda: Tema ${topic}`,
      `Sugestão de: ${name}\nE-mail: ${email}\nWhatsApp: ${whatsapp}\nTema da Emenda: ${topic}\nDetalhes:\n${message}`
    );

    return res.status(201).json({ success: true, message: 'Sugestão de emenda registrada com sucesso!', data: savedSuggestion });
  } catch (error) {
    console.error('[SUGGESTION ERROR] Erro ao salvar sugestão:', error);
    return res.status(500).json({ error: 'Erro ao registrar sugestão.' });
  }
});

// Secure/Anonymous Report Form
app.post('/api/reports', formLimiter, async (req, res) => {
  const { isAnonymous, reporterName, reporterEmail, reporterWhatsapp, description, location } = req.body;

  if (!description) {
    return res.status(400).json({ error: 'A descrição da denúncia é obrigatória.' });
  }

  try {
    const savedReport = await prisma.report.create({
      data: {
        isAnonymous,
        reporterName: isAnonymous ? null : reporterName,
        reporterEmail: isAnonymous ? null : reporterEmail,
        reporterWhatsapp: isAnonymous ? null : reporterWhatsapp,
        description,
        location
      }
    });

    // Alert assessoria
    const reporterDetails = isAnonymous
      ? 'Anônimo'
      : `${reporterName} (E-mail: ${reporterEmail}, WhatsApp: ${reporterWhatsapp})`;

    await sendAlertEmail(
      `Nova Denúncia Recebida (Local: ${location || 'Não informado'})`,
      `Tipo de Denúncia: ${isAnonymous ? 'Anônima' : 'Identificada'}\nDenunciante: ${reporterDetails}\nLocalização: ${location || 'Não informada'}\nDescrição:\n${description}`
    );

    return res.status(201).json({ success: true, message: 'Denúncia registrada com sucesso e enviada ao gabinete de forma segura.', data: savedReport });
  } catch (error) {
    console.error('[REPORT ERROR] Erro ao registrar denúncia:', error);
    return res.status(500).json({ error: 'Erro ao processar sua denúncia.' });
  }
});

// ==========================================
// 3. PUBLIC NEWS ENDPOINTS
// ==========================================

// Get All News (paginated, filterable)
app.get('/api/news', async (req, res) => {
  const { search, category, limit, page } = req.query;
  const parsedLimit = parseInt(limit as string) || 9;
  const parsedPage = parseInt(page as string) || 1;
  const skip = (parsedPage - 1) * parsedLimit;

  try {
    const whereClause: any = {};

    if (category && category !== 'Geral' && category !== 'Todos') {
      whereClause.category = category as string;
    }

    if (search) {
      whereClause.OR = [
        { title: { contains: search as string } },
        { summary: { contains: search as string } },
        { content: { contains: search as string } }
      ];
    }

    const [news, totalCount] = await prisma.$transaction([
      prisma.news.findMany({
        where: whereClause,
        orderBy: { createdAt: 'desc' },
        skip,
        take: parsedLimit
      }),
      prisma.news.count({ where: whereClause })
    ]);

    return res.json({
      news,
      pagination: {
        total: totalCount,
        page: parsedPage,
        limit: parsedLimit,
        pages: Math.ceil(totalCount / parsedLimit)
      }
    });
  } catch (error) {
    console.error('[NEWS ERROR] Erro ao buscar notícias:', error);
    return res.status(500).json({ error: 'Erro ao buscar notícias.' });
  }
});

// Get Single News by Slug
app.get('/api/news/:slug', async (req, res) => {
  const { slug } = req.params;

  try {
    const article = await prisma.news.findUnique({ where: { slug } });
    if (!article) {
      return res.status(404).json({ error: 'Notícia não encontrada.' });
    }
    return res.json(article);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar notícia.' });
  }
});

// ==========================================
// 4. PUBLIC PROJECTS / BILLS ENDPOINTS
// ==========================================

// Get All Projects (filterable by category or search)
app.get('/api/projects', async (req, res) => {
  const { search, category } = req.query;

  try {
    const whereClause: any = {};

    if (category && category !== 'Todos') {
      whereClause.category = category as string;
    }

    if (search) {
      whereClause.OR = [
        { title: { contains: search as string } },
        { description: { contains: search as string } },
        { code: { contains: search as string } }
      ];
    }

    const projects = await prisma.project.findMany({
      where: whereClause,
      orderBy: { date: 'desc' }
    });

    return res.json(projects);
  } catch (error) {
    console.error('[PROJECT ERROR] Erro ao buscar projetos:', error);
    return res.status(500).json({ error: 'Erro ao buscar projetos.' });
  }
});

// ==========================================
// 5. SECURE ADMIN CMS ENDPOINTS
// ==========================================

// Get Admin Statistics
app.get('/api/admin/stats', authenticateToken, async (req, res) => {
  try {
    const newsCount = await prisma.news.count();
    const projectCount = await prisma.project.count();
    const unreadMessages = await prisma.contactMessage.count({ where: { isRead: false } });
    const unreadSuggestions = await prisma.suggestion.count({ where: { isRead: false } });
    const unreadReports = await prisma.report.count({ where: { isRead: false } });

    return res.json({
      newsCount,
      projectCount,
      unreadMessages,
      unreadSuggestions,
      unreadReports,
      totalUnread: unreadMessages + unreadSuggestions + unreadReports
    });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao calcular estatísticas.' });
  }
});

// News CRUD
app.post('/api/news', authenticateToken, async (req, res) => {
  const { title, summary, content, image, category, author } = req.body;

  if (!title || !summary || !content) {
    return res.status(400).json({ error: 'Título, resumo e conteúdo são obrigatórios.' });
  }

  try {
    let slug = generateSlug(title);
    
    // Check for slug collision
    const existing = await prisma.news.findUnique({ where: { slug } });
    if (existing) {
      slug = `${slug}-${Date.now()}`;
    }

    const newArticle = await prisma.news.create({
      data: { title, slug, summary, content, image, category, author }
    });

    return res.status(201).json(newArticle);
  } catch (error) {
    console.error('[ADMIN NEWS POST ERROR]', error);
    return res.status(500).json({ error: 'Erro ao criar notícia.' });
  }
});

app.put('/api/news/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { title, summary, content, image, category, author } = req.body;

  try {
    const article = await prisma.news.findUnique({ where: { id } });
    if (!article) {
      return res.status(404).json({ error: 'Notícia não encontrada.' });
    }

    let slug = article.slug;
    if (title && title !== article.title) {
      slug = generateSlug(title);
      const existing = await prisma.news.findUnique({ where: { slug } });
      if (existing && existing.id !== id) {
        slug = `${slug}-${Date.now()}`;
      }
    }

    const updatedArticle = await prisma.news.update({
      where: { id },
      data: { title, slug, summary, content, image, category, author }
    });

    return res.json(updatedArticle);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao atualizar notícia.' });
  }
});

app.delete('/api/news/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.news.delete({ where: { id } });
    return res.json({ success: true, message: 'Notícia removida com sucesso.' });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao remover notícia.' });
  }
});

// Projects CRUD
app.post('/api/projects', authenticateToken, async (req, res) => {
  const { title, category, description, status, code, link, date } = req.body;

  if (!title || !category || !description || !status) {
    return res.status(400).json({ error: 'Título, categoria, descrição e status são obrigatórios.' });
  }

  try {
    const project = await prisma.project.create({
      data: {
        title,
        category,
        description,
        status,
        code,
        link,
        date: date ? new Date(date) : new Date()
      }
    });

    return res.status(201).json(project);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao criar projeto.' });
  }
});

app.put('/api/projects/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { title, category, description, status, code, link, date } = req.body;

  try {
    const updated = await prisma.project.update({
      where: { id },
      data: {
        title,
        category,
        description,
        status,
        code,
        link,
        date: date ? new Date(date) : undefined
      }
    });

    return res.json(updated);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao atualizar projeto.' });
  }
});

app.delete('/api/projects/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.project.delete({ where: { id } });
    return res.json({ success: true, message: 'Projeto removido.' });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao remover projeto.' });
  }
});

// Admin Message Ingestion Lists
app.get('/api/admin/messages', authenticateToken, async (req, res) => {
  try {
    const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' } });
    return res.json(messages);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar mensagens.' });
  }
});

app.put('/api/admin/messages/:id/read', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { isRead } = req.body;
  try {
    await prisma.contactMessage.update({ where: { id }, data: { isRead } });
    return res.json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao atualizar status.' });
  }
});

app.delete('/api/admin/messages/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.contactMessage.delete({ where: { id } });
    return res.json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao apagar mensagem.' });
  }
});

// Admin Suggestions List
app.get('/api/admin/suggestions', authenticateToken, async (req, res) => {
  try {
    const list = await prisma.suggestion.findMany({ orderBy: { createdAt: 'desc' } });
    return res.json(list);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar sugestões.' });
  }
});

app.put('/api/admin/suggestions/:id/read', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { isRead } = req.body;
  try {
    await prisma.suggestion.update({ where: { id }, data: { isRead } });
    return res.json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao atualizar.' });
  }
});

app.delete('/api/admin/suggestions/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.suggestion.delete({ where: { id } });
    return res.json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao apagar.' });
  }
});

// Admin Reports List
app.get('/api/admin/reports', authenticateToken, async (req, res) => {
  try {
    const list = await prisma.report.findMany({ orderBy: { createdAt: 'desc' } });
    return res.json(list);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar denúncias.' });
  }
});

app.put('/api/admin/reports/:id/status', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { status, isRead } = req.body;
  try {
    await prisma.report.update({ 
      where: { id }, 
      data: { 
        status: status !== undefined ? status : undefined,
        isRead: isRead !== undefined ? isRead : undefined
      } 
    });
    return res.json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao atualizar.' });
  }
});

app.delete('/api/admin/reports/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.report.delete({ where: { id } });
    return res.json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao apagar.' });
  }
});

// Default Fallback
app.use((req, res) => {
  res.status(404).json({ error: 'Recurso não encontrado.' });
});

// Start Server
app.listen(PORT, async () => {
  console.log(`[SERVER] Express rodando na porta ${PORT}`);
  await seedAdmin();
});
