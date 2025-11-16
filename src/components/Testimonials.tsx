import { useState } from "react";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Maria Silva",
      city: "São Paulo, SP",
      text: "Experiência incrível! O resultado da micropigmentação labial ficou perfeito e muito natural. Recomendo demais a Pillon Beauty!",
      rating: 5,
    },
    {
      name: "Ana Costa",
      city: "Rio de Janeiro, RJ",
      text: "Profissionalismo impecável! Minhas sobrancelhas ficaram lindas e exatamente como eu queria. Ambiente aconchegante e atendimento personalizado.",
      rating: 5,
    },
    {
      name: "Juliana Oliveira",
      city: "Belo Horizonte, MG",
      text: "Melhor decisão que tomei! O design de sobrancelhas transformou meu rosto. Equipe super atenciosa e resultado maravilhoso.",
      rating: 5,
    },
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-4">
            O Que Nossas Clientes Dizem
          </h2>
          <p className="text-lg text-gray-text max-w-2xl mx-auto">
            Depoimentos de quem confia no nosso trabalho
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Card className="bg-card border-border shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="flex justify-center mb-4">
                {[...Array(testimonials[currentTestimonial].rating)].map(
                  (_, i) => (
                    <Star key={i} className="w-6 h-6 fill-secondary text-secondary" />
                  )
                )}
              </div>
              <p className="text-lg text-gray-text italic mb-6 leading-relaxed">
                "{testimonials[currentTestimonial].text}"
              </p>
              <p className="font-playfair text-xl font-semibold text-foreground">
                {testimonials[currentTestimonial].name}
              </p>
              <p className="text-muted-foreground">
                {testimonials[currentTestimonial].city}
              </p>
            </CardContent>
          </Card>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentTestimonial === index
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

export default Testimonials;
