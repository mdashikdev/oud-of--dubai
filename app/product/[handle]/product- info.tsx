'use client';

import * as React from 'react';
import { useCart } from '@/lib/cart-context';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { Minus, Plus, ShoppingBag, Star, StarHalf } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Product, ProductVariant } from '@/lib/shopify/types';
import Link from 'next/link';

export default function ProductInfo({ product }: { product: Product }) {
  const { addItem, cart, isLoading } = useCart();
  const [selectedVariant, setSelectedVariant] = React.useState<ProductVariant>(
    product.variants.nodes[0]
  );
  const [quantity, setQuantity] = React.useState(1);
  const [adding, setAdding] = React.useState(false);

  const price = Number(selectedVariant.price.amount);
  const comparePrice = selectedVariant.compareAtPrice
    ? Number(selectedVariant.compareAtPrice.amount)
    : null;
  const currency = selectedVariant.price.currencyCode;

  const hasDiscount = comparePrice && comparePrice > price;

  async function handleAddToCart() {
    setAdding(true);
    try {
      await addItem(selectedVariant.id, quantity);
    } finally {
      setAdding(false);
    }
  }

  function handleBuyNow() {
    handleAddToCart().then(() => {
      if (cart?.checkoutUrl) window.location.href = cart.checkoutUrl;
    });
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        {product.productType && (
          <Badge variant="outline" className="text-xs">{product.productType}</Badge>
        )}
        <h1 className="text-2xl md:text-3xl font-bold">{product.title}</h1>
        <div className="flex items-baseline gap-3">
          <span className="text-2xl font-semibold text-primary">
            {formatPrice(price, currency)}
          </span>
          {hasDiscount && (
            <span className="text-lg text-muted-foreground line-through">
              {formatPrice(comparePrice, currency)}
            </span>
          )}
        </div>
      </div>

      {product.descriptionHtml ? (
        <div
          className="prose prose-sm prose-invert max-w-none text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
        />
      ) : product.description ? (
        <p className="text-muted-foreground">{product.description}</p>
      ) : null}

      {product.variants.nodes.length > 1 && (
        <div className="space-y-2">
          <label className="text-sm font-medium">Size / Option</label>
          <Select
            value={selectedVariant.id}
            onValueChange={(val) => {
              const v = product.variants.nodes.find((v) => v.id === val);
              if (v) setSelectedVariant(v);
            }}
          >
            <SelectTrigger className="w-full max-w-xs">
              <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent>
              {product.variants.nodes.map((v) => (
                <SelectItem key={v.id} value={v.id}>
                  {v.title} — {formatPrice(Number(v.price.amount), v.price.currencyCode)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="flex items-center gap-4">
        <div className="flex items-center border border-border rounded-lg">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="px-3 py-2 hover:bg-secondary transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-12 text-center text-sm font-medium">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="px-3 py-2 hover:bg-secondary transition-colors"
            aria-label="Increase quantity"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <Button
          onClick={handleAddToCart}
          disabled={adding || isLoading || !selectedVariant.availableForSale}
          className="flex-1"
        >
          <ShoppingBag className="mr-2 h-4 w-4" />
          {adding ? 'Adding...' : 'Add to Bag'}
        </Button>
      </div>

      <Button variant="outline" className="w-full" onClick={handleBuyNow} disabled={adding || isLoading}>
        Buy Now
      </Button>

      {!selectedVariant.availableForSale && (
        <p className="text-sm text-destructive">Out of stock</p>
      )}

      {product.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
          {product.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}