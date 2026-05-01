'use client';

import { useState } from 'react';
import { getProduct, getProducts } from '@/lib/shopify/queries/products';
import { useCart } from '@/lib/cart-context';
import { formatPrice, cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { ShoppingBag, ChevronLeft, ChevronRight, Minus, Plus, Star, StarHalf } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product: { handle: string }) => ({
    handle: product.handle,
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const product = await getProduct(params.handle);
  
  if (!product) {
    return {
      title: 'Product Not Found | Oud of Dubai',
    };
  }

  return {
    title: `${product.title} | Oud of Dubai`,
    description: product.description || `Shop ${product.title} - a premium fragrance from Oud of Dubai.`,
    openGraph: {
      title: `${product.title} | Oud of Dubai`,
      description: product.description || `Shop ${product.title}.`,
      images: product.images?.[0]?.url ? [{ url: product.images[0].url }] : [],
    },
  };
}

function ProductGallery({ images }: { images: Array<{ url: string; altText?: string }> }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square bg-[#1a1a1a] rounded-lg flex items-center justify-center">
        <span className="text-[#a0a0a0]">No image available</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative aspect-square bg-[#111111] rounded-lg overflow-hidden border border-[#222222]">
        <Image
          src={images[currentIndex].url}
          alt={images[currentIndex].altText || 'Product image'}
          fill
          className="object-cover"
          priority
        />
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#111111]/80 border border-[#222222] rounded-full flex items-center justify-center text-[#d4a853] hover:bg-[#d4a853] hover:text-[#0a0a0a] transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#111111]/80 border border-[#222222] rounded-full flex items-center justify-center text-[#d4a853] hover:bg-[#d4a853] hover:text-[#0a0a0a] transition-colors"
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "relative w-20 h-20 rounded-md overflow-hidden border-2 transition-all",
                index === currentIndex
                  ? "border-[#d4a853]"
                  : "border-[#222222] hover:border-[#d4a853]/50"
              )}
            >
              <Image
                src={image.url}
                alt={image.altText || `Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ProductInfo({ 
  product, 
  onAddToCart 
}: { 
  product: Awaited<ReturnType<typeof getProduct>>;
  onAddToCart: () => void;
}) {
  const { cart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  const variants = product.variants || [];
  const selectedVariantData = variants.find((v: { id: string }) => v.id === selectedVariant);
  
  const price = selectedVariantData?.price || product.priceRange?.minVariantPrice?.amount || product.price || '0';
  const compareAtPrice = selectedVariantData?.compareAtPrice || product.compareAtPrice;
  
  const checkoutUrl = cart?.checkoutUrl;

  const handleAddToCart = () => {
    onAddToCart();
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          {product.tags?.includes('bestseller') && (
            <Badge className="bg-[#d4a853] text-[#0a0a0a]">Bestseller</Badge>
          )}
          {product.tags?.includes('new') && (
            <Badge variant="outline" className="border-[#d4a853] text-[#d4a853]">New</Badge>
          )}
        </div>
        <h1 className="text-3xl md:text-4xl font-serif text-[#d4a853] mb-2">
          {product.title}
        </h1>
        <div className="flex items-center gap-4">
          <span className="text-2xl text-white font-medium">
            {formatPrice(price)}
          </span>
          {compareAtPrice && (
            <span className="text-lg text-[#a0a0a0] line-through">
              {formatPrice(compareAtPrice)}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1">
        <Star className="w-5 h-5 fill-[#d4a853] text-[#d4a853]" />
        <Star className="w-5 h-5 fill-[#d4a853] text-[#d4a853]" />
        <Star className="w-5 h-5 fill-[#d4a853] text-[#d4a853]" />
        <Star className="w-5 h-5 fill-[#d4a853] text-[#d4a853]" />
        <StarHalf className="w-5 h-5 fill-[#d4a853] text-[#d4a853]" />
        <span className="text-[#a0a0a0] ml-2">4.5 (128 reviews)</span>
      </div>

      {variants.length > 0 && (
        <div className="space-y-2">
          <label className="text-sm text-[#a0a0a0]">Size</label>
          <Select value={selectedVariant} onValueChange={setSelectedVariant}>
            <SelectTrigger className="w-full bg-[#111111] border-[#222222] text-white">
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent className="bg-[#111111] border-[#222222]">
              {variants.map((variant: { id: string; title: string; price: string }) => (
                <SelectItem 
                  key={variant.id} 
                  value={variant.id}
                  className="text-white hover:bg-[#1a1a1a]"
                >
                  {variant.title} - {formatPrice(variant.price)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="space-y-2">
        <label className="text-sm text-[#a0a0a0]">Quantity</label>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-10 bg-[#111111] border border-[#222222] rounded-md flex items-center justify-center text-white hover:border-[#d4a853] transition-colors"
          >
            <Minus size={18} />
          </button>
          <span className="text-xl text-white w-12 text-center">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-10 h-10 bg-[#111111] border border-[#222222] rounded-md flex items-center justify-center text-white hover:border-[#d4a853] transition-colors"
          >
            <Plus size={18} />
          </button>
        </div>
      </div>

      <div className="space-y-3 pt-4">
        <Button
          onClick={handleAddToCart}
          className="w-full bg-[#d4a853] text-[#0a0a0a] hover:bg-[#c49a48] font-medium py-6"
          size="lg"
        >
          <ShoppingBag className="w-5 h-5 mr-2" />
          Add to Cart
        </Button>
        {checkoutUrl ? (
          <a
            href={checkoutUrl}
            className="block w-full bg-transparent border-2 border-[#d4a853] text-[#d4a853] hover:bg-[#d4a853] hover:text-[#0a0a0a] font-medium py-4 px-6 rounded-md text-center transition-colors"
          >
            Buy Now
          </a>
        ) : (
          <Button
            variant="outline"
            className="w-full border-[#d4a853] text-[#d4a853] hover:bg-[#d4a853] hover:text-[#0a0a0a] py-6"
            size="lg"
          >
            Buy Now
          </Button>
        )}
      </div>

      <div className="border-t border-[#222222] pt-6">
        <h3 className="text-lg font-medium text-white mb-3">Description</h3>
        <div 
          className="prose prose-invert prose-gold max-w-none text-[#a0a0a0]"
          dangerouslySetInnerHTML={{ __html: product.descriptionHtml || product.description || '' }}
        />
      </div>

      <div className="border-t border-[#222222] pt-6 space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-[#a0a0a0]">Shipping</span>
          <span className="text-white">Free shipping on orders over $150</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-[#a0a0a0]">Returns</span>
          <span className="text-white">30-day hassle-free returns</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-[#a0a0a0]">Authenticity</span>
          <span className="text-white">100% authentic guarantee</span>
        </div>
      </div>
    </div>
  );
}

export default async function ProductPage(props: {
  params: Promise<{ handle: string }>;
}) {
  const params = await props.params;
  const product = await getProduct(params.handle);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif text-[#d4a853] mb-4">Product Not Found</h1>
          <Link 
            href="/shop" 
            className="text-[#a0a0a0] hover:text-[#d4a853] transition-colors"
          >
            Return to Shop
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    console.log('Added to cart:', product.title);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Link 
            href="/shop"
            className="inline-flex items-center text-[#a0a0a0] hover:text-[#d4a853] transition-colors"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Shop
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ProductGallery images={product.images || []} />
          <ProductInfo product={product} onAddToCart={handleAddToCart} />
        </div>
      </div>
    </div>
  );
}