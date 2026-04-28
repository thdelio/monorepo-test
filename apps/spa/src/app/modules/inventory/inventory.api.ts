import type { WebInventoryProxyResponse } from '@erp/contracts';

export async function fetchInventory(
  limit = 10,
): Promise<WebInventoryProxyResponse> {
  const response = await fetch(`/api/web/inventory/items?limit=${limit}`, {
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`No se pudo cargar inventario. Status: ${response.status}`);
  }

  return response.json() as Promise<WebInventoryProxyResponse>;
}
