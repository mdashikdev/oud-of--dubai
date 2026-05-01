'use client';

import { useCart } from '@/lib/cart-context';
import { formatPrice, cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import Image from 'next/image';
import { Minus, Plus, X, ShoppingBag, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function CartPage() {
  const { cart, isLoading, updateItem, removeItem } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  if (!cart || cart.totalQuantity === 0) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
        <ShoppingBag className="h-16 w-16 text-muted-foreground" />
        <h1 className="text-2xl font-bold">Your bag is empty</h1>
        <p className="text-muted-foreground">Add some fragrances to get started.</p>
        <Link href="/shop">
          <Button size="lg">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold">Your Bag ({cart.totalQuantity} items)</h1>

        <div className="space-y-4">
          {cart.lines.nodes.map((line) => {
            const product = line.merchandise.product;
            const image = line.merchandise.image || product.featuredImage;
            const price = Number(line.merchandise.price.amount);
            const currency = line.merchandise.price.currencyCode;

            return (
              <div
                key={line.id}
                className="flex gap-4 border-b border-border pb-4"
              >
                <Link
                  href={`/product/${product.handle}`}
                  className="relative h-24 w-20 shrink-0 overflow-hidden rounded-lg bg-card"
                >
                  {image?.url && (
                    <Image
                      src={image.url}
                      alt={image.altText || product.title}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  )}
                </Link>
                <div className="flex-1 space-y-1">
                  <Link
                    href={`/product/${product.handle}`}
                    className="text-sm font-medium hover:text-primary transition-colors line-clamp-2"
                  >
                    {product.title}
                  </Link>
                  <p className="text-xs text-muted-foreground">
                    {line.merchandise.selectedOptions
                      .map((o: any) => o.value)
                      .join(', ')}
                  </p>
                  <p className="text-sm font-medium text-primary">
                    {formatPrice(price, currency)}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <button
                    onClick={() => removeItem(line.id)}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                    aria-label="Remove item"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateItem(line.id, line.quantity - 1)}
                      disabled={line.quantity <= 1 || isLoading}
                      className="rounded-md p-1 hover:bg-secondary transition-colors disabled:opacity-50"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-6 text-center text-sm">{line.quantity}</span>
                    <button
                      onClick={() => updateItem(line.id, line.quantity + 1)}
                      disabled={isLoading}
                      className="rounded-md p-1 hover:bg-secondary transition-colors disabled:opacity-50"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="space-y-4 border-t border-border pt-6">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span>
              {formatPrice(
                Number(cart.cost.subtotalAmount.amount),
                cart.cost.subtotalAmount.currencyCode
              )}
            </span>
          </div>
          {cart.cost.totalTaxAmount && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tax</span>
              <span>
                {formatPrice(
                  Number(cart.cost.totalTaxAmount.amount),
                  cart.cost.totalTaxAmount.currencyCode
                )}
              </span>
            </div>
          )}
          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span className="text-primary">
              {formatPrice(
                Number(cart.cost.totalAmount.amount),
                cart.cost.totalAmount.currencyCode
              )}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <a href={cart.checkoutUrl} target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="w-full group">
              Proceed to Checkout
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </a>
          <Link href="/shop">
            <Button variant="outline" size="lg" className="w-full">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}