import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle(pool, { schema });

// Initialize database schema on startup using raw SQL
export async function initializeDatabase() {
  let retries = 0;
  const maxRetries = 5;
  
  while (retries < maxRetries) {
    try {
      const client = await pool.connect();
      try {
        // Create tables if they don't exist
        await client.query(`
          CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            role TEXT NOT NULL DEFAULT 'USER'
          );
        `);
        
        await client.query(`
          CREATE TABLE IF NOT EXISTS tours (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            description TEXT NOT NULL,
            price INTEGER NOT NULL,
            duration TEXT NOT NULL,
            image TEXT NOT NULL
          );
        `);
        
        await client.query(`
          CREATE TABLE IF NOT EXISTS bookings (
            id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL,
            tour_id INTEGER NOT NULL,
            booked_at TIMESTAMP DEFAULT NOW()
          );
        `);
        
        console.log("Database schema initialized successfully");
        return;
      } finally {
        client.release();
      }
    } catch (error) {
      retries++;
      if (retries < maxRetries) {
        console.warn(`Database initialization attempt ${retries} failed, retrying...`, error);
        await new Promise(resolve => setTimeout(resolve, 1000));
      } else {
        console.error("Failed to initialize database after max retries:", error);
        throw error;
      }
    }
  }
}
