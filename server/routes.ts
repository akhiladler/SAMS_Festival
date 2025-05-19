import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertFileMetadataSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Add a simple health check endpoint
  app.get('/api/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'ok' });
  });

  // File metadata API routes
  app.post('/api/file-metadata', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = insertFileMetadataSchema.parse(req.body);
      const fileMetadata = await storage.createFileMetadata(validatedData);
      res.status(201).json(fileMetadata);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      next(error);
    }
  });

  app.get('/api/file-metadata/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id, 10);
      
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid ID format' });
      }
      
      const fileMetadata = await storage.getFileMetadata(id);
      
      if (!fileMetadata) {
        return res.status(404).json({ error: 'File metadata not found' });
      }
      
      res.status(200).json(fileMetadata);
    } catch (error) {
      next(error);
    }
  });

  app.get('/api/file-metadata', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const allFileMetadata = await storage.getAllFileMetadata();
      res.status(200).json(allFileMetadata);
    } catch (error) {
      next(error);
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
