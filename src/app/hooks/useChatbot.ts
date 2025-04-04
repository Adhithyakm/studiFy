// src/hooks/useChatbot.ts
import { useState } from 'react';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
};

export default function useChatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const sendMessage = async (text: string, sender: 'user' | 'bot') => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Add user message immediately
      if (sender === 'user') {
        setMessages(prev => [...prev, { id: Date.now().toString(), text, sender }]);
      }

      // Call your API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      
      // Add bot response
      setMessages(prev => [...prev, { id: Date.now().toString(), text: data.text, sender: 'bot' }]);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
      console.error('Chatbot error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return { messages, sendMessage, isLoading, error };
}