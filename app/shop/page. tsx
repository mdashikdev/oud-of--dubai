import { getCollection, getCollections, getProducts } from '@/lib/shopify/queries/products';
import { FeaturedProducts, ProductGrid, SectionTitle } from '@/components/sections/HomepageSections';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import Link from 'next/link';
import { Suspense } from 'react';

export const metadata = {
  title: 'Shop All Fragrances',
  description: 'Browse all perfume oils, extrait de parfum, and signature fragrances.',
};

const CATEGORIES = [
  { handle: 'perfume', label: 'Extrait de Parfum' },
  { handle: 'perfume-oil', label: 'Pure Oils' },
  { handle: 'oils-library', label: 'Oils Library' },
  { handle: 'essence-pairings', label: 'Essence Pairings' },
  { handle: 'offer', label: 'Offers' },
];

export default async function ShopPage() {
  const [products, collections] = await Promise.all([
    getProducts(24, 'CREATED_AT', true),
    getCollections(20),
  ]);

  return (
    <div className="w-full py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        <SectionTitle title="Shop All Fragrances" description="Browse our complete collection of premium fragrances." />
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All</TabsTrigger>
            {CATEGORIES.map((cat) => (
              <TabsTrigger key={cat.handle} value={cat.handle}>
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="all">
            <ProductGrid products={products.nodes} />
          </TabsContent>
          {CATEGORIES.map((cat) => (
            <TabsContent key={cat.handle} value={cat.handle}>
              <Suspense fallback={<div className="h-32 animate-pulse bg-card rounded-lg" />}>
                <CollectionProducts handle={cat.handle} />
              </Suspense>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}

async function CollectionProducts({ handle }: { handle: string }) {
  const collection = await getCollection(handle, 24);
  if (!collection) return <p className="text-muted-foreground">No products found.</p>;
  return <ProductGrid products={collection.products.nodes} />;
}