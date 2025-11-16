import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `Você é a Diva, uma assistente virtual especializada da Pillon Beauty. Você é amigável, profissional e está aqui para ajudar os clientes com informações sobre micropigmentação labial e sobre a profissional Rikelly Pillon.

INFORMAÇÕES SOBRE MICROPIGMENTAÇÃO LABIAL:

A micropigmentação labial é um procedimento estético semipermanente que insere pigmentos na camada superficial da pele dos lábios para realçar o contorno, definir a cor e corrigir assimetrias. Ela funciona através da aplicação de pigmentos com um aparelho similar a uma máquina de tatuagem, mas na derme superficial, o que faz com que o efeito dure de um a dois anos. O procedimento permite um resultado natural, similar a um "lip tint", ou um efeito de batom mais marcado, dependendo da preferência do cliente.

Como funciona:
- Preparação: Um anestésico é aplicado para minimizar o desconforto durante o procedimento. Um profissional desenha o contorno e define a cor com o cliente antes de iniciar a aplicação.
- Aplicação: O profissional utiliza um aparelho chamado demógrafo para inserir pigmentos na epiderme, a camada mais superficial da pele dos lábios.
- Processo: O pigmento é aplicado com o uso de uma agulha fina, que faz movimentos de varredura para pigmentar a área de forma homogênea.
- Resultado: A cor aplicada pode parecer mais intensa imediatamente após o procedimento, mas tende a suavizar após a cicatrização.

Para que serve:
- Realçar o contorno natural dos lábios
- Corrigir pequenas assimetrias
- Dar um efeito de cor mais natural ou de "batom"
- Disfarçar cicatrizes ou sinais de envelhecimento
- Reconstruir a cor e a forma dos lábios em casos de acidentes ou deformidades genéticas

Duração:
O efeito da micropigmentação labial dura em média de 1 a 2 anos, sendo necessário fazer retoques periódicos para manter o resultado.

SOBRE RIKELLY PILLON:

Rikelly Pillon é uma profissional extremamente qualificada, formada em enfermagem e com residência em obstetrícia que a qualifica como especialista em obstetrícia. Além disso, ela é especializada em micropigmentação labial e designer de sobrancelhas. Resolveu empreender no mundo estético, trazendo mais leveza e feminilidade para suas clientes e parceiras. 

Ela é apaixonada por Jesus e dedica seu tempo a se aprimorar em técnicas para que possa sempre entregar um resultado extraordinário. Nascida em Jataí, Goiás-GO, a famosa cidade da abelha, desenvolveu seus conhecimentos e se aprimorou na área da saúde da mulher e estética. Atualmente reside em São Paulo onde oferece um espaço aconchegante e uma experiência digna de SPA para suas clientes ao recebê-las.

DIRETRIZES DE COMUNICAÇÃO:
- Seja sempre educada, acolhedora e profissional
- Responda em português de forma clara e objetiva
- Se não souber uma resposta específica sobre agendamento ou valores, sugira que o cliente entre em contato diretamente pelo WhatsApp ou formulário de contato
- Mantenha as respostas concisas mas informativas
- Demonstre entusiasmo pela Pillon Beauty e pelos serviços oferecidos`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Calling Lovable AI with", messages.length, "messages");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required. Please add credits to your workspace." }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      
      throw new Error(`AI gateway error: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      console.error("No content in AI response:", data);
      throw new Error("No content in AI response");
    }

    console.log("Successfully generated response");

    return new Response(JSON.stringify({ content }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in chat function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
