import { shopifyFetch } from '../client';
import type { Product, Collection, PageInfo } from '../types';

const PRODUCT_FIELDS = `
  fragment ProductFields on Product {
    id
    handle
    title
    description
    descriptionHtml
    availableForSale
    productType
    vendor
    tags
    priceRange {
      minVariantPrice { amount currencyCode }
      maxVariantPrice { amount currencyCode }
    }
    compareAtPriceRange {
      minVariantPrice { amount currencyCode }
      maxVariantPrice { amount currencyCode }
    }
    featuredImage { url altText width height }
    images(first: 10) {
      nodes { url altText width height }
    }
    variants(first: 20) {
      nodes {
        id
        title
        availableForSale
        selectedOptions { name value }
        price { amount currencyCode }
        compareAtPrice { amount currencyCode }
        image { url altText width height }
      }
    }
    options { name values }
  }
`;

const GET_PRODUCTS_QUERY = `
  ${PRODUCT_FIELDS}
  query GetProducts($first: Int!, $sortKey: ProductSortKeys, $reverse: Boolean) {
    products(first: $first, sortKey: $sortKey, reverse: $reverse) {
      nodes { ...ProductFields }
      pageInfo { hasNextPage endCursor }
    }
  }
`;

const GET_PRODUCT_BY_HANDLE_QUERY = `
  ${PRODUCT_FIELDS}
  query GetProductByHandle($handle: String!) {
    product(handle: $handle) { ...ProductFields }
  }
`;

const GET_PRODUCTS_BY_HANDLES_QUERY = `
  ${PRODUCT_FIELDS}
  query GetProductsByHandles($handles: [ProductHandle!]!) {
    productsByHandles(handles: $handles) {
      nodes { ...ProductFields }
    }
  }
`;

const GET_COLLECTIONS_QUERY = `
  query GetCollections($first: Int!) {
    collections(first: $first) {
      nodes {
        id handle title description image { url altText width height }
      }
    }
  }
`;

const GET_COLLECTION_BY_HANDLE_QUERY = `
  ${PRODUCT_FIELDS}
  query GetCollectionByHandle($handle: String!, $first: Int!, $sortKey: ProductCollectionSortKeys) {
    collection(handle: $handle) {
      id handle title description image { url altText width height }
      products(first: $first, sortKey: $sortKey) {
        nodes { ...ProductFields }
        pageInfo { hasNextPage endCursor }
      }
    }
  }
`;

export async function getProducts(first = 24, sortKey = 'TITLE', reverse = false) {
  const { data } = await shopifyFetch<{ products: { nodes: Product[]; pageInfo: PageInfo } }>({
    query: GET_PRODUCTS_QUERY,
    variables: { first, sortKey, reverse },
    tags: ['products'],
  });
  return data.products;
}

export async function getProduct(handle: string) {
  const { data } = await shopifyFetch<{ product: Product }>({
    query: GET_PRODUCT_BY_HANDLE_QUERY,
    variables: { handle },
    cache: 'no-store',
    tags: ['products', handle],
  });
  return data.product;
}

export async function getProductsByHandles(handles: string[]) {
  const { data } = await shopifyFetch<{ productsByHandles: { nodes: Product[] } }>({
    query: GET_PRODUCTS_BY_HANDLES_QUERY,
    variables: { handles },
    cache: 'no-store',
    tags: ['products'],
  });
  return data.productsByHandles.nodes;
}

export async function getCollections(first = 20) {
  const { data } = await shopifyFetch<{ collections: { nodes: Omit<Collection, 'products'>[] } }>({
    query: GET_COLLECTIONS_QUERY,
    variables: { first },
    tags: ['collections'],
  });
  return data.collections.nodes;
}

export async function getCollection(handle: string, first = 24, sortKey = 'COLLECTION_DEFAULT') {
  const { data } = await shopifyFetch<{ collection: Collection }>({
    query: GET_COLLECTION_BY_HANDLE_QUERY,
    variables: { handle, first, sortKey },
    tags: ['collections', handle],
  });
  return data.collection;
}