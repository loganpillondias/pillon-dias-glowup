import { Instagram, Facebook, MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-card py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Logo e Descrição */}
          <div>
            <h3 className="text-2xl font-playfair font-bold mb-4">
              Maison Lumière by Rikelly Pillon
            </h3>
            <p className="text-card/80 mb-4">
              Realce sua beleza natural com elegância e precisão. Especialistas
              em micropigmentação e design de sobrancelhas.
            </p>
          </div>

          {/* Contato */}
          <div>
            <h4 className="text-xl font-playfair font-semibold mb-4">
              Contato
            </h4>
            <div className="space-y-3 text-card/80">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>Rua das Flores, 123 - Centro</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                <span>(11) 99999-9999</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                <span>contato@estudiopillondias.com.br</span>
              </div>
            </div>
          </div>

          {/* Redes Sociais */}
          <div>
            <h4 className="text-xl font-playfair font-semibold mb-4">
              Redes Sociais
            </h4>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-card/10 hover:bg-card/20 p-3 rounded-full transition-colors"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-card/10 hover:bg-card/20 p-3 rounded-full transition-colors"
              >
                <Facebook className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-card/20 pt-8 text-center text-card/60">
          <p>
            © {new Date().getFullYear()} Maison Lumière by Rikelly Pillon. Todos os direitos reservados.
          </p>
          <p className="mt-2">
            <a href="#" className="hover:text-card transition-colors">
              Política de Privacidade
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
