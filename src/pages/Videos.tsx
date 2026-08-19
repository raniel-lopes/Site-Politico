import SEO from '../components/SEO.js';
import { Play } from 'lucide-react';
import { candidateConfig } from '../config/candidate.js';

export default function Videos() {
  const videosList = [
    {
      title: `Balanço Geral de Mandato como ${candidateConfig.role} em Salvador`,
      youtubeId: "dQw4w9WgXcQ", // Placeholder video
      date: "Julho, 2025",
      description: `${candidateConfig.name} apresenta as conquistas, leis aprovadas e a destinação de emendas parlamentares durante seu mandato participativo.`
    },
    {
      title: "Pronunciamento na Câmara sobre a Casa do Autista",
      youtubeId: "dQw4w9WgXcQ",
      date: "Maio, 2024",
      description: "Discurso emocionante em defesa dos direitos terapêuticos de famílias e crianças com Transtorno do Espectro Autista."
    },
    {
      title: "Inclusão Digital nas Escolas: Programa Tecnologia Ativa",
      youtubeId: "dQw4w9WgXcQ",
      date: "Outubro, 2023",
      description: "Entrevista local detalhando o projeto de robótica e programação escolar implementado na periferia de Salvador."
    },
    {
      title: "De Salvador para a Bahia: Encontro com Lideranças do Interior",
      youtubeId: "dQw4w9WgXcQ",
      date: "Fevereiro, 2026",
      description: "Roda de conversa com lideranças comunitárias da Chapada Diamantina sobre saúde integrada e desenvolvimento regional."
    }
  ];

  return (
    <>
      <SEO 
        title="Galeria de Vídeos" 
        description={`Acompanhe discursos, interviews, debates e prestação de contas de ${candidateConfig.name} através de nossa galeria de vídeos.`}
      />

      {/* Page Header */}
      <section className="relative bg-brand-blue-dark text-white pt-36 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ec4899_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <span className="px-4 py-1.5 bg-brand-pink/20 border border-brand-pink/30 rounded-full text-brand-pink-vibrant font-display font-semibold text-xs tracking-wider uppercase mb-4 inline-block">
            Multimídia
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-extrabold tracking-tight">
            Vídeos & Discursos
          </h1>
          <p className="text-white/70 text-sm md:text-base max-w-xl mx-auto mt-4 leading-relaxed">
            Nossa prestação de contas audiovisual. Entrevistas, discursos na tribuna e ações comunitárias em detalhes.
          </p>
        </div>
      </section>

      {/* Video Grid Section */}
      <section className="py-24 bg-brand-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {videosList.map((video, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-3xl overflow-hidden border border-brand-blue/5 shadow-sm flex flex-col h-full group hover:shadow-md transition-shadow"
              >
                {/* Embed Container */}
                <div className="relative aspect-video w-full bg-brand-blue-dark/10">
                  <iframe
                    className="absolute inset-0 w-full h-full border-none"
                    src={`https://www.youtube.com/embed/${video.youtubeId}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                </div>

                {/* Info Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-brand-pink-vibrant text-xs font-bold uppercase tracking-wider mb-2 block">
                    {video.date}
                  </span>
                  <h3 className="font-display font-bold text-lg text-brand-blue-dark leading-snug mb-3">
                    {video.title}
                  </h3>
                  <p className="text-brand-gray-600 text-sm leading-relaxed flex-grow">
                    {video.description}
                  </p>
                  <div className="mt-4 pt-4 border-t border-brand-gray-100 text-xs font-semibold text-brand-blue flex items-center gap-1.5 uppercase tracking-wide">
                    <Play size={12} className="text-brand-pink-vibrant fill-current" />
                    Youtube Player Integrado
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
