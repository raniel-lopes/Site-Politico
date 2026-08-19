import { candidateConfig } from '../config/candidate.js';
import SEO from '../components/SEO.js';
import { BookOpen, Heart } from 'lucide-react';

export default function QuemSouEu() {
  return (
    <>
      <SEO 
        title="Quem Sou Eu" 
        description={`Conheça a história de ${candidateConfig.name}, o Empregado do Povo, sua origem humilde como zelador de escola, formação em Gestão Pública e sua trajetória como ${candidateConfig.role.toLowerCase()} de Salvador.`} 
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
                  “Minha história começou de forma humilde como zelador de escola e hoje, como vereador, meu maior compromisso é ser o Empregado do Povo, lutando incansavelmente por infraestrutura, saúde, educação e esporte para nossas comunidades.”
                </p>
                <span className="block mt-3 text-xs font-bold text-brand-gray-600 uppercase">— {candidateConfig.name}</span>
              </div>
            </div>

            {/* Right Column: Detailed Text */}
            <div className="lg:col-span-7 flex flex-col gap-6 text-brand-gray-600 leading-relaxed">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-blue-dark">
                Origem, Trabalho e Superação
              </h2>
              
              <p>
                Natural de Salvador, {candidateConfig.name}, carinhosamente apelidado de "Empregado do Povo", nasceu no bairro de Pau da Lima e reside há mais de três décadas no bairro de Dom Avelar. Sua história é uma das mais inspiradoras da política baiana: vindo de uma família humilde e de comunidade carente, iniciou sua vida profissional trabalhando como zelador de escola, superando desafios com muita determinação para chegar a vereador de uma das maiores capitais do Brasil, Salvador.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
                <div className="p-5 bg-brand-gray-50 rounded-2xl border border-brand-gray-200 flex gap-4">
                  <BookOpen className="text-brand-pink-vibrant shrink-0" size={24} />
                  <div>
                    <h4 className="font-display font-bold text-brand-blue-dark text-sm mb-1">Preparo e Formação</h4>
                    <p className="text-xs">Graduado em Gestão Pública, buscando sempre qualificação técnica para exercer a nobre missão de trabalhar pelo povo.</p>
                  </div>
                </div>
                <div className="p-5 bg-brand-gray-50 rounded-2xl border border-brand-gray-200 flex gap-4">
                  <Heart className="text-brand-pink-vibrant shrink-0" size={24} />
                  <div>
                    <h4 className="font-display font-bold text-brand-blue-dark text-sm mb-1">Vocação Social</h4>
                    <p className="text-xs">Atuação comunitária ativa desde a juventude, participando de mobilizações históricas como a "Revolta do Buzu" e liderando lutas por pavimentação e saneamento.</p>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-blue-dark mt-4">
                A Voz das Comunidades no Parlamento
              </h2>
              <p>
                Ainda jovem, Anderson Ninho converteu-se à fé evangélica. Foi no ambiente da igreja que teve o seu chamado para dedicar a sua vida ao serviço do povo através de um mandato político. A preparação valeu a pena: graduando-se em Gestão Pública, disputou a eleição municipal em 2020, sendo eleito em primeiro lugar no partido PDT com 5.289 votos para exercer o mandato pela 19ª legislatura.
              </p>
              <p>
                O reconhecimento do seu trabalho social e da sua proximidade com a população se consolidou de forma histórica em 2024. Com uma atuação voltada para as periferias e demandas populares, reelegeu-se vereador de Salvador com 16.203 votos, tornando-se o 7º vereador mais votado de toda a Bahia.
              </p>
              
              <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-blue-dark mt-4">
                Compromisso com o Povo e Novos Desafios (PSDB)
              </h2>
              <p>
                Como atuação da vereança, o Empregado do Povo não só defende projetos relevantes para toda a cidade nas áreas de fomento do emprego, cultura, arte, saúde, educação, esporte, lazer e infraestrutura, mas também tem um olhar regionalista todo especial voltado para as comunidades que compõem os bairros da poligonal de Pau da Lima.
              </p>
              <p>
                Em abril de 2026, filiou-se ao PSDB, iniciando uma nova etapa em sua caminhada política com o objetivo de levar seu modelo de atuação e sua voz firme em defesa das comunidades periféricas para toda a Bahia.
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
