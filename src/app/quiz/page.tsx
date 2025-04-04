'use client';

import Link from 'next/link';
import { quizData } from '@/data/quizQuestions';

export default function QuizHome() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Quiz Sections</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizData.sections.map((section) => (
          <Link
            key={section.id}
            href={`/quiz/${section.id}`}
            className={`p-6 rounded-lg shadow-md transition-all ${
              section.attempted
                ? 'bg-blue-100 text-blue-800'
                : 'bg-white hover:bg-blue-50 text-gray-800'
            }`}
          >
            <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
            <div className="flex justify-between items-center">
              <span>{section.attempted ? 'Attempted' : 'Available'}</span>
              {section.attempted && (
                <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                  Completed
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}