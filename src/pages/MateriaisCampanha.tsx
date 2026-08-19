import SEO from '../components/SEO.js';
import { Download, Image, FileText, CheckCircle } from 'lucide-react';
import { candidateConfig } from '../config/candidate.js';

export default function MateriaisCampanha() {
  const assets = [
    {
      title: `Fotos Oficiais ${candidateConfig.name}`,
      type: "Imagens Alta Resolução",
      format: "ZIP / JPG (50MB)",
      description: "Imagens do candidato em reuniões comunitárias, tribuna e retrato oficial de estúdio para divulgação na imprensa."
    },
    {
      title: "Identidade Visual & Logotipos",
      type: "Arquivos Vetoriais",
      format: "PDF / SVG (12MB)",
      description: "Logotipos oficiais com paleta 'Azul, rosa e branco' nas variações vertical, horizontal e monocromática."
    },
    {
      title: "Panfleto Digital Informativo",
      type: "Material de Prestação de Contas",
      format: "PDF Prontos para Impressão (8MB)",
      description: "Resumo das leis aprovadas e emendas destinadas em Salvador, pronto para distribuição digital ou física."
    },
    {
      title: "Banners para Redes Sociais",
      type: "Kit Divulgação Digital",
      format: "PNG / PSD (28MB)",
      description: "Modelos para feed e stories do Instagram, e capas para Facebook e X (Twitter)."
    }
  ];

  return (
    <>
      <SEO 
        title="Materiais de Campanha" 
        description={`Acesse e baixe fotos oficiais, logotipos, panfletos informativos e kits digitais do mandato de ${candidateConfig.name}.`}
      />

      {/* Page Header */}
      <section className="relative bg-brand-blue-dark text-white pt-36 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ec4899_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <span className="px-4 py-1.5 bg-brand-pink/20 border border-brand-pink/30 rounded-full text-brand-pink-vibrant font-display font-semibold text-xs tracking-wider uppercase mb-4 inline-block">
            Download Center
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-extrabold tracking-tight">
            Materiais de Divulgação
          </h1>
          <p className="text-white/70 text-sm md:text-base max-w-xl mx-auto mt-4 leading-relaxed">
            Kit completo para apoiadores, jornalistas e assessores. Compartilhe nossas propostas e fortaleça essa rede.
          </p>
        </div>
      </section>

      {/* Downloads Section */}
      <section className="py-24 bg-brand-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {assets.map((asset, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-3xl p-8 border border-brand-blue/5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full"
              >
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-brand-pink/10 rounded-xl text-brand-pink-vibrant">
                      {asset.title.includes('Foto') ? <Image size={22} /> : <FileText size={22} />}
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-brand-gray-600 block">
                        {asset.type}
                      </span>
                      <span className="text-xs text-brand-gray-600 font-mono">
                        Formato: {asset.format}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-xl text-brand-blue-dark leading-snug mb-3">
                    {asset.title}
                  </h3>
                  <p className="text-brand-gray-600 text-sm leading-relaxed mb-6">
                    {asset.description}
                  </p>
                </div>

                <button 
                  onClick={() => alert(`Iniciando download fictício para: ${asset.title}`)}
                  className="w-full btn-primary flex items-center justify-center gap-2 py-3"
                >
                  <Download size={16} /> Baixar Arquivos
                </button>
              </div>
            ))}
          </div>

          <div className="max-w-2xl mx-auto bg-brand-blue-dark/5 border border-brand-blue/10 p-8 rounded-3xl text-center mt-16 flex flex-col items-center gap-4">
            <CheckCircle size={32} className="text-brand-pink-vibrant" />
            <h4 className="font-display font-bold text-lg text-brand-blue-dark">Uso Permitido & Conformidade</h4>
            <p className="text-brand-gray-600 text-xs leading-relaxed max-w-lg">
              Estes materiais são de livre reprodução e distribuição para fins informativos e de apoio político. É vedada a alteração das cores oficiais ou criação de materiais associados que promovam desinformação ou infrações à legislação eleitoral.
            </p>
          </div>

        </div>
      </section>
    </>
  );
}
