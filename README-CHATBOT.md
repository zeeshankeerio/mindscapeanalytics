# Mindscape AI Chatbot

This document explains how to set up and configure the Mindscape AI chatbot to answer questions about our platform, services, projects, and upcoming features.

## Overview

The chatbot implementation uses either:
1. Hugging Face's API with open-source models like Mistral or Llama 2 (preferred)
2. OpenAI's API as a fallback option
3. Predefined responses as a final fallback if no API keys are available

## Setup Instructions

1. Create a `.env.local` file with the following variables:
   ```
   # Hugging Face API key for open source models
   # Get one at https://huggingface.co/settings/tokens
   HUGGING_FACE_API_KEY=your_huggingface_key_here

   # OpenAI API key (fallback option)
   # Get one at https://platform.openai.com/api-keys
   OPENAI_API_KEY=your_openai_key_here
   ```

2. The system will try to use Hugging Face first, then fall back to OpenAI
3. If neither API key is available, the system will use simple predefined responses
4. Customize the knowledge base in `app/api/chat/route.ts` as needed

## Using Different Models

Default: `mistralai/Mistral-7B-Instruct-v0.2`

Other options:
- `meta-llama/Llama-2-7b-chat-hf`
- `google/gemma-7b-it`
- `HuggingFaceH4/zephyr-7b-beta`

## Chat Component Options

We have three different chat UI components available:

1. **UnifiedChat** (Recommended) - `components/unified-chat.tsx`
   - Combines features from both other components
   - Supports two styles: "floating" and "sidebar"
   - Allows users to toggle between styles
   - Supports both landing page ("landing") and dashboard ("dashboard") themes
   - Can be embedded within other components

2. **FloatingChatWidget** - `components/floating-chat-widget.tsx`
   - Floating bubble style chat window
   - Compact design

3. **AIChatbot** - `components/ai-chatbot.tsx`
   - Sidebar style chat window
   - Expandable view

## Dashboard Integration

The chatbot has been integrated into the dashboard in two places:

1. **Dashboard Assistant** - `/app/dashboard/assistant/page.tsx`
   - Access via the "Assistant" link in the dashboard sidebar
   - Uses the sidebar style with dashboard theming
   - Provides a category selection interface for different assistant types

2. **Dashboard Chat** - `/app/dashboard/chat/page.tsx`
   - Access via the "Chat" link in the dashboard sidebar
   - Uses the floating style with dashboard theming
   - Includes a conversation list and chat interface

## Troubleshooting

If you encounter issues with the chatbot:

1. Check console logs for API errors
2. Verify your API keys in `.env.local` are correct
3. If working locally without API keys, the system will use predefined responses
4. API authentication errors typically indicate an invalid or missing API key 