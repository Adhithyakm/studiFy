// src/components/ChatInterface.tsx
'use client';
import React, { useState, useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import useChatbot from '../hooks/useChatbot';

export default function ChatInterface() {
  const [input, setInput] = useState('');
  const { messages, sendMessage, isLoading, error } = useChatbot();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    await sendMessage(input, 'user');
    setInput('');
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden w-full max-w-md mx-auto">
      <div className="p-4 h-96 overflow-y-auto">
        {messages.map((msg) => (
          <MessageBubble 
            key={msg.id} 
            text={msg.text} 
            sender={msg.sender} 
          />
        ))}
        <div ref={messagesEndRef} />
        {isLoading && (
          <div className="text-left mb-4">
            <div className="inline-block p-3 rounded-lg max-w-[80%] bg-gray-200 text-black">
              Thinking...
            </div>
          </div>
        )}
        {error && (
          <div className="text-left mb-4">
            <div className="inline-block p-3 rounded-lg max-w-[80%] bg-red-100 text-red-800">
              Error: {error.message}
            </div>
          </div>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a study question..."
            className="flex-grow p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button 
            type="submit" 
            className={`p-2 rounded-r-md ${
              isLoading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white`}
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </form>
    </div>
  );
}