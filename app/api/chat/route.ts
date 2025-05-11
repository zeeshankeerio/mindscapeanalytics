import { NextRequest, NextResponse } from 'next/server';
import { openai, huggingFaceChat } from '@/lib/openai-client';

// Knowledge base for the chatbot
const KNOWLEDGE_BASE = {
  platform: `
    Mindscape AI is an enterprise-grade AI platform offering comprehensive AI solutions including:
    - Advanced AI Models with 99.9% accuracy
    - Real-time Processing with 2.4 TB/s processing speed
    - Enterprise Security with bank-grade encryption
    - Advanced Analytics with customizable dashboards

    The platform supports a wide range of AI capabilities including Natural Language Processing,
    Computer Vision, Predictive Analytics, Generative AI, Document AI, and Code AI.
  `,
  services: `
    Mindscape offers a variety of AI services:
    1. AI Consultation - Custom AI solution planning and implementation
    2. Model Training - Training custom AI models on your data
    3. Integration Services - Seamless integration with existing systems
    4. Managed AI Services - Fully managed AI infrastructure
    5. Enterprise Support - 24/7 dedicated support and maintenance
    
    All services include SLA guarantees and are designed for enterprise-scale implementation.
  `,
  projects: `
    Notable projects include:
    - Financial forecasting systems for major banks
    - Healthcare diagnostic tools with 98% accuracy
    - Supply chain optimization reducing costs by 27%
    - Customer sentiment analysis increasing satisfaction by 42%
    - Manufacturing defect detection reducing waste by 33%
    
    Case studies available upon request.
  `,
  upcoming: `
    Upcoming features and products:
    - Enhanced Edge AI deployment options
    - Expanded multimodal capabilities
    - New industry-specific solution templates
    - Improved federated learning framework
    - Advanced explainable AI toolkit
    
    The roadmap includes quantum computing integration scheduled for Q4.
  `,
};

// Fallback responses for when no API keys are available
const FALLBACK_RESPONSES = [
  "I'd be happy to help you with that! Our platform offers state-of-the-art AI solutions with 99.9% accuracy.",
  "Mindscape AI provides comprehensive enterprise solutions including computer vision, NLP, and predictive analytics.",
  "Our platform can process data in real-time at speeds up to 2.4 TB/s, enabling immediate insights for your business.",
  "We offer custom AI model training tailored to your specific business needs with enterprise-grade security.",
  "Mindscape's integration services ensure seamless connection with your existing systems and workflows.",
  "Our upcoming features include enhanced edge AI deployment and expanded multimodal capabilities.",
  "Based on your interest, I can connect you with one of our AI specialists to discuss implementation details.",
  "We've successfully implemented solutions across various industries, reducing costs by up to 27%.",
  "All our services include SLA guarantees and are backed by our 24/7 dedicated support team.",
  "Would you like to know more about our specific AI capabilities or industry solutions?",
];

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();
    
    // Safety check for proper message format
    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Invalid message format' },
        { status: 400 }
      );
    }
    
    // Prepare system message with knowledge context
    const systemMessage = {
      role: 'system',
      content: `
        You are Mindscape AI Assistant, a helpful and professional assistant for Mindscape AI platform.
        
        About the platform:
        ${KNOWLEDGE_BASE.platform}
        
        About our services:
        ${KNOWLEDGE_BASE.services}
        
        About our projects:
        ${KNOWLEDGE_BASE.projects}
        
        About upcoming features:
        ${KNOWLEDGE_BASE.upcoming}
        
        Respond in a helpful, concise, and professional manner. 
        If you don't know the answer to a question, don't make up information - suggest the user contacts our sales team.
        Always mention you're an AI assistant when making recommendations.
      `
    };

    // Create a new message array with system prompt
    const promptMessages = [systemMessage, ...messages];

    const hasHuggingFaceKey = !!process.env.HUGGING_FACE_API_KEY;
    const hasOpenAIKey = !!process.env.OPENAI_API_KEY;

    // If neither API key is available, use fallback responses
    if (!hasHuggingFaceKey && !hasOpenAIKey) {
      console.log('No API keys available, using fallback responses');
      
      // Extract the last user message to try to provide a contextual response
      const lastUserMessage = messages.filter(m => m.role === 'user').pop()?.content || '';
      let responseIndex = Math.floor(Math.random() * FALLBACK_RESPONSES.length);
      
      // Simple keyword matching for slightly more relevant responses
      const keywords = [
        { terms: ['price', 'cost', 'pricing', 'expensive'], index: 8 },
        { terms: ['security', 'secure', 'privacy', 'protection'], index: 2 },
        { terms: ['integration', 'connect', 'api', 'interface'], index: 4 },
        { terms: ['future', 'upcoming', 'roadmap', 'plan'], index: 5 },
        { terms: ['industry', 'solution', 'case study', 'example'], index: 7 },
        { terms: ['speed', 'performance', 'fast', 'real-time', 'realtime'], index: 2 },
        { terms: ['help', 'assistance', 'support', 'contact'], index: 6 },
        { terms: ['model', 'train', 'custom', 'specific'], index: 3 },
      ];
      
      for (const keyword of keywords) {
        if (keyword.terms.some(term => lastUserMessage.toLowerCase().includes(term))) {
          responseIndex = keyword.index;
          break;
        }
      }
      
      return NextResponse.json({
        content: FALLBACK_RESPONSES[responseIndex],
        role: 'assistant',
        timestamp: new Date(),
      });
    }

    // Try to use Hugging Face API with open source model first
    if (hasHuggingFaceKey) {
      try {
        // Use one of these open source models:
        // - 'mistralai/Mistral-7B-Instruct-v0.2'
        // - 'meta-llama/Llama-2-7b-chat-hf'
        // - 'google/gemma-7b-it'
        const response = await huggingFaceChat(promptMessages, 'mistralai/Mistral-7B-Instruct-v0.2');
        return NextResponse.json(response);
      } catch (huggingFaceError) {
        console.error('Hugging Face API error:', huggingFaceError);
        // Fall back to OpenAI if Hugging Face fails
      }
    }

    // Try OpenAI if Hugging Face is not available or failed
    if (hasOpenAIKey) {
      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: promptMessages,
        temperature: 0.7,
        max_tokens: 500,
      });

      return NextResponse.json({
        content: completion.choices[0].message.content,
        role: 'assistant',
        timestamp: new Date(),
      });
    }

    // This should never be reached due to the earlier check, but as a final fallback:
    return NextResponse.json({
      content: "I'm sorry, I'm currently experiencing technical difficulties. Please try again later or contact our support team.",
      role: 'assistant',
      timestamp: new Date(),
    });

  } catch (error) {
    console.error('Chat API error:', error);
    
    // Return a graceful error response
    return NextResponse.json({
      content: "I apologize, but I'm having trouble processing your request. Please try again later.",
      role: 'assistant',
      timestamp: new Date(),
    }, { status: 200 }); // Return 200 to allow the chat to continue
  }
} 