import { useRoute, useLocation } from "wouter";
import { useTour } from "@/hooks/use-tours";
import { useUser } from "@/hooks/use-auth";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Clock, Calendar, MapPin, Check, ChevronLeft, Lock } from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export default function TourDetails() {
  const [match, params] = useRoute("/tours/:id");
  const { data: tour, isLoading, error } = useTour(params ? parseInt(params.id) : 0);
  const { data: user } = useUser();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !tour) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Tour not found</h1>
        <p className="text-muted-foreground mb-8">The tour you are looking for does not exist.</p>
        <Link href="/tours">
          <Button>Back to Tours</Button>
        </Link>
      </div>
    );
  }

  const handleBooking = () => {
    if (!user) {
      setLocation("/login");
      return;
    }
    toast({
      title: "Booking Initiated!",
      description: "This is a demo. In a real app, this would open a payment gateway.",
    });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />

      {/* Hero Image */}
      <div className="relative h-[60vh] w-full">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
        <img
          src={tour.image}
          alt={tour.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-6 left-4 md:left-8 z-20">
          <Link href="/tours">
            <Button variant="secondary" size="sm" className="bg-white/90 backdrop-blur-sm hover:bg-white text-foreground">
              <ChevronLeft className="w-4 h-4 mr-1" /> Back
            </Button>
          </Link>
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-20 container mx-auto px-4 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-3 py-1 bg-accent text-white text-xs font-bold uppercase tracking-wider rounded-md mb-4">
              Featured Tour
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-4 text-shadow">
              {tour.name}
            </h1>
            <div className="flex items-center gap-6 text-white/90 font-medium text-sm md:text-base">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-accent" />
                {tour.duration}
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-accent" />
                Multiple Locations
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8 relative z-30">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card rounded-2xl p-8 shadow-sm border border-border"
            >
              <h2 className="font-display text-2xl font-bold mb-4">Overview</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {tour.description}
              </p>
              
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {["Professional Guide", "Accommodation", "Meals Included", "Transport"].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-foreground/80">
                    <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="bg-card rounded-2xl p-8 shadow-sm border border-border">
              <h2 className="font-display text-2xl font-bold mb-6">Itinerary Highlights</h2>
              <div className="space-y-6">
                {[1, 2, 3].map((day) => (
                  <div key={day} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                        {day}
                      </div>
                      {day !== 3 && <div className="w-px h-full bg-border my-2" />}
                    </div>
                    <div className="pb-6">
                      <h4 className="font-bold text-lg">Day {day}: Exploration & Adventure</h4>
                      <p className="text-muted-foreground mt-1">
                        Detailed activities for day {day} of the trip. Experience local culture and sights.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-card rounded-2xl p-6 shadow-xl border border-border sticky top-24"
            >
              <div className="flex justify-between items-end mb-6">
                <div>
                  <p className="text-muted-foreground text-sm">Starting from</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-primary">${tour.price}</span>
                    <span className="text-muted-foreground">/ person</span>
                  </div>
                </div>
                <div className="bg-secondary/30 px-3 py-1 rounded-md text-xs font-bold text-secondary-foreground uppercase">
                  Best Value
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/20">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Next Available</p>
                    <p className="text-sm font-medium">Tomorrow, 9:00 AM</p>
                  </div>
                </div>
              </div>

              {user ? (
                <Button 
                  onClick={handleBooking}
                  className="w-full h-12 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all"
                >
                  Book Now
                </Button>
              ) : (
                <Button 
                  onClick={handleBooking}
                  variant="outline"
                  className="w-full h-12 text-lg font-medium border-primary text-primary hover:bg-primary/5"
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Log in to Book
                </Button>
              )}
              
              <p className="text-xs text-center text-muted-foreground mt-4">
                Free cancellation up to 24 hours before trip start.
              </p>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}
