import { shopifyFetch } from '../client';
import type { Menu, MenuItem } from '../types';

const GET_MENUS_QUERY = `
  query GetMenus($handle: String!) {
    menu(handle: $handle) {
      id
      title
      items {
        id title url items { id title url items { id title url } }
      }
    }
  }
`;

export async function getMenu(handle: string) {
  const { data } = await shopifyFetch<{ menu: Menu }>({
    query: GET_MENUS_QUERY,
    variables: { handle },
    tags: ['menus', handle],
  });
  return data.menu;
}

export function buildMenuItems(items: MenuItem[]) {
  return items.map((item) => ({ ...item, items: item.items ? buildMenuItems(item.items) : [] }));
}