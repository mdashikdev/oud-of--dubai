import { NextResponse } from 'next/server';
import type { Product } from '@/lib/shopify/types';

const MOCK_PRODUCTS: Partial<Product>[] = [
  { id: '1', handle: 'amber-oud', title: 'Amber Oud Impression', priceRange: { minVariantPrice: { amount: '650', currencyCode: 'BDT' } }, featuredImage: { url: 'https://images.unsplash.com/photo-1541643600914-78b14000e4ec?w=400', altText: 'Amber Oud' } },
  { id: '2', handle: 'rose-oud', title: 'Rose Oud Elixir', priceRange: { minVariantPrice: { amount: '750', currencyCode: 'BDT' } }, featuredImage: { url: 'https://images.unsplash.com/photo-1547887537-b372baf0595d?w=400', altText: 'Rose Oud' } },
  { id: '3', handle: 'sandal- musk', title: 'Sandal Musk Essence', priceRange: { minVariantPrice: { amount: '600', currencyCode: 'BDT' } }, featuredImage: { url: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400', altText: 'Sandal Musk' } },
  { id: '4', handle: 'citrus-oud', title: 'Citrus Oud Splash', priceRange: { minVariantPrice: { amount: '550', currencyCode: 'BDT' } }, featuredImage: { url: 'https://images.unsplash.com/photo-1608571423902-ace16fc59981?w=400', altText: 'Citrus Oud' } },
  { id: '5', handle: 'vanilla-amber', title: 'Vanilla Amber Blend', priceRange: { minVariantPrice: { amount: '700', currencyCode: 'BDT' } }, featuredImage: { url: 'https://images.unsplash.com/photo-1608527743292-c10a4d5a0e36?w=400', altText: 'Vanilla Amber' } },
  { id: '6', handle: 'jasmine-noir', title: 'Jasmine Noir Oil', priceRange: { minVariantPrice: { amount: '650', currencyCode: 'BDT' } }, featuredImage: { url: 'https://images.unsplash.com/photo-1600618528240-fb9daa3258b6?w=400', altText: 'Jasmine Noir' } },
  { id: '7', handle: 'oud-royale', title: 'Oud Royale Extrait', priceRange: { minVariantPrice: { amount: '1200', currencyCode: 'BDT' } }, featuredImage: { url: 'https://images.unsplash.com/photo-1541643600914-78b14000e4ec?w=400', altText: 'Oud Royale' } },
  { id: '8', handle: 'musk- silvery', title: 'Musk Silvery Essence', priceRange: { minVariantPrice: { amount: '580', currencyCode: 'BDT' } }, featuredImage: { url: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400', altText: 'Musk Silvery' } },
];

export async function GET() {
  return NextResponse.json(MOCK_PRODUCTS);
}