import React from 'react';
import ReactMarkdown from 'react-markdown';

export default function MessageBubble({ text, sender }: { text: string; sender: 'user' | 'bot' }) {
  return (
    <div className={`mb-4 text-left ${sender === 'user' ? 'text-right' : ''}`}>
      <div className={`inline-block p-3 rounded-lg max-w-[80%] ${
        sender === 'user' 
          ? 'bg-blue-500 text-white' 
          : 'bg-gray-200 text-black'
      }`}>
        <ReactMarkdown
          components={{
            p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
            ul: ({ node, ...props }) => <ul className="list-disc pl-5" {...props} />,
            li: ({ node, ...props }) => <li className="mb-1" {...props} />,
            // Add other markdown elements as needed
          }}
        >
          {text}
        </ReactMarkdown>
      </div>
    </div>
  );
}