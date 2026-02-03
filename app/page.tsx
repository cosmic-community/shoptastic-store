import Link from 'next/link'
import { getProducts, getCategories, getAllReviews } from '@/lib/cosmic'
import ProductCard from '@/components/ProductCard'
import CategoryCard from '@/components/CategoryCard'
import ReviewCard from '@/components/ReviewCard'

export default async function HomePage() {
  const [products, categories, reviews] = await Promise.all([
    getProducts(),
    getCategories(),
    getAllReviews(),
  ])
  
  // Get featured reviews (first 3)
  const featuredReviews = reviews.slice(0, 3)
  
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Discover Amazing Products
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 mb-8">
              Shop our curated collection of electronics, clothing, and home essentials.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="inline-flex items-center px-6 py-3 bg-white text-primary-700 font-semibold rounded-lg hover:bg-primary-50 transition-colors"
              >
                Shop Now
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="#categories"
                className="inline-flex items-center px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary-700 transition-colors"
              >
                Browse Categories
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section id="categories" className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our carefully curated categories to find exactly what you&apos;re looking for.
            </p>
          </div>
          
          {categories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No categories available.</p>
          )}
        </div>
      </section>
      
      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Featured Products
              </h2>
              <p className="text-lg text-gray-600">
                Check out our most popular items
              </p>
            </div>
            <Link
              href="/products"
              className="hidden md:inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold"
            >
              View All
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
          
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No products available.</p>
          )}
          
          <div className="mt-8 text-center md:hidden">
            <Link
              href="/products"
              className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold"
            >
              View All Products
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Reviews Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Read reviews from our satisfied customers
            </p>
          </div>
          
          {featuredReviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No reviews yet.</p>
          )}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Shopping?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Browse our complete collection and find the perfect products for you.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center px-8 py-4 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
          >
            Explore All Products
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  )
}