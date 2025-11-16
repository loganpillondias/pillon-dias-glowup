import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, Send, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Olá! Eu sou a Diva, sua assistente virtual da Pillon Beauty. Posso te ajudar com informações sobre micropigmentação labial e sobre a profissional Rikelly Pillon. Como posso te ajudar?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("chat", {
        body: { messages: [...messages, { role: "user", content: userMessage }] },
      });

      if (error) {
        console.error("Error calling chat function:", error);
        if (error.message?.includes("429")) {
          toast({
            title: "Limite excedido",
            description: "Por favor, aguarde um momento antes de enviar outra mensagem.",
            variant: "destructive",
          });
        } else if (error.message?.includes("402")) {
          toast({
            title: "Serviço indisponível",
            description: "O serviço de IA está temporariamente indisponível.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Erro",
            description: "Não foi possível processar sua mensagem. Tente novamente.",
            variant: "destructive",
          });
        }
        setIsLoading(false);
        return;
      }

      if (data?.content) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.content },
        ]);
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Erro",
        description: "Não foi possível processar sua mensagem. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 rounded-full w-16 h-16 bg-secondary hover:bg-secondary/90 shadow-lg z-50"
        aria-label="Abrir assistente virtual"
      >
        <Sparkles className="w-6 h-6" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-24 right-6 w-96 h-[500px] shadow-2xl z-50 flex flex-col bg-card border-border">
      <div className="flex items-center justify-between p-4 border-b border-border bg-secondary/10">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-secondary" />
          <h3 className="font-playfair font-semibold text-foreground">
            Diva Assistant
          </h3>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(false)}
          className="hover:bg-secondary/20"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === "user"
                    ? "bg-secondary text-secondary-foreground"
                    : "bg-muted text-foreground"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-lg p-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-secondary rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-secondary rounded-full animate-bounce delay-100" />
                  <div className="w-2 h-2 bg-secondary rounded-full animate-bounce delay-200" />
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Digite sua pergunta..."
            disabled={isLoading}
            className="bg-background"
          />
          <Button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            size="icon"
            className="bg-secondary hover:bg-secondary/90"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default AIAssistant;
