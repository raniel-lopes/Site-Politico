import { candidateConfig } from '../config/candidate.js';
import SEO from '../components/SEO.js';
import { 
  Building, 
  Map, 
  Clock, 
  Heart, 
  ShieldCheck, 
  Briefcase 
} from 'lucide-react';

export default function AtuacaoParlamentar() {
  const statsList = [
    { label: "Projetos de Lei Protocolados", value: candidateConfig.stats.billsProtocolled, icon: Briefcase, color: "text-brand-blue" },
    { label: "Projetos Aprovados", value: candidateConfig.stats.billsApproved, icon: ShieldCheck, color: "text-green-600" },
    { label: "Bairros & Comunidades Atendidos", value: candidateConfig.stats.communitiesAssisted, icon: Map, color: "text-indigo-600" },
    { label: "Audiências Públicas Lideradas", value: candidateConfig.stats.publicHearings, icon: Building, color: "text-amber-600" },
    { label: "Indicações Aprovadas", value: candidateConfig.stats.approvedIndications, icon: Clock, color: "text-teal-600" }
  ];

  return (
    <>
      <SEO 
        title="Atuação Parlamentar" 
        description={`Prestação de contas do mandato de ${candidateConfig.name}: projetos de lei, indicações e comunidades beneficiadas.`} 
      />

      {/* Page Header */}
      <section className="relative bg-brand-blue-dark text-white pt-36 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ec4899_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <span className="px-4 py-1.5 bg-brand-pink/20 border border-brand-pink/30 rounded-full text-brand-pink-vibrant font-display font-semibold text-xs tracking-wider uppercase mb-4 inline-block">
            Transparência
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-extrabold tracking-tight">
            Atuação Parlamentar
          </h1>
          <p className="text-white/70 text-sm md:text-base max-w-xl mx-auto mt-4 leading-relaxed">
            Nossa prestação de contas periódica. Dados auditados da atividade legislativa, fiscalizadora e de investimento no município de Salvador.
          </p>
        </div>
      </section>

      {/* Stats Breakdown Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col gap-3">
            <h2 className="text-3xl font-display font-extrabold text-brand-blue-dark">
              O Mandato em Números
            </h2>
            <p className="text-brand-gray-600 leading-relaxed text-sm">
              Consolidação das atividades realizadas na Câmara Municipal. Transparência ativa na destinação de recursos e protocolo de leis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {statsList.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={idx}
                  className="bg-brand-gray-50 border border-brand-gray-200 rounded-3xl p-8 hover:shadow-md transition-shadow flex items-start gap-6"
                >
                  <div className={`p-4 bg-white rounded-2xl shadow-sm ${stat.color} shrink-0`}>
                    <Icon size={28} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-display font-black text-3xl text-brand-blue-dark">
                      {stat.value}
                    </span>
                    <span className="text-sm text-brand-gray-600 font-semibold leading-tight">
                      {stat.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>



      {/* Performance Reports PDF / Materials */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center flex flex-col items-center gap-6">
          <Heart className="text-brand-pink-vibrant" size={36} />
          <h2 className="text-3xl font-display font-extrabold text-brand-blue-dark">
            Baixe Nossos Relatórios Anuais
          </h2>
          <p className="text-brand-gray-600 leading-relaxed text-sm md:text-base">
            Todos os anos publicamos um relatório completo detalhando as atividades do gabinete, as audiências públicas assistidas e o andamento dos projetos. A transparência deve ser um pilar de qualquer mandato político.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-4">
            <button className="btn-primary" onClick={() => alert('Download do Relatório 2024 (Simulado)')}>
              Relatório de Atuação 2024 (PDF)
            </button>
            <button className="btn-secondary" onClick={() => alert('Download do Relatório Histórico (Simulado)')}>
              Balanço Geral de Mandato (PDF)
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
