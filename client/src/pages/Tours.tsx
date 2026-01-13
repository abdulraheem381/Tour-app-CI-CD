import { useTours } from "@/hooks/use-tours";
import { TourCard } from "@/components/TourCard";
import { Navbar } from "@/components/Navbar";
import { Loader2 } from "lucide-react";

export default function Tours() {
  const { data: tours, isLoading } = useTours();

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />
      
      <div className="bg-primary/5 py-16 mb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            All Tours
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Browse our complete collection of hand-picked adventures and find the perfect getaway.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {tours?.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
            {tours?.length === 0 && (
              <div className="col-span-full text-center py-20">
                <p className="text-muted-foreground text-xl">No tours found.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
