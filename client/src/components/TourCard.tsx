import { Link } from "wouter";
import { type Tour } from "@shared/schema";
import { Clock, Tag } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface TourCardProps {
  tour: Tour;
}

export function TourCard({ tour }: TourCardProps) {
  return (
    <Card className="group overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full bg-card">
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />
        <img
          src={tour.image}
          alt={tour.name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm">
          ${tour.price}
        </div>
      </div>

      <CardHeader className="p-5 pb-2">
        <h3 className="font-display text-xl font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
          {tour.name}
        </h3>
      </CardHeader>

      <CardContent className="p-5 pt-2 flex-grow">
        <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed mb-4">
          {tour.description}
        </p>
        
        <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground">
          <div className="flex items-center gap-1.5 bg-secondary/50 px-2.5 py-1 rounded-md text-secondary-foreground">
            <Clock className="w-3.5 h-3.5" />
            {tour.duration}
          </div>
          <div className="flex items-center gap-1.5 bg-blue-50 px-2.5 py-1 rounded-md text-blue-700">
            <Tag className="w-3.5 h-3.5" />
            Adventure
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-5 pt-0 mt-auto">
        <Link href={`/tours/${tour.id}`} className="w-full">
          <Button className="w-full bg-primary/10 hover:bg-primary hover:text-white text-primary font-semibold shadow-none hover:shadow-lg transition-all duration-300">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
