import { NextRequest, NextResponse } from 'next/server';

// Try to import OpenAI, or provide a mock if not available
let OpenAI: any;
let openai: any;

try {
  const OpenAIModule = require('openai');
  OpenAI = OpenAIModule.default || OpenAIModule;
  
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
} catch (error) {
  console.warn("OpenAI package not available, using mock implementation");
  // Mock implementation for build purposes
  openai = {
    chat: {
      completions: {
        create: async () => ({
          choices: [{ message: { content: "Mock content for build purposes" } }]
        })
      }
    }
  };
}

const CONTENT_TYPES = {
  blog: {
    systemPrompt: "You are a professional blog writer specializing in SEO-optimized content.",
    instructions: "Create a comprehensive blog post with an engaging introduction, well-structured main points, and a compelling conclusion. Include relevant keywords naturally throughout the content."
  },
  social: {
    systemPrompt: "You are a social media expert specializing in viral content creation.",
    instructions: "Create engaging social media content that is shareable and attention-grabbing. Include relevant hashtags and emojis where appropriate."
  },
  email: {
    systemPrompt: "You are an email marketing specialist with expertise in conversion optimization.",
    instructions: "Create a compelling email campaign with an attention-grabbing subject line, engaging body content, and a clear call-to-action."
  },
  ad: {
    systemPrompt: "You are a professional copywriter specializing in advertising and marketing.",
    instructions: "Create persuasive ad copy that highlights key benefits and includes a strong call-to-action. Focus on the unique selling points."
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, type, options = {} } = body;

    if (!prompt) {
      return NextResponse.json(
        { success: false, message: 'Prompt is required' },
        { status: 400 }
      );
    }

    // Mock content generation - in a real app, you would call your AI service
    let content;
    switch (type) {
      case 'text':
        content = {
          text: `Generated text based on: "${prompt}".\n\nThis is a mock response that would normally be generated by an AI service like OpenAI. The content would match the style, tone, and requirements specified in the prompt.`,
          metadata: {
            wordCount: 42,
            sentiment: 'positive',
            readabilityScore: 85
          }
        };
        break;
      case 'image':
        content = {
          imageUrl: 'https://source.unsplash.com/random/800x600',
          alt: `AI generated image for: ${prompt}`,
          metadata: {
            width: 800,
            height: 600,
            format: 'jpg'
          }
        };
        break;
      case 'code':
        content = {
          code: `// Generated code for: ${prompt}\nfunction example() {\n  console.log("This is sample code");\n  return "Hello World";\n}`,
          language: 'javascript',
          metadata: {
            linesOfCode: 5,
            complexity: 'low'
          }
        };
        break;
      default:
        content = {
          text: `Generic content for: "${prompt}"`
        };
    }

    return NextResponse.json({
      success: true,
      content,
      prompt,
      type,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('ContentForge error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to generate content' },
      { status: 500 }
    );
  }
} 