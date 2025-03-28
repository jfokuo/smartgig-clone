
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt } = await req.json();
    
    if (!prompt) {
      return new Response(
        JSON.stringify({ error: "Prompt is required" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Simple mock AI response for demonstration
    // In a real application, this would call an actual AI API like OpenAI
    const generateMockResponse = (prompt: string) => {
      const responses = [
        `Here's an AI-generated response to: "${prompt}"`,
        `Thinking about "${prompt}", I'd suggest...`,
        `Based on "${prompt}", here are some insights...`,
        `Analyzing "${prompt}" leads me to these conclusions...`
      ];
      
      const randomIndex = Math.floor(Math.random() * responses.length);
      return {
        content: responses[randomIndex],
        additionalDetails: "This is a mock AI response. In a real application, this would come from an AI provider like OpenAI."
      };
    };

    const aiResponse = generateMockResponse(prompt);
    
    return new Response(
      JSON.stringify(aiResponse),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
  } catch (error) {
    console.error("Error in generate-ai-content function:", error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
