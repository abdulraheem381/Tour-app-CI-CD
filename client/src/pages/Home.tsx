import { useTours } from "@/hooks/use-tours";
import { TourCard } from "@/components/TourCard";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe2, Compass, Map } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";

export default function Home() {
  const { data: tours, isLoading } = useTours();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* Stunning mountain landscape */}
          <img
            src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=2000"
            alt="Mountain landscape"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 text-shadow-lg tracking-tight">
              Explore the World
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-10 font-light leading-relaxed text-shadow">
              Discover breathtaking destinations, curated experiences, and unforgettable journeys tailored just for you.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/tours">
                <Button size="lg" className="h-14 px-8 rounded-full text-lg bg-accent hover:bg-accent/90 text-white border-0 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  Find Your Adventure
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="h-14 px-8 rounded-full text-lg bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-sm transition-all">
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              { icon: Globe2, title: "Global Destinations", desc: "Access to over 500+ unique locations worldwide." },
              { icon: Compass, title: "Curated Experiences", desc: "Hand-picked adventures designed by travel experts." },
              { icon: Map, title: "Seamless Planning", desc: "Easy booking and itinerary management in one place." },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col items-center text-center p-6 rounded-2xl bg-secondary/20 border border-border/50"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="font-display text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Tours */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="font-display text-4xl font-bold text-foreground mb-4">Popular Destinations</h2>
              <p className="text-muted-foreground text-lg max-w-xl">
                Our most booked tours this season. Don't miss out on these incredible experiences.
              </p>
            </div>
            <Link href="/tours">
              <Button variant="ghost" className="hidden md:flex group text-primary hover:text-primary/80">
                View all tours 
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-96 bg-muted animate-pulse rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tours?.slice(0, 3).map((tour) => (
                <motion.div
                  key={tour.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                >
                  <TourCard tour={tour} />
                </motion.div>
              ))}
            </div>
          )}
          
          <div className="mt-12 text-center md:hidden">
            <Link href="/tours">
              <Button className="w-full" size="lg">View All Tours</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-24 bg-primary text-primary-foreground overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 pattern-dots" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">Ready for your next adventure?</h2>
          <p className="text-primary-foreground/80 text-xl max-w-2xl mx-auto mb-10">
            Join 50,000+ travelers and get exclusive offers, travel tips, and inspiration sent directly to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <Button size="lg" className="rounded-full px-8 bg-accent hover:bg-accent/90 text-white h-auto py-4">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
