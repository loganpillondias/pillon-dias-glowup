import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-card/95 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-playfair font-bold text-foreground">
            Estúdio Pillon Dias
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("inicio")}
              className="text-foreground hover:text-secondary transition-colors"
            >
              Início
            </button>
            <button
              onClick={() => scrollToSection("servicos")}
              className="text-foreground hover:text-secondary transition-colors"
            >
              Serviços
            </button>
            <button
              onClick={() => scrollToSection("galeria")}
              className="text-foreground hover:text-secondary transition-colors"
            >
              Galeria
            </button>
            <button
              onClick={() => scrollToSection("sobre")}
              className="text-foreground hover:text-secondary transition-colors"
            >
              Sobre
            </button>
            <button
              onClick={() => scrollToSection("contato")}
              className="text-foreground hover:text-secondary transition-colors"
            >
              Contato
            </button>
            <Button
              onClick={() => scrollToSection("contato")}
              variant="default"
              className="bg-secondary hover:bg-secondary/90"
            >
              Agende sua sessão
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-4">
            <button
              onClick={() => scrollToSection("inicio")}
              className="text-foreground hover:text-secondary transition-colors text-left"
            >
              Início
            </button>
            <button
              onClick={() => scrollToSection("servicos")}
              className="text-foreground hover:text-secondary transition-colors text-left"
            >
              Serviços
            </button>
            <button
              onClick={() => scrollToSection("galeria")}
              className="text-foreground hover:text-secondary transition-colors text-left"
            >
              Galeria
            </button>
            <button
              onClick={() => scrollToSection("sobre")}
              className="text-foreground hover:text-secondary transition-colors text-left"
            >
              Sobre
            </button>
            <button
              onClick={() => scrollToSection("contato")}
              className="text-foreground hover:text-secondary transition-colors text-left"
            >
              Contato
            </button>
            <Button
              onClick={() => scrollToSection("contato")}
              variant="default"
              className="bg-secondary hover:bg-secondary/90 w-full"
            >
              Agende sua sessão
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
