"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, X, Send, Loader2, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type Message = {
  text: string;
  content?: string;
  sender: "user" | "bot" | "assistant";
  timestamp: Date;
}

export function FloatingChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hi there! 👋 How can I help you with Mindscape AI today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to the bottom of the messages when they change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    // Add user message
    const userMessage: Message = {
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }
    
    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    try {
      // Prepare messages array for API
      const apiMessages = messages
        .filter(msg => msg.text && (msg.sender === "user" || msg.sender === "assistant"))
        .map(msg => ({
          role: msg.sender === "user" ? "user" : "assistant",
          content: msg.text
        }));
      
      // Add the new user message
      apiMessages.push({
        role: "user",
        content: userMessage.text
      });

      // Call our API endpoint
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from chat API');
      }

      const data = await response.json();
      
      // Add bot response
      const botMessage: Message = {
        text: data.content,
        sender: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error('Error in chat request:', error);
      
      // Add error message
      const errorMessage: Message = {
        text: "I'm sorry, I'm having trouble connecting right now. Please try again later.",
        sender: "bot",
        timestamp: new Date(),
      }
      
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-6 w-80 sm:w-96 h-96 bg-black border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 flex flex-col"
          >
            <div className="bg-gradient-to-r from-red-600 to-red-500 p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8 border-2 border-white/20">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-red-700">
                    <Brain className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium text-white">Mindscape AI Assistant</h3>
                  <p className="text-xs text-white/70">Online | Powered by AI</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/50 backdrop-blur-sm">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === "user"
                        ? "bg-red-600 text-white"
                        : "bg-white/5 border border-white/10 text-white"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-lg p-3 bg-white/5 border border-white/10 text-white">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <p className="text-sm">AI is thinking...</p>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            <div className="p-3 border-t border-white/10 bg-black/30 backdrop-blur-sm">
              <div className="flex gap-2">
                <Input
                  placeholder="Type your message..."
                  className="bg-white/5 border-white/10 text-white"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <Button
                  className="bg-red-600 hover:bg-red-700 text-white"
                  size="icon"
                  onClick={handleSendMessage}
                  disabled={isLoading || !inputValue.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-white/50 mt-2 text-center">
                Powered by Mindscape AI |{" "}
                <a href="#" className="underline">
                  Privacy Policy
                </a>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        className={`fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50 ${
          isOpen ? "bg-red-700 hover:bg-red-800" : "bg-red-600 hover:bg-red-700"
        }`}
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </Button>
    </>
  )
}

