import capaCandidato from '../assets/capa-candidato.png';

import ninhoDesenho from '../assets/ninho-desenho.png';

export const candidateConfig = {
  name: "Anderson Ninho",
  role: "Vereador de Salvador",
  targetRole: "Deputado Estadual",
  state: "Bahia",
  year: "2026",
  party: "PSDB", // Party name
  urnNumber: "", // Empty for pre-campaign, fill when defined
  whatsappNumber: "+55 71 99237-8192", // Gabinete / Assessoria WhatsApp
  email: "contato@andersonninho.com.br",
  phone: "(71) 99237-8192",
  address: "Câmara Municipal de Salvador, Praça Thomé de Souza, s/n - Centro, Salvador - BA, CEP 40020-010",
  googleMapsLink: "https://maps.google.com/?q=Camara+Municipal+de+Salvador",
  
  socials: {
    instagram: "https://instagram.com/andersonninhoba",
    facebook: "https://facebook.com/andersonninhoba",
    twitter: "https://x.com/andersonninhoba",
    youtube: "https://youtube.com/andersonninhoba",
    whatsapp: "https://wa.me/5571992378192"
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
    communitiesAssisted: 78,
    publicHearings: 24,
    approvedIndications: 156
  },

  // Timeline for "Quem Sou Eu" biography
  biographySummary: "Anderson Ninho, o Empregado do Povo, é natural de Salvador, nasceu no bairro de Pau da Lima e reside por mais de três décadas no bairro de Dom Avelar. Atualmente exercendo o mandato de vereador pela 19ª legislatura, iniciou sua vida profissional como zelador de escola e possui formação em Gestão Pública. Com uma trajetória marcada pelo trabalho social desde a juventude e defesa das comunidades de Pau da Lima e Dom Avelar, foi reeleito em 2024 como o 7º vereador mais votado da Bahia e, em abril de 2026, filiou-se ao PSDB.",
  
  timeline: [
    { year: "Origem", title: "Raízes em Salvador", description: "Natural de Salvador, nasceu no bairro de Pau da Lima e reside por mais de três décadas no bairro de Dom Avelar." },
    { year: "Início", title: "Zelador de Escola", description: "Começou a sua vida profissional de forma humilde como zelador de escola antes de chegar à vereança na capital." },
    { year: "2003", title: "Trabalho Social", description: "Demonstrou vocação social desde a adolescência, participando de movimentos históricos como a 'Revolta do Buzu' e pleiteando pavimentação e saneamento." },
    { year: "Estudos", title: "Gestão Pública e Fé", description: "Tornou-se evangélico e sentiu o chamado para servir à sociedade. Graduou-se em Gestão Pública para exercer sua missão com excelência." },
    { year: "2020", title: "Eleito Vereador", description: "Eleito em primeiro lugar no partido PDT com 5.289 votos, iniciando sua trajetória parlamentar na 19ª legislatura de Salvador." },
    { year: "2024", title: "Reeleição Histórica", description: "Reeleito com expressivos 16.203 votos, consagrando-se como o 7º vereador mais votado de toda a Bahia." },
    { year: "2026", title: "Novo Partido: PSDB", description: "Em abril de 2026, filiou-se ao PSDB para seguir defendendo as causas das comunidades e de Salvador." }
  ]
};
