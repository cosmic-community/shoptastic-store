// app/products/[slug]/page.tsx
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getProductBySlug, getProducts, getReviewsByProduct } from '@/lib/cosmic'
import StarRating from '@/components/StarRating'
import ReviewCard from '@/components/ReviewCard'
import ProductGallery from '@/components/ProductGallery'

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  
  if (!product) {
    return {
      title: 'Product Not Found | ShopCosmic',
    }
  }
  
  return {
    title: `${product.metadata.name} | ShopCosmic`,
    description: product.metadata.description?.substring(0, 160) || `Shop ${product.metadata.name} at ShopCosmic`,
  }
}

export async function generateStaticParams() {
  const products = await getProducts()
  return products.map((product) => ({
    slug: product.slug,
  }))
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  
  if (!product) {
    notFound()
  }
  
  const reviews = await getReviewsByProduct(product.id)
  
  // Calculate average rating
  const avgRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + parseInt(r.metadata.rating.key), 0) / reviews.length
    : 0
  
  const hasDiscount = product.metadata.sale_price && product.metadata.sale_price < product.metadata.price
  const discountPercent = hasDiscount
    ? Math.round((1 - (product.metadata.sale_price as number) / product.metadata.price) * 100)
    : 0
  
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container py-4">
          <nav className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-primary-600">Home</Link>
            <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/products" className="hover:text-primary-600">Products</Link>
            {product.metadata.category && (
              <>
                <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <Link href={`/categories/${product.metadata.category.slug}`} className="hover:text-primary-600">
                  {product.metadata.category.metadata.name}
                </Link>
              </>
            )}
            <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-900 font-medium">{product.metadata.name}</span>
          </nav>
        </div>
      </div>
      
      {/* Product Details */}
      <div className="container py-8">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Product Gallery */}
            <ProductGallery product={product} />
            
            {/* Product Info */}
            <div className="p-8 lg:p-12">
              {/* Category Badge */}
              {product.metadata.category && (
                <Link
                  href={`/categories/${product.metadata.category.slug}`}
                  className="inline-flex items-center px-3 py-1 bg-primary-100 text-primary-700 text-sm font-medium rounded-full mb-4 hover:bg-primary-200 transition-colors"
                >
                  <span className="mr-1">{product.metadata.category.metadata.icon || '📁'}</span>
                  {product.metadata.category.metadata.name}
                </Link>
              )}
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {product.metadata.name}
              </h1>
              
              {/* Rating */}
              {reviews.length > 0 && (
                <div className="flex items-center gap-2 mb-6">
                  <StarRating rating={avgRating} />
                  <span className="text-gray-600">
                    ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
                  </span>
                </div>
              )}
              
              {/* Price */}
              <div className="mb-6">
                {hasDiscount ? (
                  <div className="flex items-center gap-4">
                    <span className="text-4xl font-bold text-primary-600">
                      ${product.metadata.sale_price?.toFixed(2)}
                    </span>
                    <span className="text-2xl text-gray-400 line-through">
                      ${product.metadata.price.toFixed(2)}
                    </span>
                    <span className="px-3 py-1 bg-red-100 text-red-700 text-sm font-semibold rounded-full">
                      Save {discountPercent}%
                    </span>
                  </div>
                ) : (
                  <span className="text-4xl font-bold text-gray-900">
                    ${product.metadata.price.toFixed(2)}
                  </span>
                )}
              </div>
              
              {/* Stock Status */}
              <div className="mb-6">
                {product.metadata.in_stock ? (
                  <span className="inline-flex items-center text-green-600 font-medium">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    In Stock
                  </span>
                ) : (
                  <span className="inline-flex items-center text-red-600 font-medium">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    Out of Stock
                  </span>
                )}
              </div>
              
              {/* SKU */}
              {product.metadata.sku && (
                <p className="text-sm text-gray-500 mb-6">
                  SKU: {product.metadata.sku}
                </p>
              )}
              
              {/* Description */}
              {product.metadata.description && (
                <div className="prose prose-gray max-w-none mb-8">
                  <div dangerouslySetInnerHTML={{ __html: product.metadata.description.replace(/\n/g, '<br />').replace(/## /g, '<h3>').replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/- /g, '• ') }} />
                </div>
              )}
              
              {/* Add to Cart Button (Placeholder) */}
              <button
                className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-colors ${
                  product.metadata.in_stock
                    ? 'bg-primary-600 text-white hover:bg-primary-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                disabled={!product.metadata.in_stock}
              >
                {product.metadata.in_stock ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
          </div>
        </div>
        
        {/* Reviews Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Customer Reviews ({reviews.length})
          </h2>
          
          {reviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} showProduct={false} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <div className="text-5xl mb-4">💬</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Reviews Yet</h3>
              <p className="text-gray-600">Be the first to review this product!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}