// src/app/page.tsx
import ChatInterface from '../components/ChatInterface';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center">
      <ChatInterface />
    </main>
  );
}
