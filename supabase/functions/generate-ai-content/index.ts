
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

    // Generate a simple, solution-oriented response
    const generateSimpleResponse = (prompt: string) => {
      // Extract keywords from prompt to determine the type of help needed
      const keywords = prompt.toLowerCase();
      let responseType = "general";
      
      if (keywords.includes("error") || keywords.includes("bug") || keywords.includes("fix") || keywords.includes("problem")) {
        responseType = "troubleshooting";
      } else if (keywords.includes("how to") || keywords.includes("implement") || keywords.includes("create")) {
        responseType = "tutorial";
      } else if (keywords.includes("improve") || keywords.includes("optimize") || keywords.includes("better")) {
        responseType = "optimization";
      } else if (keywords.includes("learn") || keywords.includes("understand")) {
        responseType = "educational";
      }
      
      // Generate appropriate response based on the type
      let content = "";
      switch (responseType) {
        case "troubleshooting":
          content = `Here's how to fix "${prompt}":\n\n` +
            `1. Check for: syntax errors, missing imports, or configuration issues\n` +
            `2. Try these solutions:\n` +
            `   - Restart your development server\n` +
            `   - Verify all dependencies are installed\n` +
            `   - Check the console for error details\n` +
            `3. If still having issues, search the error message online or ask in a forum`;
          break;
          
        case "tutorial":
          content = `Quick guide for "${prompt}":\n\n` +
            `1. Set up your environment\n` +
            `2. Create the basic structure\n` +
            `3. Implement the core functionality\n` +
            `4. Test and refine\n\n` +
            `Pro tip: Start with a minimal working example and build up from there!`;
          break;
          
        case "optimization":
          content = `Tips to improve "${prompt}":\n\n` +
            `1. Focus on the most critical performance bottlenecks first\n` +
            `2. Consider caching frequently accessed data\n` +
            `3. Simplify complex logic and remove any redundant code\n` +
            `4. Use appropriate data structures for your specific use case`;
          break;
          
        case "educational":
          content = `To understand "${prompt}":\n\n` +
            `1. Start with the basic concepts\n` +
            `2. Practice with simple examples\n` +
            `3. Build small projects to reinforce your learning\n` +
            `4. Join communities and forums to learn from others`;
          break;
          
        default:
          content = `Solution for "${prompt}":\n\n` +
            `1. Break down the problem into smaller, manageable parts\n` +
            `2. Address each part systematically\n` +
            `3. Test your solution frequently\n` +
            `4. Refine based on results`;
      }
      
      return {
        content,
        responseType,
        additionalDetails: "Simple, practical solution based on your prompt."
      };
    };

    const aiResponse = generateSimpleResponse(prompt);
    
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
