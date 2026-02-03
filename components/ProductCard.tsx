import Link from 'next/link'
import { Product } from '@/types'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const hasDiscount = product.metadata.sale_price && product.metadata.sale_price < product.metadata.price
  const discountPercent = hasDiscount
    ? Math.round((1 - (product.metadata.sale_price as number) / product.metadata.price) * 100)
    : 0
  
  const imageUrl = product.metadata.product_image?.imgix_url || product.thumbnail
  
  return (
    <Link href={`/products/${product.slug}`} className="group">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          {imageUrl && (
            <img
              src={`${imageUrl}?w=600&h=600&fit=crop&auto=format,compress`}
              alt={product.metadata.name}
              width={300}
              height={300}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          )}
          
          {/* Sale Badge */}
          {hasDiscount && (
            <span className="absolute top-3 left-3 px-3 py-1 bg-red-500 text-white text-sm font-semibold rounded-full">
              -{discountPercent}%
            </span>
          )}
          
          {/* Stock Status */}
          {!product.metadata.in_stock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="px-4 py-2 bg-white text-gray-900 font-semibold rounded-lg">
                Out of Stock
              </span>
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="p-4">
          {/* Category */}
          {product.metadata.category && (
            <span className="text-sm text-primary-600 font-medium">
              {product.metadata.category.metadata.icon} {product.metadata.category.metadata.name}
            </span>
          )}
          
          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-900 mt-1 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
            {product.metadata.name}
          </h3>
          
          {/* Price */}
          <div className="flex items-center gap-2">
            {hasDiscount ? (
              <>
                <span className="text-xl font-bold text-primary-600">
                  ${product.metadata.sale_price?.toFixed(2)}
                </span>
                <span className="text-sm text-gray-400 line-through">
                  ${product.metadata.price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-xl font-bold text-gray-900">
                ${product.metadata.price.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}