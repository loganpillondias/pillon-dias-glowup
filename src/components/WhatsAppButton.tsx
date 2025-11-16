import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const WhatsAppButton = () => {
  const whatsappNumber = "5511999999999"; // Número aleatório - substituir pelo número correto
  const message = "Olá! Gostaria de agendar uma consulta na Pillon Beauty.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <Button
      asChild
      className="fixed bottom-6 right-6 rounded-full w-16 h-16 bg-green-600 hover:bg-green-700 shadow-lg z-40"
      aria-label="Contato via WhatsApp"
    >
      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
        <MessageCircle className="w-6 h-6" />
      </a>
    </Button>
  );
};

export default WhatsAppButton;
