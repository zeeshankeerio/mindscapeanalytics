import OpenAI from 'openai';

// Initialize OpenAI client with error handling
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '', // Default to empty string if not set
  dangerouslyAllowBrowser: true, // Allow use in browser environments
});

// Optional: Add Hugging Face Inference API integration as an alternative
// This can be used with open source models like Llama 2, Mistral, etc.
export async function huggingFaceChat(messages: any[], model = 'mistralai/Mistral-7B-Instruct-v0.2') {
  const HUGGING_FACE_API_KEY = process.env.HUGGING_FACE_API_KEY;
  
  if (!HUGGING_FACE_API_KEY) {
    throw new Error('HUGGING_FACE_API_KEY is not set');
  }
  
  // Format the conversation for the model
  const prompt = formatConversation(messages);
  
  try {
    const response = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HUGGING_FACE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 500,
          temperature: 0.7,
          top_p: 0.9,
          do_sample: true,
        }
      }),
    });
  
    // Check if response is OK
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Hugging Face API error: ${response.status} ${errorData.error || response.statusText}`);
    }
    
    const result = await response.json();
    
    if (result.error) {
      throw new Error(`Model error: ${result.error}`);
    }
    
    return {
      content: extractGeneratedText(result, prompt) || 'No response generated',
      role: 'assistant',
      timestamp: new Date(),
    };
  } catch (error) {
    console.error('Hugging Face chat error:', error);
    throw error;
  }
}

// Helper function to extract the generated text from different response formats
function extractGeneratedText(result: any, prompt: string): string | null {
  // Handle array response format
  if (Array.isArray(result) && result[0]?.generated_text) {
    // Remove the prompt from the beginning of the response if it's there
    const generatedText = result[0].generated_text;
    return generatedText.startsWith(prompt) 
      ? generatedText.substring(prompt.length).trim() 
      : generatedText;
  }
  
  // Handle object response format
  if (result.generated_text) {
    return result.generated_text;
  }
  
  // If no standard format is found, return the whole result as a string
  if (typeof result === 'string') {
    return result;
  }
  
  // If response has unexpected format
  return JSON.stringify(result);
}

// Helper to format conversation history for Hugging Face models
function formatConversation(messages: any[]) {
  let formattedPrompt = '';
  
  messages.forEach((message) => {
    if (message.role === 'system') {
      formattedPrompt += `<|system|>\n${message.content}\n`;
    } else if (message.role === 'user') {
      formattedPrompt += `<|user|>\n${message.content}\n`;
    } else if (message.role === 'assistant') {
      formattedPrompt += `<|assistant|>\n${message.content}\n`;
    }
  });
  
  // Add final assistant prompt
  formattedPrompt += `<|assistant|>\n`;
  
  return formattedPrompt;
} 