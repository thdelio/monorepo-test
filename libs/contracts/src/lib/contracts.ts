import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const inventoryListQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(50).default(5),
});

export const inventoryItemSchema = z.object({
  id: z.number().int().positive(),
  sku: z.string().min(1),
  name: z.string().min(1),
  stock: z.number().int().nonnegative(),
});

export const inventoryItemsResponseSchema = z.object({
  source: z.literal('api-inventory'),
  items: z.array(inventoryItemSchema),
  generatedAt: z.iso.datetime(),
});

export const webInventoryProxyResponseSchema = z.object({
  source: z.literal('api-web'),
  inventory: inventoryItemsResponseSchema,
});

export type InventoryListQuery = z.infer<typeof inventoryListQuerySchema>;
export type InventoryItem = z.infer<typeof inventoryItemSchema>;
export type InventoryItemsResponse = z.infer<
  typeof inventoryItemsResponseSchema
>;
export type WebInventoryProxyResponse = z.infer<
  typeof webInventoryProxyResponseSchema
>;

export class InventoryListQueryDto extends createZodDto(
  inventoryListQuerySchema,
) {}

export class InventoryItemsResponseDto extends createZodDto(
  inventoryItemsResponseSchema,
) {}

export class WebInventoryProxyResponseDto extends createZodDto(
  webInventoryProxyResponseSchema,
) {}
