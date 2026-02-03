'use client'

import { useState } from 'react'
import { Product } from '@/types'

interface ProductGalleryProps {
  product: Product
}

export default function ProductGallery({ product }: ProductGalleryProps) {
  const mainImage = product.metadata.product_image?.imgix_url || product.thumbnail
  const gallery = product.metadata.gallery || []
  
  const allImages = mainImage ? [mainImage, ...gallery.map(img => img.imgix_url)] : gallery.map(img => img.imgix_url)
  
  const [selectedImage, setSelectedImage] = useState(0)
  
  if (allImages.length === 0) {
    return (
      <div className="bg-gray-100 aspect-square flex items-center justify-center">
        <span className="text-6xl">📦</span>
      </div>
    )
  }
  
  return (
    <div className="bg-gray-100">
      {/* Main Image */}
      <div className="aspect-square overflow-hidden">
        <img
          src={`${allImages[selectedImage]}?w=1200&h=1200&fit=crop&auto=format,compress`}
          alt={product.metadata.name}
          width={600}
          height={600}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Thumbnail Gallery */}
      {allImages.length > 1 && (
        <div className="p-4 flex gap-2 overflow-x-auto">
          {allImages.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                selectedImage === index ? 'border-primary-600' : 'border-transparent hover:border-gray-300'
              }`}
            >
              <img
                src={`${img}?w=200&h=200&fit=crop&auto=format,compress`}
                alt={`${product.metadata.name} - Image ${index + 1}`}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}