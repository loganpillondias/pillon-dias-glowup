import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import browsBeforeAfter from "@/assets/brows-before-after.jpg";
import lipsBeforeAfter from "@/assets/lips-before-after.jpg";

const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    {
      src: browsBeforeAfter,
      alt: "Design de Sobrancelhas - Antes e Depois",
      title: "Design de Sobrancelhas",
    },
    {
      src: lipsBeforeAfter,
      alt: "Micropigmentação Labial - Antes e Depois",
      title: "Micropigmentação Labial",
    },
  ];

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section id="galeria" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-4">
            Galeria de Transformações
          </h2>
          <p className="text-lg text-gray-text max-w-2xl mx-auto">
            Veja os resultados incríveis de nossos tratamentos
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="relative overflow-hidden rounded-lg shadow-lg">
            <img
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              className="w-full h-auto fade-in"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/80 to-transparent p-6">
              <h3 className="text-2xl font-playfair text-card">
                {images[currentIndex].title}
              </h3>
            </div>
          </div>

          {/* Navigation Buttons */}
          <Button
            onClick={prevImage}
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-card/90 hover:bg-card"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <Button
            onClick={nextImage}
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-card/90 hover:bg-card"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentIndex === index
                    ? "bg-secondary w-8"
                    : "bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
