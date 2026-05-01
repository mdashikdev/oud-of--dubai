'use client';

import * as React from 'react';
import { Button } from '@/components/ui/Button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/Sheet';
import { formatPrice, cn } from '@/lib/utils';
import { useCart } from '@/lib/cart-context';
import Image from 'next/image';
import { Plus, X, Gift, ChevronRight, ShoppingBag } from 'lucide-react';
import type { Product } from '@/lib/shopify/types';

const SLOT_COUNT = 4;
const DISCOUNT_RULES: Record<number, number> = { 2: 5, 3: 10, 4: 15 };

interface ComboSlot {
  product: Product | null;
  variantId: string | null;
}

export default function ComboBuilder() {
  const { addItem, applyDiscount, cart } = useCart();
  const [slots, setSlots] = React.useState<ComboSlot[]>(
    Array(SLOT_COUNT).fill(null).map(() => ({ product: null, variantId: null }))
  );
  const [pickerOpen, setPickerOpen] = React.useState(false);
  const [activeSlot, setActiveSlot] = React.useState<number | null>(null);
  const [products, setProducts] = React.useState<Product[]>([]);
  const [adding, setAdding] = React.useState(false);

  React.useEffect(() => {
    fetch('/api/combo/products')
      .then((r) => r.json())
      .then(setProducts)
      .catch(() => {});
  }, []);

  const filledSlots = slots.filter((s) => s.product !== null).length;
  const discountPct = DISCOUNT_RULES[filledSlots] || 0;
  const subtotal = slots.reduce(
    (sum, s) =>
      sum + (s.product ? Number(s.product.priceRange.minVariantPrice.amount) : 0),
    0
  );
  const savings = (subtotal * discountPct) / 100;
  const total = subtotal - savings;

  function openPicker(slotIndex: number) {
    setActiveSlot(slotIndex);
    setPickerOpen(true);
  }

  function selectProduct(product: Product) {
    if (activeSlot === null) return;
    const newSlots = [...slots];
    newSlots[activeSlot] = {
      product,
      variantId: product.variants.nodes[0]?.id || null,
    };
    setSlots(newSlots);
    setPickerOpen(false);
    setActiveSlot(null);
  }

  function removeSlot(index: number) {
    const newSlots = [...slots];
    newSlots[index] = { product: null, variantId: null };
    setSlots(newSlots);
  }

  async function handleAddBundle() {
    setAdding(true);
    try {
      for (const slot of slots) {
        if (slot.variantId) {
          await addItem(slot.variantId, 1);
        }
      }
      if (discountPct > 0) {
        await applyDiscount('COMBO10');
      }
    } finally {
      setAdding(false);
    }
  }

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      <div className="text-center space-y-3">
        <h1 className="text-3xl md:text-4xl font-bold">Create Your Own Combo</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Build your own signature combo — crafted your way, within a perfect balance.
        </p>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Your Combo</h2>
          <span className="text-sm text-muted-foreground">
            {filledSlots} / {SLOT_COUNT} items
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {slots.map((slot, i) => (
            <div
              key={i}
              className={cn(
                'relative aspect-square rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-colors',
                slot.product
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-muted-foreground cursor-pointer'
              )}
              onClick={() => !slot.product && openPicker(i)}
            >
              {slot.product ? (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); removeSlot(i); }}
                    className="absolute top-2 right-2 rounded-full bg-black/60 p-1 text-white hover:bg-destructive transition-colors z-10"
                    aria-label="Remove item"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                  {slot.product.featuredImage?.url && (
                    <div className="relative w-20 h-20">
                      <Image
                        src={slot.product.featuredImage.url}
                        alt={slot.product.title}
                        fill
                        className="object-cover rounded-lg"
                        sizes="80px"
                      />
                    </div>
                  )}
                  <span className="text-xs text-center px-2 line-clamp-2">
                    {slot.product.title}
                  </span>
                  <span className="text-xs text-primary font-medium">
                    {formatPrice(
                      Number(slot.product.priceRange.minVariantPrice.amount),
                      slot.product.priceRange.minVariantPrice.currencyCode
                    )}
                  </span>
                </>
              ) : (
                <>
                  <Plus className="h-8 w-8 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Slot {i + 1}</span>
                </>
              )}
            </div>
          ))}
        </div>

        <div className="space-y-3 pt-4 border-t border-border">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          {discountPct > 0 && (
            <div className="flex justify-between text-sm text-primary">
              <span>Combo Savings ({discountPct}%)</span>
              <span>-{formatPrice(savings)}</span>
            </div>
          )}
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span className="text-primary">{formatPrice(total)}</span>
          </div>
          {filledSlots < 2 && (
            <p className="text-xs text-muted-foreground">
              Add {2 - filledSlots} more to unlock {DISCOUNT_RULES[2]}% savings!
            </p>
          )}
          {filledSlots >= 2 && filledSlots < 3 && (
            <p className="text-xs text-muted-foreground">
              Add {3 - filledSlots} more to unlock {DISCOUNT_RULES[3]}% savings!
            </p>
          )}
          {filledSlots >= 3 && filledSlots < 4 && (
            <p className="text-xs text-muted-foreground">
              Add 1 more to unlock {DISCOUNT_RULES[4]}% savings!
            </p>
          )}
        </div>

        <Button
          className="w-full"
          size="lg"
          disabled={filledSlots === 0 || adding}
          onClick={handleAddBundle}
        >
          <ShoppingBag className="mr-2 h-5 w-5" />
          {adding ? 'Adding...' : `Add ${filledSlots} Items to Bag`}
        </Button>
      </div>

      <Sheet open={pickerOpen} onOpenChange={setPickerOpen}>
        <SheetContent side="right" className="w-full max-w-lg">
          <SheetHeader>
            <SheetTitle>Select a Product</SheetTitle>
          </SheetHeader>
          <div className="mt-6 space-y-4 overflow-y-auto max-h-[calc(100vh-120px)]">
            {products.map((product) => (
              <button
                key={product.id}
                onClick={() => selectProduct(product)}
                className="w-full flex items-center gap-4 p-3 rounded-lg border border-border hover:border-primary hover:bg-secondary/50 transition-colors text-left"
              >
                <div className="relative w-16 h-16 shrink-0 rounded-md overflow-hidden bg-card">
                  {product.featuredImage?.url && (
                    <Image
                      src={product.featuredImage.url}
                      alt={product.title}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{product.title}</p>
                  <p className="text-sm text-primary">
                    {formatPrice(
                      Number(product.priceRange.minVariantPrice.amount),
                      product.priceRange.minVariantPrice.currencyCode
                    )}
                  </p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}