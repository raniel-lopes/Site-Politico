import { candidateConfig } from '../config/candidate.js';
import SEO from '../components/SEO.js';
import { BookOpen, Heart } from 'lucide-react';

export default function QuemSouEu() {
  return (
    <>
      <SEO 
        title="Quem Sou Eu" 
        description={`Conheça a história de ${candidateConfig.name}, sua origem na periferia de Salvador, formação em Ciências Sociais na UFBA, e sua trajetória como ${candidateConfig.role.toLowerCase()} da capital baiana.`} 
      />
      
      {/* Page Header */}
      <section className="relative bg-brand-blue-dark text-white pt-36 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ec4899_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <span className="px-4 py-1.5 bg-brand-pink/20 border border-brand-pink/30 rounded-full text-brand-pink-vibrant font-display font-semibold text-xs tracking-wider uppercase mb-4 inline-block">
            História e Valores
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-extrabold tracking-tight">
            Minha Trajetória
          </h1>
          <p className="text-white/70 text-sm md:text-base max-w-xl mx-auto mt-4 leading-relaxed">
            Uma vida dedicada a dar voz às comunidades, promover a inclusão digital e defender o avanço social na Bahia.
          </p>
        </div>
      </section>

      {/* Biography Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Image and Quote */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="rounded-3xl overflow-hidden shadow-xl border border-brand-blue/10 bg-brand-gray-100">
                <img
                  src={candidateConfig.hero.candidatePhoto}
                  alt={candidateConfig.name}
                  className="w-full aspect-[4/5] object-cover"
                />
              </div>
              <div className="bg-brand-gray-50 border-l-4 border-brand-pink p-6 rounded-r-2xl">
                <p className="text-brand-blue-dark italic font-semibold text-sm leading-relaxed">
                  “Acredito que a transformação social começa quando garantimos acesso à saúde, à educação digital e à igualdade de oportunidades. Esse foi o meu norte em Salvador e será o meu norte para a Bahia inteira.”
                </p>
                <span className="block mt-3 text-xs font-bold text-brand-gray-600 uppercase">— {candidateConfig.name}</span>
              </div>
            </div>

            {/* Right Column: Detailed Text */}
            <div className="lg:col-span-7 flex flex-col gap-6 text-brand-gray-600 leading-relaxed">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-blue-dark">
                Origem, Educação e Luta Comunitária
              </h2>
              
              <p>
                Nascido e criado na periferia de Salvador, no bairro de Pernambués, {candidateConfig.name} sempre viu de perto os desafios enfrentados pela população de baixa renda. Filho de uma professora de escola pública e de um eletricista, aprendeu desde cedo a valorizar a educação e o esforço coletivo.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
                <div className="p-5 bg-brand-gray-50 rounded-2xl border border-brand-gray-200 flex gap-4">
                  <BookOpen className="text-brand-pink-vibrant shrink-0" size={24} />
                  <div>
                    <h4 className="font-display font-bold text-brand-blue-dark text-sm mb-1">Formação Acadêmica</h4>
                    <p className="text-xs">Cientista Social graduado pela Universidade Federal da Bahia (UFBA), especialista em Políticas Públicas.</p>
                  </div>
                </div>
                <div className="p-5 bg-brand-gray-50 rounded-2xl border border-brand-gray-200 flex gap-4">
                  <Heart className="text-brand-pink-vibrant shrink-0" size={24} />
                  <div>
                    <h4 className="font-display font-bold text-brand-blue-dark text-sm mb-1">Inclusão e Tecnologia</h4>
                    <p className="text-xs">Fundadora do Instituto Tecnologia Ativa, ONG que capacitou mais de 2.000 jovens soteropolitanos em TI.</p>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-blue-dark mt-4">
                A Chegada ao Parlamento e a Prestação de Contas
              </h2>
              <p>
                Em 2020, motivado pelo desejo de fazer mais pelas comunidades periféricas, {candidateConfig.name} candidatou-se ao cargo de vereador em Salvador. Eleito com uma votação expressiva, estruturou seu mandato com foco na transparência e inovação política.
              </p>
              <p>
                Durante os últimos anos de atuação na Câmara Municipal, protocolou 34 Projetos de Lei inovadores, incluindo a <strong>Casa do Autista</strong> e o pioneiro <strong>Programa Tecnologia Ativa</strong>. Seu trabalho se consolidou através da descentralização dos recursos parlamentares para atender a saúde comunitária e modernização das escolas.
              </p>
              
              <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-blue-dark mt-4">
                De Salvador para Toda a Bahia (Eleições 2026)
              </h2>
              <p>
                Os resultados obtidos em Salvador demonstraram que o mandato participativo e centrado em resultados é altamente replicável e necessário. Lideranças comunitárias de diferentes cidades baianas, como Feira de Santana, Vitória da Conquista e Juazeiro, identificaram no trabalho de {candidateConfig.name} o modelo ideal para ser estendido para toda a Bahia.
              </p>
              <p>
                Como pré-candidato a <strong>{candidateConfig.targetRole} nas eleições de 2026</strong>, {candidateConfig.name} propõe um projeto focado na ampliação do acesso à saúde integrada regionalizada, fortalecimento tecnológico de cooperativas locais e a expansão da educação digital em tempo integral na rede estadual.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-brand-gray-50 border-t border-brand-gray-200">
        <div className="container mx-auto px-4 md:px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-3">
            <span className="text-brand-pink-vibrant font-display font-semibold uppercase tracking-wider text-sm">Linha do Tempo</span>
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-brand-blue-dark tracking-tight">
              Marcos da Caminhada
            </h2>
            <p className="text-brand-gray-600 leading-relaxed text-sm md:text-base">
              Acompanhe a história cronológica de {candidateConfig.name} desde as lutas comunitárias até o mandato legislativo.
            </p>
          </div>

          {/* Timeline Tree */}
          <div className="relative max-w-4xl mx-auto">
            {/* Center line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-brand-blue/10 transform md:-translate-x-1/2"></div>
            
            <div className="space-y-12">
              {candidateConfig.timeline.map((item, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <div 
                    key={idx}
                    className={`relative flex flex-col md:flex-row items-start ${
                      isEven ? 'md:flex-row-reverse' : ''
                    }`}
                  >
                    {/* Circle marker */}
                    <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-brand-pink border-4 border-white rounded-full transform -translate-x-1/2 z-10 shadow"></div>
                    
                    {/* Date label */}
                    <div className="pl-12 md:pl-0 md:w-1/2 flex md:justify-center">
                      <span className="text-2xl font-display font-black text-brand-pink-vibrant md:px-6">
                        {item.year}
                      </span>
                    </div>

                    {/* Card box */}
                    <div className="pl-12 md:pl-0 md:w-1/2">
                      <div className="bg-white p-6 rounded-2xl shadow-sm border border-brand-blue/5 md:mx-6">
                        <h4 className="font-display font-bold text-lg text-brand-blue-dark mb-2">
                          {item.title}
                        </h4>
                        <p className="text-brand-gray-600 text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </section>
    </>
  );
}
