# ShopCosmic E-Commerce Store

![ShopCosmic E-Commerce Store](https://imgix.cosmicjs.com/32001240-0146-11f1-9ca3-1b3c2838945f-photo-1505740420928-5e560c06d30e-1770153641830.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern e-commerce storefront built with Next.js 16 and Cosmic CMS. Browse products, filter by category, and read customer reviews in this beautiful, responsive online store.

## Features

- 🛍️ **Product Catalog** - Display products with images, prices, and descriptions
- 🏷️ **Category Navigation** - Filter products by category with emoji icons
- ⭐ **Customer Reviews** - Show star ratings and verified purchase badges
- 💰 **Sale Prices** - Highlight discounted items with original and sale prices
- 📱 **Fully Responsive** - Mobile-first design that looks great on any device
- 🚀 **Server-Side Rendering** - Fast page loads and excellent SEO
- 🎨 **Modern UI** - Clean design with Tailwind CSS and Inter font

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=6982664b80890c6cee85c723&clone_repository=6982685f80890c6cee85c759)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a complete content model for: An e-commerce store with products, categories, and reviews
>
> Use the install_content_model action to create ALL object types AND demo content in one step. Include:
> 1. All necessary object types with appropriate metafields
> 2. 2-3 demo objects for each type with realistic content
> 3. Unsplash image URLs for thumbnails and file metafields (use real URLs like https://images.unsplash.com/photo-...)
>
> Remember to create types that are referenced by others FIRST (e.g., categories and authors before blog posts)."

### Code Generation Prompt

> "Next.js app using tailwind css, inter font, mobile responsive and navigation, footer with social links"

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) - React framework with App Router
- [Cosmic](https://www.cosmicjs.com/) - Headless CMS for content management
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Inter Font](https://fonts.google.com/specimen/Inter) - Modern, readable typeface

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account with the e-commerce content model

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd shopcosmic
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Add your Cosmic credentials to `.env.local`:
```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

5. Run the development server:
```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to see your store.

## Cosmic SDK Examples

### Fetching Products

```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: products } = await cosmic.objects
  .find({ type: 'products' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching Products by Category

```typescript
const { objects: products } = await cosmic.objects
  .find({ 
    type: 'products',
    'metadata.category': categoryId 
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching Reviews for a Product

```typescript
const { objects: reviews } = await cosmic.objects
  .find({ 
    type: 'reviews',
    'metadata.product': productId 
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

## Cosmic CMS Integration

This project uses the following Cosmic Object Types:

### Categories
- **Name** (text) - Category name
- **Description** (textarea) - Category description
- **Icon** (emoji) - Visual icon for the category

### Products
- **Name** (text) - Product name
- **Description** (markdown) - Full product description
- **Price** (number) - Regular price
- **Sale Price** (number) - Discounted price (optional)
- **SKU** (text) - Product identifier
- **In Stock** (switch) - Availability status
- **Product Image** (file) - Main product image
- **Gallery** (files) - Additional product images
- **Category** (object) - Link to category

### Reviews
- **Reviewer Name** (text) - Customer name
- **Rating** (select-dropdown) - 1-5 star rating
- **Review Text** (textarea) - Review content
- **Product** (object) - Link to product
- **Verified Purchase** (switch) - Purchase verification

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Netlify

1. Push your code to GitHub
2. Import the project in Netlify
3. Set build command: `bun run build`
4. Set publish directory: `.next`
5. Add environment variables
6. Deploy!

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with navigation
│   ├── page.tsx            # Home page
│   ├── products/
│   │   ├── page.tsx        # Products listing
│   │   └── [slug]/
│   │       └── page.tsx    # Product detail
│   └── categories/
│       └── [slug]/
│           └── page.tsx    # Category products
├── components/
│   ├── Header.tsx          # Navigation header
│   ├── Footer.tsx          # Site footer
│   ├── ProductCard.tsx     # Product card component
│   ├── ReviewCard.tsx      # Review card component
│   ├── StarRating.tsx      # Star rating display
│   ├── CategoryCard.tsx    # Category card component
│   └── CosmicBadge.tsx     # Built with Cosmic badge
├── lib/
│   └── cosmic.ts           # Cosmic SDK configuration
└── types.ts                # TypeScript definitions
```

## License

MIT License - feel free to use this project for your own e-commerce needs!

<!-- README_END -->