import capaCandidato from '../assets/capa-candidato.png';

import ninhoDesenho from '../assets/ninho-desenho.png';

export const candidateConfig = {
  name: "Anderson Ninho",
  role: "Vereador de Salvador",
  targetRole: "Deputado Estadual",
  state: "Bahia",
  year: "2026",
  party: "Partido Social Democrático - PSD", // Party name
  urnNumber: "", // Empty for pre-campaign, fill when defined
  whatsappNumber: "+5571999999999", // Gabinete / Assessoria WhatsApp
  email: "contato@andersonninho.com.br",
  phone: "(71) 3320-1234",
  address: "Câmara Municipal de Salvador, Praça Thomé de Souza, s/n - Centro, Salvador - BA, CEP 40020-010",
  googleMapsLink: "https://maps.google.com/?q=Camara+Municipal+de+Salvador",
  
  socials: {
    instagram: "https://instagram.com/andersonninhoba",
    facebook: "https://facebook.com/andersonninhoba",
    twitter: "https://x.com/andersonninhoba",
    youtube: "https://youtube.com/andersonninhoba",
    whatsapp: "https://wa.me/5571999999999"
  },

  // Main banner messages
  hero: {
    welcome: "Por uma Bahia mais Forte, Humana e Conectada",
    subtitle: "Anderson Ninho vem liderando um mandato participativo em Salvador focado na defesa dos direitos sociais, tecnologia ativa e desenvolvimento sustentável. Agora, é hora de levar essa força para toda a Bahia.",
    slogan: "PERTO DA GENTE. DO LADO DA BAHIA.",
    backgroundImage: capaCandidato, // Sunset background
    candidatePhoto: ninhoDesenho, // Candidate portrait mockup
    videoLoopUrl: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-beautiful-coastline-42247-large.mp4"
  },

  // Bandeiras principais
  flags: [
    { id: "saude", name: "Saúde Integrada", marker: "●" },
    { id: "educacao", name: "Escola Segura & Tecnologia", marker: "●" },
    { id: "inclusao", name: "Direitos e Inclusão", marker: "●" },
    { id: "assistencia", name: "Assistência Social", marker: "●" },
    { id: "mobilidade", name: "Mobilidade Urbana", marker: "●" },
    { id: "tecnologia", name: "Tecnologia Ativa", marker: "●" }
  ],

  // Real projects/bills showcased
  projects: [
    {
      code: "PL 142/2023",
      title: "Casa do Autista em Salvador",
      category: "Direitos e Inclusão",
      status: "Aprovado",
      description: "Cria centros especializados de atendimento terapêutico e acolhimento para pessoas com Transtorno do Espectro Autista (TEA) e suas famílias."
    },
    {
      code: "PL 89/2023",
      title: "Programa Escola Segura",
      category: "Escola Segura & Tecnologia",
      status: "Em Tramitação",
      description: "Estabelece diretrizes de monitoramento integrado e suporte psicológico nas escolas municipais de Salvador para prevenção de violência."
    },
    {
      code: "PL 210/2024",
      title: "Botão do Comerciante",
      category: "Segurança e Serviços",
      status: "Protocolado",
      description: "Sistema de alerta rápido interligado à Guarda Municipal e Polícia para pequenos comerciantes em situações de emergência de segurança."
    },
    {
      code: "PL 45/2024",
      title: "Museu da Cultura Evangélica",
      category: "Direitos e Inclusão",
      status: "Em Análise",
      description: "Institui o espaço cultural dedicado a preservar e documentar a contribuição histórica, social e artística da comunidade evangélica na Bahia."
    },
    {
      code: "PL 112/2023",
      title: "Programa Tecnologia Ativa",
      category: "Tecnologia Ativa",
      status: "Aprovado",
      description: "Garante laboratórios de informática, ensino de programação e distribuição de tablets para estudantes de regiões de vulnerabilidade social em Salvador."
    }
  ],

  // Statistics for "Numbers of the Mandate"
  stats: {
    billsProtocolled: 34,
    billsApproved: 12,
    emendasAllocated: "R$ 4.8M",
    communitiesAssisted: 78,
    publicHearings: 24,
    approvedIndications: 156
  },

  // Timeline for "Quem Sou Eu" biography
  biographySummary: "Nascido na periferia de Salvador, Anderson Ninho cresceu acompanhando as lutas da sua comunidade por saneamento e transporte de qualidade. Cientista Social formado pela UFBA, iniciou sua atuação liderando projetos comunitários de alfabetização e capacitação tecnológica para jovens. Em 2020, foi eleito Vereador de Salvador com votação expressiva, destacando-se como um dos parlamentares mais atuantes da Câmara Municipal. Agora, com o apoio de lideranças de diversos municípios baianos, apresenta sua pré-candidatura a Deputado Estadual para lutar por saúde integrada, inovação e educação pública em toda a Bahia.",
  
  timeline: [
    { year: "1988", title: "Origem", description: "Nascimento em Salvador, criado na comunidade de Pernambués." },
    { year: "2010", title: "Liderança Estudantil e UFBA", description: "Ingressa em Ciências Sociais na UFBA, participando ativamente de cursinhos populares de alfabetização." },
    { year: "2015", title: "Fundação do Instituto Tecnologia Ativa", description: "Inicia ONG para ensinar programação básica e inclusão digital para jovens da periferia." },
    { year: "2020", title: "Eleição para Vereador", description: "Eleito com 6.450 votos em Salvador, focando seu mandato em saúde, inclusão e educação digital." },
    { year: "2024", title: "Mandato Inteligente e Entrega de PLs", description: "Aprovação de projetos pioneiros como o 'Programa Tecnologia Ativa' e 'Casa do Autista'." },
    { year: "2026", title: "Pré-Candidatura a Deputada Estadual", description: "Ampliando o trabalho de Salvador para toda a Bahia, defendendo um mandato tecnológico e humano." }
  ]
};
