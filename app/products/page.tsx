import { Metadata } from 'next'
import { getProducts, getCategories } from '@/lib/cosmic'
import ProductCard from '@/components/ProductCard'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'All Products | ShopCosmic',
  description: 'Browse our complete collection of products across all categories.',
}

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ])
  
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="bg-white border-b">
        <div className="container py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            All Products
          </h1>
          <p className="text-lg text-gray-600">
            Browse our complete collection of {products.length} products
          </p>
        </div>
      </div>
      
      <div className="container py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Categories */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Categories</h2>
              <nav className="space-y-2">
                <Link
                  href="/products"
                  className="flex items-center px-4 py-2 text-primary-600 bg-primary-50 rounded-lg font-medium"
                >
                  <span className="mr-2">🛍️</span>
                  All Products
                </Link>
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/categories/${category.slug}`}
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <span className="mr-2">{category.metadata.icon || '📁'}</span>
                    {category.metadata.name}
                  </Link>
                ))}
              </nav>
            </div>
          </aside>
          
          {/* Products Grid */}
          <div className="flex-grow">
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <div className="text-6xl mb-4">📦</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Products Found</h3>
                <p className="text-gray-600">Check back later for new arrivals!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}