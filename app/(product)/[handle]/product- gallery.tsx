'use client';

import * as React from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Product } from '@/lib/shopify/types';

export default function ProductGallery({ product }: { product: Product }) {
  const images = product.images.nodes.length > 0 ? product.images.nodes : [product.featuredImage].filter(Boolean);
  const [current, setCurrent] = React.useState(0);

  if (images.length === 0) {
    return (
      <div className="aspect-square rounded-2xl bg-card flex items-center justify-center">
        <span className="text-muted-foreground">No image</span>
      </div>
    );
  }

  const next = () => setCurrent((i) => (i + 1) % images.length);
  const prev = () => setCurrent((i) => (i - 1 + images.length) % images.length);

  return (
    <div className="space-y-4">
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-card">
        <Image
          src={images[current].url}
          alt={images[current].altText || product.title}
          fill
          className="object-cover"
          priority
          sizes="(min-width: 1280px) 50vw, (min-width: 768px) 50vw, 100vw"
        />
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white hover:bg-black/60 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white hover:bg-black/60 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={cn('h-1.5 w-1.5 rounded-full transition-colors', i === current ? 'bg-white' : 'bg-white/40')}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={cn(
                'relative shrink-0 aspect-square w-16 rounded-lg overflow-hidden border-2 transition-colors',
                i === current ? 'border-primary' : 'border-transparent hover:border-muted-foreground'
              )}
            >
              {img?.url && (
                <Image src={img.url} alt={img.altText || ''} fill className="object-cover" sizes="64px" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}