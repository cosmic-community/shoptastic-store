import Link from 'next/link'
import { Category } from '@/types'

interface CategoryCardProps {
  category: Category
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/categories/${category.slug}`} className="group">
      <div className="relative bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300">
        {/* Background Image */}
        {category.thumbnail && (
          <div className="absolute inset-0">
            <img
              src={`${category.thumbnail}?w=800&h=400&fit=crop&auto=format,compress`}
              alt={category.metadata.name}
              width={400}
              height={200}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          </div>
        )}
        
        {/* Content */}
        <div className="relative p-8 h-64 flex flex-col justify-end">
          <span className="text-5xl mb-3">{category.metadata.icon || '📁'}</span>
          <h3 className="text-2xl font-bold text-white mb-2">
            {category.metadata.name}
          </h3>
          {category.metadata.description && (
            <p className="text-gray-200 line-clamp-2">
              {category.metadata.description}
            </p>
          )}
          <span className="inline-flex items-center text-white font-medium mt-4 group-hover:translate-x-2 transition-transform">
            Shop Now
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  )
}