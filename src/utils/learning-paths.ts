
import { Brain, Code, Database, Server, BookOpen, Building, Lock } from "lucide-react";

export type LearningStepDifficulty = 'beginner' | 'intermediate' | 'advanced';

export interface LearningStep {
  id: string;
  title: string;
  description: string;
  difficulty: LearningStepDifficulty;
  estimatedTime: string;
  completed?: boolean;
}

export interface LearningPathSection {
  title: string;
  steps: LearningStep[];
}

type LearningPaths = {
  [key: string]: LearningPathSection[];
};

export const generateLearningPathForGoal = (goalId: string, totalChallenges: number): LearningPathSection[] => {
  const predefinedPaths: LearningPaths = {
    "web-development": [
      {
        title: "HTML & CSS Foundations",
        steps: [
          {
            id: "html-basics",
            title: "HTML Basics",
            description: "Learn the fundamentals of HTML markup and document structure",
            difficulty: "beginner",
            estimatedTime: "2-3 hours",
            completed: totalChallenges > 1
          },
          {
            id: "css-basics",
            title: "CSS Basics",
            description: "Style your HTML pages with CSS fundamentals",
            difficulty: "beginner",
            estimatedTime: "3-4 hours",
            completed: totalChallenges > 3
          },
          {
            id: "responsive-design",
            title: "Responsive Design",
            description: "Make your websites look great on all devices",
            difficulty: "intermediate",
            estimatedTime: "4-5 hours"
          }
        ]
      },
      {
        title: "JavaScript Essentials",
        steps: [
          {
            id: "js-basics",
            title: "JavaScript Syntax",
            description: "Learn JavaScript syntax, variables, and basic operations",
            difficulty: "beginner",
            estimatedTime: "4-5 hours"
          },
          {
            id: "dom-manipulation",
            title: "DOM Manipulation",
            description: "Interact with HTML using JavaScript",
            difficulty: "intermediate",
            estimatedTime: "3-4 hours"
          },
          {
            id: "js-events",
            title: "JavaScript Events",
            description: "Handle user interactions with events",
            difficulty: "intermediate",
            estimatedTime: "2-3 hours"
          }
        ]
      },
      {
        title: "Frontend Frameworks",
        steps: [
          {
            id: "react-basics",
            title: "React Fundamentals",
            description: "Learn the basics of React components and state",
            difficulty: "intermediate",
            estimatedTime: "5-6 hours"
          },
          {
            id: "react-hooks",
            title: "React Hooks",
            description: "Master functional components with hooks",
            difficulty: "intermediate",
            estimatedTime: "4-5 hours"
          },
          {
            id: "advanced-react",
            title: "Advanced React Patterns",
            description: "Context, custom hooks, and performance optimization",
            difficulty: "advanced",
            estimatedTime: "6-8 hours"
          }
        ]
      }
    ],
    "data-science": [
      {
        title: "Python Fundamentals",
        steps: [
          {
            id: "python-basics",
            title: "Python Basics",
            description: "Learn Python syntax, data types, and control structures",
            difficulty: "beginner",
            estimatedTime: "4-5 hours",
            completed: totalChallenges > 1
          },
          {
            id: "python-functions",
            title: "Functions & Modules",
            description: "Create reusable code with functions and modules",
            difficulty: "beginner",
            estimatedTime: "3-4 hours",
            completed: totalChallenges > 3
          },
          {
            id: "data-structures",
            title: "Data Structures",
            description: "Master lists, dictionaries, sets, and tuples",
            difficulty: "intermediate",
            estimatedTime: "4-5 hours"
          }
        ]
      },
      {
        title: "Data Analysis",
        steps: [
          {
            id: "numpy-pandas",
            title: "NumPy & Pandas",
            description: "Work with numerical data and data frames",
            difficulty: "intermediate",
            estimatedTime: "5-6 hours"
          },
          {
            id: "data-visualization",
            title: "Data Visualization",
            description: "Create visualizations with Matplotlib and Seaborn",
            difficulty: "intermediate",
            estimatedTime: "4-5 hours"
          },
          {
            id: "data-cleaning",
            title: "Data Cleaning",
            description: "Prepare and clean data for analysis",
            difficulty: "intermediate",
            estimatedTime: "3-4 hours"
          }
        ]
      },
      {
        title: "Machine Learning",
        steps: [
          {
            id: "ml-basics",
            title: "ML Fundamentals",
            description: "Understand the basics of machine learning algorithms",
            difficulty: "intermediate",
            estimatedTime: "5-6 hours"
          },
          {
            id: "supervised-learning",
            title: "Supervised Learning",
            description: "Build regression and classification models",
            difficulty: "advanced",
            estimatedTime: "6-7 hours"
          },
          {
            id: "deep-learning",
            title: "Deep Learning",
            description: "Introduction to neural networks with TensorFlow",
            difficulty: "advanced",
            estimatedTime: "8-10 hours"
          }
        ]
      }
    ],
    "algorithms": [
      {
        title: "Algorithm Basics",
        steps: [
          {
            id: "big-o",
            title: "Time & Space Complexity",
            description: "Understand Big O notation and algorithm efficiency",
            difficulty: "beginner",
            estimatedTime: "3-4 hours",
            completed: totalChallenges > 1
          },
          {
            id: "arrays-strings",
            title: "Arrays & Strings",
            description: "Basic operations and common problems",
            difficulty: "beginner",
            estimatedTime: "4-5 hours",
            completed: totalChallenges > 3
          },
          {
            id: "recursion",
            title: "Recursion",
            description: "Solve problems using recursive techniques",
            difficulty: "intermediate",
            estimatedTime: "5-6 hours"
          }
        ]
      },
      {
        title: "Data Structures",
        steps: [
          {
            id: "linked-lists",
            title: "Linked Lists",
            description: "Implement and use linked lists effectively",
            difficulty: "intermediate",
            estimatedTime: "4-5 hours"
          },
          {
            id: "stacks-queues",
            title: "Stacks & Queues",
            description: "Understand LIFO and FIFO data structures",
            difficulty: "intermediate",
            estimatedTime: "3-4 hours"
          },
          {
            id: "trees-graphs",
            title: "Trees & Graphs",
            description: "Master hierarchical and network data structures",
            difficulty: "advanced",
            estimatedTime: "6-7 hours"
          }
        ]
      },
      {
        title: "Advanced Algorithms",
        steps: [
          {
            id: "sorting",
            title: "Sorting Algorithms",
            description: "Learn various sorting techniques and their trade-offs",
            difficulty: "intermediate",
            estimatedTime: "4-5 hours"
          },
          {
            id: "searching",
            title: "Searching Algorithms",
            description: "Master binary search and other search techniques",
            difficulty: "intermediate",
            estimatedTime: "3-4 hours"
          },
          {
            id: "dynamic-programming",
            title: "Dynamic Programming",
            description: "Solve complex problems by breaking them down",
            difficulty: "advanced",
            estimatedTime: "7-8 hours"
          }
        ]
      }
    ],
    "software-architecture": [
      {
        title: "Design Principles",
        steps: [
          {
            id: "solid-principles",
            title: "SOLID Principles",
            description: "Learn foundational object-oriented design principles",
            difficulty: "intermediate",
            estimatedTime: "4-5 hours",
            completed: totalChallenges > 1
          },
          {
            id: "design-patterns",
            title: "Design Patterns",
            description: "Common solutions to recurring design problems",
            difficulty: "intermediate",
            estimatedTime: "6-7 hours",
            completed: totalChallenges > 3
          },
          {
            id: "architecture-styles",
            title: "Architecture Styles",
            description: "Understand layered, microservices, and event-driven architectures",
            difficulty: "advanced",
            estimatedTime: "5-6 hours"
          }
        ]
      },
      {
        title: "System Design",
        steps: [
          {
            id: "requirements-analysis",
            title: "Requirements Analysis",
            description: "Gather and analyze system requirements effectively",
            difficulty: "intermediate",
            estimatedTime: "3-4 hours"
          },
          {
            id: "system-modeling",
            title: "System Modeling",
            description: "Create UML diagrams and architecture models",
            difficulty: "intermediate",
            estimatedTime: "4-5 hours"
          },
          {
            id: "scalability",
            title: "Scalability & Performance",
            description: "Design systems that can handle growth and perform well",
            difficulty: "advanced",
            estimatedTime: "5-6 hours"
          }
        ]
      },
      {
        title: "Quality Attributes",
        steps: [
          {
            id: "reliability",
            title: "Reliability & Availability",
            description: "Build systems that are dependable and always accessible",
            difficulty: "advanced",
            estimatedTime: "4-5 hours"
          },
          {
            id: "security",
            title: "Security by Design",
            description: "Integrate security throughout the architecture",
            difficulty: "advanced",
            estimatedTime: "5-6 hours"
          },
          {
            id: "maintainability",
            title: "Maintainability",
            description: "Create systems that are easy to modify and extend",
            difficulty: "advanced",
            estimatedTime: "4-5 hours"
          }
        ]
      }
    ],
    "backend-development": [
      {
        title: "Server-Side Basics",
        steps: [
          {
            id: "server-concepts",
            title: "Server Concepts",
            description: "Understand how web servers work and process requests",
            difficulty: "beginner",
            estimatedTime: "3-4 hours",
            completed: totalChallenges > 1
          },
          {
            id: "rest-apis",
            title: "RESTful APIs",
            description: "Design and implement REST APIs",
            difficulty: "intermediate",
            estimatedTime: "5-6 hours",
            completed: totalChallenges > 3
          },
          {
            id: "authentication",
            title: "Authentication & Authorization",
            description: "Implement secure user authentication systems",
            difficulty: "intermediate",
            estimatedTime: "4-5 hours"
          }
        ]
      },
      {
        title: "Databases",
        steps: [
          {
            id: "sql-basics",
            title: "SQL Fundamentals",
            description: "Learn to query and manipulate relational databases",
            difficulty: "intermediate",
            estimatedTime: "5-6 hours"
          },
          {
            id: "orm",
            title: "ORM Frameworks",
            description: "Work with object-relational mappers",
            difficulty: "intermediate",
            estimatedTime: "4-5 hours"
          },
          {
            id: "nosql",
            title: "NoSQL Databases",
            description: "Explore document, key-value, and graph databases",
            difficulty: "intermediate",
            estimatedTime: "5-6 hours"
          }
        ]
      },
      {
        title: "Advanced Backend",
        steps: [
          {
            id: "caching",
            title: "Caching Strategies",
            description: "Improve performance with effective caching",
            difficulty: "advanced",
            estimatedTime: "4-5 hours"
          },
          {
            id: "message-queues",
            title: "Message Queues",
            description: "Build asynchronous systems with message brokers",
            difficulty: "advanced",
            estimatedTime: "5-6 hours"
          },
          {
            id: "deployment",
            title: "Deployment & DevOps",
            description: "Deploy and manage backend services",
            difficulty: "advanced",
            estimatedTime: "6-7 hours"
          }
        ]
      }
    ],
    "computer-science": [
      {
        title: "Programming Fundamentals",
        steps: [
          {
            id: "programming-concepts",
            title: "Programming Concepts",
            description: "Variables, data types, operators, and control structures",
            difficulty: "beginner",
            estimatedTime: "4-5 hours",
            completed: totalChallenges > 1
          },
          {
            id: "functions-methods",
            title: "Functions & Methods",
            description: "Create reusable code blocks and understand scope",
            difficulty: "beginner",
            estimatedTime: "3-4 hours",
            completed: totalChallenges > 3
          },
          {
            id: "oop",
            title: "Object-Oriented Programming",
            description: "Learn classes, inheritance, and polymorphism",
            difficulty: "intermediate",
            estimatedTime: "5-6 hours"
          }
        ]
      },
      {
        title: "Computer Systems",
        steps: [
          {
            id: "binary-data",
            title: "Binary & Data Representation",
            description: "Understand how data is stored and represented",
            difficulty: "beginner",
            estimatedTime: "3-4 hours"
          },
          {
            id: "memory-management",
            title: "Memory Management",
            description: "Learn about memory allocation and garbage collection",
            difficulty: "intermediate",
            estimatedTime: "4-5 hours"
          },
          {
            id: "operating-systems",
            title: "Operating Systems",
            description: "Understand processes, threads, and scheduling",
            difficulty: "advanced",
            estimatedTime: "6-7 hours"
          }
        ]
      },
      {
        title: "Theory of Computation",
        steps: [
          {
            id: "computational-thinking",
            title: "Computational Thinking",
            description: "Problem decomposition and algorithm design",
            difficulty: "intermediate",
            estimatedTime: "4-5 hours"
          },
          {
            id: "data-structures",
            title: "Data Structures",
            description: "Implement and use fundamental data structures",
            difficulty: "intermediate",
            estimatedTime: "5-6 hours"
          },
          {
            id: "complexity-theory",
            title: "Complexity Theory",
            description: "Analyze algorithm efficiency and complexity classes",
            difficulty: "advanced",
            estimatedTime: "6-7 hours"
          }
        ]
      }
    ]
  };

  return predefinedPaths[goalId] || [];
};
