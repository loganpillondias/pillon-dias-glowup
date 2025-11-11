import { Sparkles, Eye, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Services = () => {
  const scrollToContact = () => {
    const element = document.getElementById("contato");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const services = [
    {
      icon: <Sparkles className="w-12 h-12 text-secondary" />,
      title: "Micropigmentação Labial",
      description:
        "Realce e defina seus lábios com precisão. Técnica avançada que proporciona cor natural e duradoura, aumentando o volume e corrigindo assimetrias.",
    },
    {
      icon: <Eye className="w-12 h-12 text-secondary" />,
      title: "Design de Sobrancelhas",
      description:
        "Sobrancelhas perfeitamente desenhadas para harmonizar seu rosto. Técnicas personalizadas que valorizam suas características naturais.",
    },
    {
      icon: <Users className="w-12 h-12 text-secondary" />,
      title: "Consultoria de Imagem Facial",
      description:
        "Análise completa do seu rosto para determinar o melhor design de sobrancelhas e cor de lábios que complementam sua beleza natural.",
    },
  ];

  return (
    <section id="servicos" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-4">
            Nossos Serviços
          </h2>
          <p className="text-lg text-gray-text max-w-2xl mx-auto">
            Tratamentos exclusivos para realçar sua beleza com sofisticação e
            naturalidade
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="fade-in hover-scale border-border bg-card shadow-md"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">{service.icon}</div>
                <CardTitle className="text-2xl font-playfair">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-text text-base text-center mb-6">
                  {service.description}
                </CardDescription>
                <Button
                  onClick={scrollToContact}
                  variant="outline"
                  className="w-full border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
                >
                  Saiba mais
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
