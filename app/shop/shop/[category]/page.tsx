import { getCollection, getCollections } from '@/lib/shopify/queries/products';
import { ProductGrid, SectionTitle } from '@/components/sections/HomepageSections';
import Link from 'next/link';
import { Metadata } from 'next';

export async function generateStaticParams() {
  const collections = await getCollections();
  return collections.map((collection: { handle: string }) => ({
    category: collection.handle,
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const collection = await getCollection(params.category);
  
  if (!collection) {
    return {
      title: 'Collection Not Found | Oud of Dubai',
    };
  }

  return {
    title: `${collection.title} | Oud of Dubai`,
    description: collection.description || `Shop our premium ${collection.title} collection of luxury perfumes and fragrances.`,
    openGraph: {
      title: `${collection.title} | Oud of Dubai`,
      description: collection.description || `Shop our premium ${collection.title} collection.`,
    },
  };
}

export default async function CategoryPage(props: {
  params: Promise<{ category: string }>;
}) {
  const params = await props.params;
  const collection = await getCollection(params.category);

  if (!collection) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif text-[#d4a853] mb-4">Collection Not Found</h1>
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

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif text-[#d4a853] mb-6">
            {collection.title}
          </h1>
          {collection.description && (
            <p className="text-[#a0a0a0] text-lg leading-relaxed">
              {collection.description}
            </p>
          )}
        </div>

        <ProductGrid products={collection.products} />

        <div className="mt-16 text-center">
          <Link 
            href="/shop"
            className="inline-flex items-center text-[#a0a0a0] hover:text-[#d4a853] transition-colors"
          >
            ← Browse All Fragrances
          </Link>
        </div>
      </div>
    </div>
  );
}