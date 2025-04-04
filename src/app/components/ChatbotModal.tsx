// src/components/ChatbotModal.tsx
'use client';

import { useState } from 'react';
import ChatInterface from './ChatInterface';

export default function ChatbotModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Search bar that triggers the chatbot */}
      <div 
        className="search-bar" 
        onClick={() => setIsOpen(true)}
        style={{ cursor: 'pointer' }}
      >
        AI Learning Assistant
      </div>

      {/* Modal overlay */}
      {isOpen && (
        <div className="chatbot-modal-overlay">
          <div className="chatbot-modal-content">
            <ChatInterface />
            <button onClick={() => setIsOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}
{
    "compilerOptions"; {
      "baseUrl"; "."
      "paths"; {
        "@/*"; ["./src/*"]
      }
    }
  }