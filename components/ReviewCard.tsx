import Link from 'next/link'
import { Review } from '@/types'
import StarRating from './StarRating'

interface ReviewCardProps {
  review: Review
  showProduct?: boolean
}

export default function ReviewCard({ review, showProduct = true }: ReviewCardProps) {
  const rating = parseInt(review.metadata.rating.key)
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-900">{review.metadata.reviewer_name}</span>
            {review.metadata.verified_purchase && (
              <span className="inline-flex items-center px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Verified
              </span>
            )}
          </div>
          <StarRating rating={rating} size="sm" />
        </div>
      </div>
      
      {/* Review Text */}
      <p className="text-gray-700 mb-4 line-clamp-4">
        {review.metadata.review_text}
      </p>
      
      {/* Product Link */}
      {showProduct && review.metadata.product && (
        <Link
          href={`/products/${review.metadata.product.slug}`}
          className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {review.metadata.product.metadata.product_image && (
            <img
              src={`${review.metadata.product.metadata.product_image.imgix_url}?w=100&h=100&fit=crop&auto=format,compress`}
              alt={review.metadata.product.metadata.name}
              width={50}
              height={50}
              className="w-12 h-12 object-cover rounded-lg"
            />
          )}
          <div className="flex-grow min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {review.metadata.product.metadata.name}
            </p>
            <p className="text-sm text-primary-600">
              ${review.metadata.product.metadata.sale_price?.toFixed(2) || review.metadata.product.metadata.price.toFixed(2)}
            </p>
          </div>
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      )}
    </div>
  )
}