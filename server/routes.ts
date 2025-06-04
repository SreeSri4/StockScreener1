import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { screenerTypes, type ScreenerType } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Get stocks by screener type
  app.get("/api/stocks/screener/:type", async (req, res) => {
    try {
      const screenerType = req.params.type as ScreenerType;
      
      // Validate screener type
      const validationType = screenerTypes.safeParse(screenerType);
      if (!validationType.success) {
        return res.status(400).json({ 
          message: "Invalid screener type. Valid types: 52-week-high, volume-buzzers, 1-month-high, 100-percent-up" 
        });
      }

      const stocks = await storage.getStocksByScreener(screenerType);
      
      res.json({
        stocks: stocks.map(stock => ({
          ...stock,
          lastUpdated: stock.lastUpdated.toISOString(),
        })),
        count: stocks.length,
        screenerType,
      });
    } catch (error) {
      console.error("Error fetching stocks by screener:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get all stocks
  app.get("/api/stocks", async (req, res) => {
    try {
      const stocks = await storage.getAllStocks();
      
      res.json({
        stocks: stocks.map(stock => ({
          ...stock,
          lastUpdated: stock.lastUpdated.toISOString(),
        })),
        count: stocks.length,
      });
    } catch (error) {
      console.error("Error fetching all stocks:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  const httpServer = createServer(app);
  return httpServer;
}
