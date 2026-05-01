const domain = process.env.SHOPIFY_APPLICATION_ID
  ? `https://shopify.com/${process.env.SHOPIFY_APPLICATION_ID}/storefront/api/2025-01/graphql.json`
  : `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2025-01/graphql.json`;

export async function shopifyFetch<T = any>({
  query,
  variables,
  cache = 'force-cache',
  tags,
}: {
  query: string;
  variables?: Record<string, any>;
  cache?: RequestCache;
  tags?: string[];
}) {
  const key = process.env.SHOPIFY_APPLICATION_ID
    ? process.env.SHOPIFY_APPLICATION_ID
    : process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

  const endpoint = `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2025-01/graphql.json`;

  try {
    const result = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': key,
        ...(process.env.SHOPIFY_APPLICATION_ID && {
          'Shopify-Application-Id': process.env.SHOPIFY_APPLICATION_ID,
        }),
      },
      body: JSON.stringify({ query, variables }),
      ...(cache !== 'no-store' ? { cache } : {}),
      ...(tags ? { next: { tags } } : {}),
    });

    if (result.status > 200) {
      throw new Error(`Shopify API error: ${result.status} ${result.statusText}`);
    }

    const json = await result.json();

    if (json.errors) {
      console.error('Shopify GraphQL errors:', json.errors);
    }

    return json as { data: T; status: number };
  } catch (error) {
    console.error('Shopify fetch error:', error);
    throw error;
  }
}