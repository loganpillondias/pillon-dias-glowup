import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    email: "",
    service: "",
    date: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // TODO: Integração futura com N8N
    // await fetch('/api/lead', { method: 'POST', body: JSON.stringify(formData) });
    
    toast({
      title: "Agendamento solicitado!",
      description: "Em breve entraremos em contato para confirmar sua sessão.",
    });
    
    setFormData({
      name: "",
      whatsapp: "",
      email: "",
      service: "",
      date: "",
      message: "",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contato" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-4">
            Agende sua Sessão
          </h2>
          <p className="text-lg text-gray-text max-w-2xl mx-auto">
            Preencha o formulário e entraremos em contato para confirmar seu atendimento
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6 slide-in">
            <div>
              <Label htmlFor="name">Nome Completo</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Seu nome"
                className="bg-background"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="whatsapp">WhatsApp</Label>
                <Input
                  id="whatsapp"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  required
                  placeholder="(00) 00000-0000"
                  className="bg-background"
                />
              </div>
              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="seu@email.com"
                  className="bg-background"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="service">Serviço de Interesse</Label>
                <Select
                  value={formData.service}
                  onValueChange={(value) =>
                    setFormData({ ...formData, service: value })
                  }
                >
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Selecione um serviço" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="micropigmentacao">
                      Micropigmentação Labial
                    </SelectItem>
                    <SelectItem value="design">
                      Design de Sobrancelhas
                    </SelectItem>
                    <SelectItem value="consultoria">
                      Consultoria de Imagem
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="date">Data Preferida</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="bg-background"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="message">Mensagem (opcional)</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Conte-nos um pouco sobre suas expectativas..."
                className="bg-background min-h-[120px]"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-secondary hover:bg-secondary/90 text-lg py-6"
            >
              Solicitar Agendamento
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
