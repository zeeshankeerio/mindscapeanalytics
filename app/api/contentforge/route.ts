import { NextResponse } from "next/server"

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

export async function POST(req: Request) {
  try {
    const { contentType, topic, keywords, tone } = await req.json()

    // Validate input
    if (!contentType || !topic) {
      return NextResponse.json(
        { error: "Content type and topic are required" },
        { status: 400 }
      )
    }

    if (!(contentType in CONTENT_TYPES)) {
      return NextResponse.json(
        { error: "Invalid content type" },
        { status: 400 }
      )
    }

    // Construct the prompt
    const contentConfig = CONTENT_TYPES[contentType as keyof typeof CONTENT_TYPES]
    let prompt = `Create a ${contentType} about "${topic}"`
    
    if (keywords) {
      prompt += ` using these keywords: ${keywords}`
    }
    
    if (tone) {
      prompt += ` in a ${tone} tone`
    }

    prompt += `. ${contentConfig.instructions}`

    // Generate content using OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: contentConfig.systemPrompt
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    })

    const generatedContent = completion.choices[0].message.content

    if (!generatedContent) {
      throw new Error("No content generated")
    }

    return NextResponse.json({ 
      content: generatedContent,
      metadata: {
        contentType,
        topic,
        keywords,
        tone,
        timestamp: new Date().toISOString()
      }
    })
  } catch (error: unknown) {
    console.error("Content generation error:", error)
    
    // Handle specific OpenAI errors
    if (error instanceof Error && 'status' in error) {
      return NextResponse.json(
        { 
          error: "OpenAI API Error",
          message: error.message,
          code: (error as any).code
        },
        { status: (error as any).status || 500 }
      )
    }

    return NextResponse.json(
      { error: "Failed to generate content" },
      { status: 500 }
    )
  }
} 