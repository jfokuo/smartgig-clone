
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

    // Generate a more helpful, solution-oriented response
    const generateHelpfulResponse = (prompt: string) => {
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
          content = `Based on your problem with "${prompt}", here's a step-by-step troubleshooting guide:\n\n` +
            `1. First, identify the exact error message or symptoms\n` +
            `2. Check for common causes: syntax errors, missing dependencies, or configuration issues\n` +
            `3. Try these specific solutions:\n` +
            `   - Verify all required libraries are installed and up-to-date\n` +
            `   - Check documentation for known issues related to your error\n` +
            `   - Clear cache and restart your development environment\n` +
            `4. If the issue persists, here are advanced debugging techniques:\n` +
            `   - Use console logging at key points to trace execution flow\n` +
            `   - Review recent code changes that might have introduced the bug\n` +
            `   - Check for similar issues in community forums like Stack Overflow\n\n` +
            `For more personalized help, share the specific error messages and code snippets.`;
          break;
          
        case "tutorial":
          content = `Here's a practical guide to help you with "${prompt}":\n\n` +
            `Step 1: Set up your environment\n` +
            `- Make sure you have all prerequisites installed\n` +
            `- Configure your project with the necessary dependencies\n\n` +
            `Step 2: Understand the core concepts\n` +
            `- Learn about the key components involved\n` +
            `- Review best practices and common patterns\n\n` +
            `Step 3: Implementation\n` +
            `- Start with a basic working example\n` +
            `- Break down the task into smaller, manageable pieces\n` +
            `- Test each component before moving forward\n\n` +
            `Step 4: Testing and refinement\n` +
            `- Verify your implementation works as expected\n` +
            `- Optimize for performance and readability\n` +
            `- Address edge cases and potential issues\n\n` +
            `Resources:\n` +
            `- Official documentation is often the best starting point\n` +
            `- Community forums and tutorials can provide practical examples\n` +
            `- Consider courses or books for deeper understanding`;
          break;
          
        case "optimization":
          content = `Here are strategies to improve and optimize "${prompt}":\n\n` +
            `Performance Optimization:\n` +
            `- Identify and eliminate bottlenecks through profiling\n` +
            `- Implement caching strategies where appropriate\n` +
            `- Consider lazy loading and code splitting\n` +
            `- Optimize database queries and data structures\n\n` +
            `Code Quality Improvements:\n` +
            `- Refactor repetitive code into reusable functions/components\n` +
            `- Improve naming conventions for better readability\n` +
            `- Add comprehensive comments and documentation\n` +
            `- Implement proper error handling\n\n` +
            `User Experience Enhancements:\n` +
            `- Streamline workflows to reduce user friction\n` +
            `- Add helpful feedback and informative messages\n` +
            `- Ensure accessibility for all users\n` +
            `- Gather user feedback and iterate based on insights`;
          break;
          
        case "educational":
          content = `Learning Guide: ${prompt}\n\n` +
            `Core Concepts to Understand:\n` +
            `- Fundamental principles and terminology\n` +
            `- How the different components interact\n` +
            `- Historical context and evolution of these technologies\n\n` +
            `Practical Learning Path:\n` +
            `1. Begin with the basics - focus on foundational knowledge\n` +
            `2. Build simple projects to reinforce concepts\n` +
            `3. Study real-world examples and analyze existing solutions\n` +
            `4. Join communities to learn from others' experiences\n` +
            `5. Teach concepts to others to solidify your understanding\n\n` +
            `Recommended Resources:\n` +
            `- Interactive courses that combine theory with practice\n` +
            `- Official documentation provides technical accuracy\n` +
            `- Books for deep, comprehensive understanding\n` +
            `- Video tutorials for visual demonstrations\n` +
            `- Project-based learning for practical application`;
          break;
          
        default:
          content = `Here's how I can help with "${prompt}":\n\n` +
            `Analysis:\n` +
            `- Let's break down the key aspects of your query\n` +
            `- Identifying the core challenges and opportunities\n\n` +
            `Practical Solutions:\n` +
            `- Multiple approaches to address your specific needs\n` +
            `- Trade-offs and considerations for each option\n` +
            `- Step-by-step implementation guidance\n\n` +
            `Additional Resources:\n` +
            `- Tools and technologies that might be helpful\n` +
            `- Community resources for ongoing support\n` +
            `- Best practices to follow for optimal results\n\n` +
            `Feel free to ask follow-up questions for more specific guidance!`;
      }
      
      return {
        content,
        responseType,
        additionalDetails: "This response is tailored to provide practical, solution-oriented guidance based on your prompt."
      };
    };

    const aiResponse = generateHelpfulResponse(prompt);
    
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
