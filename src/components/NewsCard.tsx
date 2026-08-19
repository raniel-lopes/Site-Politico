import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';

interface NewsCardProps {
  article: {
    id: string;
    title: string;
    slug: string;
    summary: string;
    image?: string | null;
    category: string;
    author: string;
    createdAt: string;
  };
}

export default function NewsCard({ article }: NewsCardProps) {
  const formattedDate = new Date(article.createdAt).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  return (
    <article className="bg-white rounded-2xl overflow-hidden border border-brand-blue/10 hover:border-brand-blue/20 hover:shadow-xl transition-all duration-300 flex flex-col group h-full">
      {/* Cover Image */}
      <div className="relative aspect-video w-full overflow-hidden bg-brand-gray-100 shrink-0">
        <img
          src={article.image || 'https://via.placeholder.com/800x450.png?text=Mariana+Souza+Salvador'}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Category Badge */}
        <span className="absolute top-4 left-4 bg-brand-blue text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
          {article.category}
        </span>
      </div>

      {/* Content Body */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Meta Info */}
        <div className="flex items-center gap-4 text-xs text-brand-gray-600 mb-3">
          <span className="flex items-center gap-1">
            <Calendar size={12} className="text-brand-pink-vibrant" />
            {formattedDate}
          </span>
          <span className="flex items-center gap-1">
            <User size={12} className="text-brand-pink-vibrant" />
            {article.author}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display font-bold text-lg text-brand-blue-dark line-clamp-2 group-hover:text-brand-pink-vibrant transition-colors mb-3">
          {article.title}
        </h3>

        {/* Summary */}
        <p className="text-brand-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
          {article.summary}
        </p>

        {/* CTA Link */}
        <div className="mt-auto pt-4 border-t border-brand-gray-100 flex items-center justify-between text-brand-blue hover:text-brand-pink-vibrant font-semibold text-sm transition-colors">
          <Link to={`/noticias/${article.slug}`} className="flex items-center gap-1.5 focus:outline-none">
            Ler Matéria Completa
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
}
