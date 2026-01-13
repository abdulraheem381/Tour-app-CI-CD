import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { api } from "@shared/routes";
import { z } from "zod";
import { insertUserSchema, insertTourSchema } from "@shared/schema";
import passport from "passport";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Setup Auth
  const { hashPassword } = setupAuth(app);

  // Auth Routes
  app.post(api.auth.register.path, async (req, res) => {
    try {
      const input = insertUserSchema.parse(req.body);
      const existingUser = await storage.getUserByUsername(input.username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }
      const hashedPassword = await hashPassword(input.password);
      const user = await storage.createUser({ ...input, password: hashedPassword });
      req.login(user, (err) => {
        if (err) return res.status(500).json({ message: "Login failed after register" });
        return res.status(201).json(user);
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      throw err;
    }
  });

  app.post(api.auth.login.path, (req, res, next) => {
    // Passport authentication middleware
    passport.authenticate('local', (err: any, user: any, info: any) => {
      if (err) return next(err);
      if (!user) return res.status(401).json({ message: "Invalid credentials" });
      req.login(user, (err) => {
        if (err) return next(err);
        return res.status(200).json(user);
      });
    })(req, res, next);
  });

  app.post(api.auth.logout.path, (req, res) => {
    req.logout((err) => {
      if (err) return res.status(500).json({ message: "Logout failed" });
      res.sendStatus(200);
    });
  });

  app.get(api.auth.me.path, (req, res) => {
    if (req.isAuthenticated()) {
      res.json(req.user);
    } else {
      res.status(401).send();
    }
  });

  // Tour Routes
  app.get(api.tours.list.path, async (req, res) => {
    const tours = await storage.getAllTours();
    res.json(tours);
  });

  app.get(api.tours.get.path, async (req, res) => {
    const tour = await storage.getTour(Number(req.params.id));
    if (!tour) return res.status(404).json({ message: "Tour not found" });
    res.json(tour);
  });

  // Booking Routes
  app.post(api.bookings.create.path, async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { tourId } = req.body;
    const tour = await storage.getTour(Number(tourId));
    if (!tour) {
      return res.status(404).json({ message: "Tour not found" });
    }
    const booking = await storage.createBooking({
      userId: (req.user as any).id,
      tourId: Number(tourId),
    });
    res.status(201).json(booking);
  });

  app.get(api.bookings.list.path, async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const bookings = await storage.getBookingsByUser((req.user as any).id);
    res.json(bookings);
  });

  // Health Check
  app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Seed Data
  await seedTours();

  return httpServer;
}

async function seedTours() {
  const existing = await storage.getAllTours();
  if (existing.length === 0) {
    console.log("Seeding tours...");
    const tours = [
      {
        name: "Grand Canyon Expedition",
        description: "Explore the depths of the Grand Canyon with our expert guides. 3 days of hiking and camping.",
        price: 499,
        duration: "3 days",
        image: "https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?auto=format&fit=crop&q=80&w=1000",
      },
      {
        name: "Kyoto Cherry Blossom Tour",
        description: "Experience the magic of cherry blossom season in Kyoto, Japan. Visit ancient temples and gardens.",
        price: 1200,
        duration: "5 days",
        image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=1000",
      },
      {
        name: "Safari in Serengeti",
        description: "Witness the great migration and see the big five in their natural habitat in Tanzania.",
        price: 2500,
        duration: "7 days",
        image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=1000",
      },
      {
        name: "Paris City Break",
        description: "Romantic getaway to the city of lights. Includes Eiffel Tower dinner and Louvre tour.",
        price: 899,
        duration: "4 days",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=1000",
      },
    ];

    for (const tour of tours) {
      await storage.createTour(tour);
    }
    console.log("Tours seeded!");
  }
}
