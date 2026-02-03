// app/categories/[slug]/page.tsx
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getCategoryBySlug, getCategories, getProductsByCategory } from '@/lib/cosmic'
import ProductCard from '@/components/ProductCard'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)
  
  if (!category) {
    return {
      title: 'Category Not Found | ShopCosmic',
    }
  }
  
  return {
    title: `${category.metadata.name} | ShopCosmic`,
    description: category.metadata.description || `Browse ${category.metadata.name} products at ShopCosmic`,
  }
}

export async function generateStaticParams() {
  const categories = await getCategories()
  return categories.map((category) => ({
    slug: category.slug,
  }))
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)
  
  if (!category) {
    notFound()
  }
  
  const [products, categories] = await Promise.all([
    getProductsByCategory(category.id),
    getCategories(),
  ])
  
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="bg-white border-b">
        <div className="container py-8">
          <nav className="flex items-center text-sm text-gray-600 mb-4">
            <Link href="/" className="hover:text-primary-600">Home</Link>
            <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/products" className="hover:text-primary-600">Products</Link>
            <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-900 font-medium">{category.metadata.name}</span>
          </nav>
          
          <div className="flex items-center gap-4">
            <span className="text-5xl">{category.metadata.icon || '📁'}</span>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                {category.metadata.name}
              </h1>
              {category.metadata.description && (
                <p className="text-lg text-gray-600 mt-1">
                  {category.metadata.description}
                </p>
              )}
            </div>
          </div>
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
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <span className="mr-2">🛍️</span>
                  All Products
                </Link>
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/categories/${cat.slug}`}
                    className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                      cat.id === category.id
                        ? 'text-primary-600 bg-primary-50 font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="mr-2">{cat.metadata.icon || '📁'}</span>
                    {cat.metadata.name}
                  </Link>
                ))}
              </nav>
            </div>
          </aside>
          
          {/* Products Grid */}
          <div className="flex-grow">
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {products.length} {products.length === 1 ? 'product' : 'products'}
              </p>
            </div>
            
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
                <p className="text-gray-600 mb-6">There are no products in this category yet.</p>
                <Link
                  href="/products"
                  className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold"
                >
                  Browse All Products
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}