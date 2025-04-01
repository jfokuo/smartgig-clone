
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

    // More sophisticated categorization of user queries
    const categorizePrompt = (prompt: string) => {
      const text = prompt.toLowerCase();
      
      // Define key indicators for different types of questions
      const categories = {
        troubleshooting: ["error", "bug", "issue", "problem", "fix", "doesn't work", "broken", "failure", "crash"],
        development: ["create", "build", "develop", "implement", "code", "program", "function", "class", "component"],
        conceptual: ["explain", "understand", "concept", "theory", "principle", "how does", "what is", "why is"],
        bestPractices: ["best practice", "optimal", "efficient", "better way", "improve", "optimize", "clean code"],
        tools: ["tool", "library", "framework", "package", "npm", "dependency", "plugin", "extension"],
        design: ["design", "pattern", "architecture", "structure", "layout", "ui", "ux", "interface"],
        career: ["job", "interview", "career", "salary", "hire", "resume", "cv", "skill"],
        learning: ["learn", "study", "resource", "tutorial", "course", "book", "documentation"]
      };
      
      // Determine category based on keyword matches
      for (const [category, keywords] of Object.entries(categories)) {
        if (keywords.some(keyword => text.includes(keyword))) {
          return category;
        }
      }
      
      return "general"; // Default category
    };

    // Generate a comprehensive response based on the category
    const generateResponse = (prompt: string) => {
      const category = categorizePrompt(prompt);
      const promptWords = prompt.toLowerCase().split(/\s+/);
      
      // Extract potential technologies or languages mentioned in the prompt
      const techKeywords = [
        "javascript", "typescript", "react", "angular", "vue", "node", "python", "java", "c#", "php",
        "html", "css", "sass", "less", "sql", "nosql", "mongodb", "postgres", "mysql", "api", 
        "rest", "graphql", "docker", "kubernetes", "aws", "azure", "firebase", "redux", "nextjs", "gatsby",
        "express", "django", "flask", "spring", "dotnet", "flutter", "react native", "swift", "kotlin"
      ];
      
      const mentionedTech = techKeywords.filter(tech => 
        promptWords.includes(tech) || prompt.toLowerCase().includes(tech)
      );
      
      let response = {
        content: "",
        category: category,
        technologies: mentionedTech.length > 0 ? mentionedTech : []
      };
      
      switch(category) {
        case "troubleshooting":
          response.content = generateTroubleshootingResponse(prompt, mentionedTech);
          break;
        case "development":
          response.content = generateDevelopmentResponse(prompt, mentionedTech);
          break;
        case "conceptual":
          response.content = generateConceptualResponse(prompt, mentionedTech);
          break;
        case "bestPractices":
          response.content = generateBestPracticesResponse(prompt, mentionedTech);
          break;
        case "tools":
          response.content = generateToolsResponse(prompt, mentionedTech);
          break;
        case "design":
          response.content = generateDesignResponse(prompt, mentionedTech);
          break;
        case "career":
          response.content = generateCareerResponse(prompt);
          break;
        case "learning":
          response.content = generateLearningResponse(prompt, mentionedTech);
          break;
        default:
          response.content = generateGeneralResponse(prompt);
      }
      
      return response;
    };
    
    // Specific response generators
    const generateTroubleshootingResponse = (prompt: string, technologies: string[]) => {
      return `# Solution for "${prompt}"\n\n` +
        `## Possible causes:\n` +
        `1. Syntax errors or typos in your code\n` +
        `2. Incompatible dependency versions\n` +
        `3. Missing configurations or environment setup\n` +
        `4. Browser compatibility issues\n\n` +
        `## Steps to resolve:\n` +
        `1. **Check logs**: Look at console/terminal output for specific error messages\n` +
        `2. **Verify setup**: Ensure all required dependencies are installed correctly\n` +
        `3. **Isolate the problem**: Create a minimal reproduction case\n` +
        `4. **Incremental testing**: Make small changes and test after each one\n\n` +
        `## Quick fixes to try:\n` +
        (technologies.includes("react") ? 
          `- For React: Check component lifecycle, props passing, and state management\n` : "") +
        (technologies.includes("javascript") || technologies.includes("typescript") ? 
          `- For JS/TS: Verify your function scope, async handling, and type definitions\n` : "") +
        (technologies.includes("css") || technologies.includes("sass") ? 
          `- For CSS: Check specificity issues, browser prefixes, and responsive breakpoints\n` : "") +
        `- Restart your development server and clear cache\n` +
        `- Update your dependencies to the latest compatible versions`;
    };
    
    const generateDevelopmentResponse = (prompt: string, technologies: string[]) => {
      return `# Development guide for "${prompt}"\n\n` +
        `## Approach:\n` +
        `1. **Break down the requirements** into manageable tasks\n` +
        `2. **Plan your architecture** before diving into code\n` +
        `3. **Start with a simple prototype** then iterate\n` +
        `4. **Test early and often**\n\n` +
        `## Implementation steps:\n` +
        `1. Set up your development environment\n` +
        `2. Create the basic structure and components\n` +
        `3. Implement core functionality\n` +
        `4. Add error handling and edge cases\n` +
        `5. Optimize and refactor\n` +
        `6. Test thoroughly\n\n` +
        `## Code considerations:\n` +
        (technologies.includes("react") ? 
          `- For React: Consider component composition, state management, and performance optimizations\n` : "") +
        (technologies.includes("javascript") || technologies.includes("typescript") ? 
          `- For JS/TS: Use modern syntax, proper async handling, and strong typing\n` : "") +
        (technologies.includes("api") || technologies.includes("rest") || technologies.includes("graphql") ? 
          `- For APIs: Implement proper error handling, validation, and security\n` : "") +
        `- Focus on readability and maintainability\n` +
        `- Document your code and design decisions`;
    };
    
    const generateConceptualResponse = (prompt: string, technologies: string[]) => {
      return `# Understanding "${prompt}"\n\n` +
        `## Core concept:\n` +
        `${prompt} refers to a fundamental concept in software development that involves organizing code in a structured, maintainable way.\n\n` +
        `## Key principles:\n` +
        `1. **Separation of concerns**: Dividing code into distinct sections\n` +
        `2. **Abstraction**: Hiding complex implementation details\n` +
        `3. **Reusability**: Creating components that can be used in multiple places\n` +
        `4. **Maintainability**: Writing code that is easy to understand and modify\n\n` +
        `## Practical application:\n` +
        `- Use this concept when designing software architecture\n` +
        `- Apply it to improve code quality and reduce technical debt\n` +
        `- Implement it through proper design patterns and best practices\n\n` +
        `## Related concepts:\n` +
        `- Design patterns\n` +
        `- SOLID principles\n` +
        `- Clean architecture`;
    };
    
    const generateBestPracticesResponse = (prompt: string, technologies: string[]) => {
      return `# Best practices for "${prompt}"\n\n` +
        `## General principles:\n` +
        `1. **Keep it simple**: Avoid unnecessary complexity\n` +
        `2. **DRY (Don't Repeat Yourself)**: Eliminate code duplication\n` +
        `3. **YAGNI (You Aren't Gonna Need It)**: Don't add functionality until necessary\n` +
        `4. **Single Responsibility**: Each component should do one thing well\n\n` +
        `## Specific recommendations:\n` +
        (technologies.includes("react") ? 
          `- For React: Use functional components, hooks, and proper state management\n` : "") +
        (technologies.includes("javascript") || technologies.includes("typescript") ? 
          `- For JS/TS: Leverage modern features, strong typing, and consistent formatting\n` : "") +
        (technologies.includes("css") || technologies.includes("sass") ? 
          `- For CSS: Adopt a methodology (BEM, SMACSS), use variables, and create reusable components\n` : "") +
        `- Write tests for critical functionality\n` +
        `- Document your code and architecture decisions\n` +
        `- Use consistent naming conventions and code style\n\n` +
        `## Anti-patterns to avoid:\n` +
        `- Premature optimization\n` +
        `- Monolithic components/functions\n` +
        `- Tight coupling between components\n` +
        `- Magic numbers/strings`;
    };
    
    const generateToolsResponse = (prompt: string, technologies: string[]) => {
      return `# Tool recommendations for "${prompt}"\n\n` +
        `## Development tools:\n` +
        `1. **VS Code/WebStorm**: Feature-rich editors with excellent support\n` +
        `2. **ESLint/Prettier**: Code quality and formatting tools\n` +
        `3. **Git/GitHub**: Version control and collaboration\n\n` +
        `## Testing tools:\n` +
        `1. **Jest**: Unit and integration testing\n` +
        `2. **React Testing Library**: Component testing\n` +
        `3. **Cypress/Playwright**: End-to-end testing\n\n` +
        `## Build & deployment:\n` +
        `1. **Webpack/Vite**: Modern bundlers\n` +
        `2. **GitHub Actions/Circle CI**: Continuous integration\n` +
        `3. **Docker**: Containerization\n` +
        `4. **Vercel/Netlify**: Frontend deployment\n\n` +
        `## Monitoring & analytics:\n` +
        `1. **Sentry**: Error tracking\n` +
        `2. **Google Analytics**: User analytics\n` +
        `3. **Lighthouse**: Performance monitoring`;
    };
    
    const generateDesignResponse = (prompt: string, technologies: string[]) => {
      return `# Design patterns for "${prompt}"\n\n` +
        `## Architecture considerations:\n` +
        `1. **Component structure**: How to organize your UI components\n` +
        `2. **State management**: How to handle application state\n` +
        `3. **Data flow**: How data moves through your application\n` +
        `4. **Responsive design**: How to adapt to different screen sizes\n\n` +
        `## Common patterns:\n` +
        (technologies.includes("react") ? 
          `- For React: Container/Presentational, Higher-Order Components, Render Props, Hooks\n` : "") +
        (technologies.includes("javascript") || technologies.includes("typescript") ? 
          `- For JS/TS: Module pattern, Factory, Observer, Singleton\n` : "") +
        `- MVC/MVVM: Separating concerns in your application\n` +
        `- Flux/Redux: Unidirectional data flow\n\n` +
        `## Implementation tips:\n` +
        `1. Start with a simple design and iterate\n` +
        `2. Consider edge cases and failure modes\n` +
        `3. Focus on maintainability and readability\n` +
        `4. Document your design decisions`;
    };
    
    const generateCareerResponse = (prompt: string) => {
      return `# Career advice for "${prompt}"\n\n` +
        `## Skills to focus on:\n` +
        `1. **Technical skills**: Modern frameworks, languages, and tools\n` +
        `2. **Soft skills**: Communication, teamwork, problem-solving\n` +
        `3. **Domain knowledge**: Understanding of your industry\n\n` +
        `## Career development:\n` +
        `1. **Portfolio**: Build personal projects to showcase your skills\n` +
        `2. **Open source**: Contribute to open source projects\n` +
        `3. **Networking**: Attend meetups, conferences, and online communities\n` +
        `4. **Continuous learning**: Stay updated with new technologies\n\n` +
        `## Interview preparation:\n` +
        `1. **Technical preparation**: Practice coding problems and system design\n` +
        `2. **Behavioral preparation**: Prepare stories about your experiences\n` +
        `3. **Research**: Learn about the company and role\n` +
        `4. **Questions**: Prepare thoughtful questions to ask`;
    };
    
    const generateLearningResponse = (prompt: string, technologies: string[]) => {
      return `# Learning resources for "${prompt}"\n\n` +
        `## Online courses:\n` +
        `1. **Udemy/Coursera/Pluralsight**: Comprehensive courses on various topics\n` +
        `2. **YouTube**: Free tutorials and explanations\n` +
        `3. **freeCodeCamp**: Free, structured learning paths\n\n` +
        `## Documentation:\n` +
        (technologies.includes("react") ? 
          `- React: https://reactjs.org/docs/getting-started.html\n` : "") +
        (technologies.includes("javascript") ? 
          `- JavaScript: https://developer.mozilla.org/en-US/docs/Web/JavaScript\n` : "") +
        (technologies.includes("typescript") ? 
          `- TypeScript: https://www.typescriptlang.org/docs/\n` : "") +
        `- MDN Web Docs: Comprehensive web development documentation\n\n` +
        `## Books:\n` +
        `1. "Clean Code" by Robert C. Martin\n` +
        `2. "Eloquent JavaScript" by Marijn Haverbeke\n` +
        `3. "You Don't Know JS" series by Kyle Simpson\n\n` +
        `## Learning approach:\n` +
        `1. Start with fundamentals before frameworks\n` +
        `2. Build projects to apply what you learn\n` +
        `3. Join communities to learn from others\n` +
        `4. Teach others to solidify your understanding`;
    };
    
    const generateGeneralResponse = (prompt: string) => {
      return `# Solution for "${prompt}"\n\n` +
        `## Approach:\n` +
        `1. **Understand the problem**: Break down what you're trying to achieve\n` +
        `2. **Research**: Look for existing solutions and best practices\n` +
        `3. **Plan**: Outline your approach before implementation\n` +
        `4. **Implement**: Start with a simple solution and iterate\n` +
        `5. **Test**: Verify your solution works as expected\n\n` +
        `## Key considerations:\n` +
        `- Focus on clarity and simplicity over cleverness\n` +
        `- Consider edge cases and potential errors\n` +
        `- Document your approach and decisions\n` +
        `- Get feedback early and often\n\n` +
        `## Resources:\n` +
        `- Documentation for relevant technologies\n` +
        `- Stack Overflow for specific problems\n` +
        `- GitHub repositories for examples and best practices\n` +
        `- Online communities and forums for advice`;
    };

    const aiResponse = generateResponse(prompt);
    
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
