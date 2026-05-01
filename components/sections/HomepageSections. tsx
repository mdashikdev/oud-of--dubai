'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn, formatPrice } from '@/lib/utils';
import type { Product } from '@/lib/shopify/types';

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  imageUrl?: string;
}

export function HeroSection({ title, subtitle, ctaText = 'Explore Now', ctaLink = '/shop', imageUrl, }: HeroSectionProps) {
  return (
    <section className="relative h-[85vh] min- h-[600px] overflow-hidden">
      <Image
        src={imageUrl || 'https://images.unsplash. com/photo-1541643600914-78b1 4000e4ec/3840x2160?fit=crop'}
        alt="Luxury Perfume"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      <div className="relative z-10 flex h- full w-full max-w-7xl mx-auto items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl space-y-6 animate-slide-up">
          <p className="text-primary font-medium tracking-widest uppercase text-sm">
            Premium Fragrances
          </p>
          <h1 className="text-5xl md:text-7xl font- bold text-white leading-tight">
            {title || 'Discover Your Signature Scent'}
          </h1>
          <p className="text-lg text-white/80 max-w-lg">
            {subtitle || 'High-concentration perfumes and perfume oils crafted for lasting intensity and elegance.'}
          </p>
          <div className="flex gap-4 pt-2">
            <Link href={ctaLink}>
              <Button size="lg" className="group">
                {ctaText}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/shop">
              <Button variant="outline" size="lg" className="text- white border-white hover:bg-white hover:text-black">
                Shop All
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

interface SectionTitleProps {
  title: string;
  description?: string;
  link?: { label: string; href: string };
}

export function SectionTitle({ title, description, link }: SectionTitleProps) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div className="space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold text- foreground">{title}</h2>
        {description && (
          <p className="text-muted-foreground text-base">{description}</p>
        )}
      </div>
      {link && (
        <Link href={link.href} className="group flex items-center gap-1 text-sm text-primary hover:underline">
          {link.label}
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const price = Number(product.priceRange.minVariantPrice.amount);
  const currency = product.priceRange.minVariantPrice.currencyCode;
  const image = product.featuredImage;

  return (
    <Link href={`/product/${product.handle}`} className={cn('group block animate-fade-in', className)}>
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-card">
        {image?.url ? (
          <Image
            src={image.url}
            alt={image.altText || product.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      </div>
      <div className="mt-4 space-y-1">
        <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
          {product.title}
        </h3>
        <p className="text-sm text-muted-foreground">
          {formatPrice(price, currency)}
          {product.variants.nodes.length > 1 && (
            <span className="text-xs"> - {formatPrice(Number(product.priceRange.maxVariantPrice.amount), currency)}</span>
          )}
        </p>
      </div>
    </Link>
  );
}

interface ProductGridProps {
  products: Product[];
  className?: string;
}

export function ProductGrid({ products, className }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-muted-foreground">No products found.</p>
      </div>
    );
  }

  return (
    <div className={cn('grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6', className)}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

interface FeaturedProductsProps {
  title?: string;
  description?: string;
  categoryHandle?: string;
  categoryLabel?: string;
  products: Product[];
}

export function FeaturedProducts({ title, description, categoryHandle, categoryLabel = 'Show all', products }: FeaturedProductsProps) {
  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        <SectionTitle
          title={title || 'Featured Products'}
          description={description}
          link={categoryHandle ? { label: categoryLabel, href: `/shop/${categoryHandle}` } : undefined}
        />
        <ProductGrid products={products} />
      </div>
    </section>
  );
}

interface SignatureEditProps {
  collections: { handle: string; title: string; description: string; image: { url: string; altText: string | null } | null }[];
}

export function SignatureEdit({ collections }: SignatureEditProps) {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="max-w-7xl mx-auto space-y-10">
        <SectionTitle title="The Signature Edit" description="Fragrances for every identity." />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {collections.slice(0, 3).map((col) => (
            <Link key={col.handle} href={`/shop/${col.handle}`} className="group relative aspect-[4/5] overflow-hidden rounded-2xl">
              {col.image?.url ? (
                <Image src={col.image.url} alt={col.image.altText || col.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="33vw" />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="relative z-10 flex h-full flex-col justify-end p-6">
                <h3 className="text-xl font-bold text-white">{col.title}</h3>
                <p className="mt-1 text-sm text-white/70 line-clamp-2">{col.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  items: FAQItem[];
  title?: string;
}

export function FAQSection({ items, title = 'Frequently asked questions' }: FAQSectionProps) {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center">{title}</h2>
        <div className="divide-y divide-border">
          {items.map((item, i) => (
            <div key={i} className="py-5">
              <h3 className="text-base font-medium text-foreground mb-2">{item.question}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

interface NewsletterProps {
  title?: string;
  description?: string;
}

export function NewsletterSection({ title = 'Stay in the Scent', description = 'Subscribe for exclusive drops, offers, and fragrance tips.' }: NewsletterProps) {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary/10">
      <div className="max-w-2xl mx-auto text-center space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
        <form className="flex gap-2 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
          <Input type="email" placeholder="Enter your email" className="flex-1 bg-background" required />
          <Button type="submit">Subscribe</Button>
        </form>
      </div>
    </section>
  );
}

import { Input } from '@/components/ui/Input';