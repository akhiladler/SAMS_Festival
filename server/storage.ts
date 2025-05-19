import { users, fileMetadata, type User, type InsertUser, type FileMetadata, type InsertFileMetadata } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // File metadata methods
  createFileMetadata(metadata: InsertFileMetadata): Promise<FileMetadata>;
  getFileMetadata(id: number): Promise<FileMetadata | undefined>;
  getAllFileMetadata(): Promise<FileMetadata[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }
  
  // File metadata methods
  async createFileMetadata(metadata: InsertFileMetadata): Promise<FileMetadata> {
    const [result] = await db
      .insert(fileMetadata)
      .values(metadata)
      .returning();
    return result;
  }
  
  async getFileMetadata(id: number): Promise<FileMetadata | undefined> {
    const [result] = await db
      .select()
      .from(fileMetadata)
      .where(eq(fileMetadata.id, id));
    return result || undefined;
  }
  
  async getAllFileMetadata(): Promise<FileMetadata[]> {
    return await db.select().from(fileMetadata);
  }
}

// For memory storage fallback if database connection fails
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private fileMetadata: Map<number, FileMetadata>;
  private userIdCounter: number;
  private fileIdCounter: number;

  constructor() {
    this.users = new Map();
    this.fileMetadata = new Map();
    this.userIdCounter = 1;
    this.fileIdCounter = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // File metadata methods
  async createFileMetadata(metadata: InsertFileMetadata): Promise<FileMetadata> {
    const id = this.fileIdCounter++;
    const fileData = { ...metadata, id } as FileMetadata;
    this.fileMetadata.set(id, fileData);
    return fileData;
  }
  
  async getFileMetadata(id: number): Promise<FileMetadata | undefined> {
    return this.fileMetadata.get(id);
  }
  
  async getAllFileMetadata(): Promise<FileMetadata[]> {
    return Array.from(this.fileMetadata.values());
  }
}

// Use database storage
export const storage = new DatabaseStorage();
