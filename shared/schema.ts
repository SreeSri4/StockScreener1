import { pgTable, text, serial, decimal, bigint, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const stocks = pgTable("stocks", {
  id: serial("id").primaryKey(),
  symbol: text("symbol").notNull().unique(),
  name: text("name").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  change: decimal("change", { precision: 10, scale: 2 }).notNull(),
  changePercent: decimal("change_percent", { precision: 8, scale: 4 }).notNull(),
  volume: bigint("volume", { mode: "number" }).notNull(),
  marketCap: bigint("market_cap", { mode: "number" }).notNull(),
  lastUpdated: timestamp("last_updated").defaultNow().notNull(),
});

export const insertStockSchema = createInsertSchema(stocks).omit({
  id: true,
  lastUpdated: true,
});

export type InsertStock = z.infer<typeof insertStockSchema>;
export type Stock = typeof stocks.$inferSelect;

export const screenerTypes = z.enum([
  "52-week-high",
  "volume-buzzers", 
  "1-month-high",
  "100-percent-up"
]);

export type ScreenerType = z.infer<typeof screenerTypes>;

export const stockResponseSchema = z.object({
  stocks: z.array(z.object({
    id: z.number(),
    symbol: z.string(),
    name: z.string(),
    price: z.string(),
    change: z.string(),
    changePercent: z.string(),
    volume: z.number(),
    marketCap: z.number(),
    lastUpdated: z.string(),
  })),
  count: z.number(),
  screenerType: screenerTypes,
});

export type StockResponse = z.infer<typeof stockResponseSchema>;
