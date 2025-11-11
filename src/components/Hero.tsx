import { Button } from "@/components/ui/button";
import heroBackground from "@/assets/hero-background.jpg";

const Hero = () => {
  const scrollToContact = () => {
    const element = document.getElementById("contato");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(248, 237, 235, 0.7), rgba(248, 237, 235, 0.7)), url(${heroBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="container mx-auto px-4 py-20 text-center fade-in">
        <h1 className="text-5xl md:text-7xl font-playfair font-bold text-foreground mb-6 leading-tight">
          Realce sua beleza natural
          <br />
          com elegância e precisão
        </h1>
        <p className="text-xl md:text-2xl text-gray-text mb-8 max-w-3xl mx-auto font-light">
          Micropigmentação labial e design de sobrancelhas assinados por
          especialistas
        </p>
        <Button
          onClick={scrollToContact}
          size="lg"
          className="bg-secondary hover:bg-secondary/90 text-lg px-8 py-6 shadow-lg hover-scale"
        >
          Agendar Atendimento
        </Button>
      </div>
    </section>
  );
};

export default Hero;
