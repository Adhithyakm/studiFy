'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Answer } from '@/types/quiz';
import { quizData } from '@/data/quizQuestions';
import React from 'react';
export default function QuizSectionPage() {
  const router = useRouter();
  const params = useParams();
  const sectionId = params.sectionId as string;
  
  const currentSection = quizData.sections.find(section => section.id === Number(sectionId));
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showExplanation, setShowExplanation] = useState<number | null>(null);

  // Initialize answers
  useEffect(() => {
    if (!currentSection) return;

    setAnswers(currentSection.questions.map(q => ({
      questionId: q.id,
      selectedOption: null
    })));
  }, [currentSection]);

  if (!currentSection) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Section not found</div>
      </div>
    );
  }

  const currentQuestion = currentSection.questions[currentQuestionIndex];

  const handleOptionSelect = (questionId: number, optionIndex: number) => {
    if (submitted) return;

    setAnswers(prevAnswers =>
      prevAnswers.map(answer =>
        answer.questionId === questionId
          ? { ...answer, selectedOption: optionIndex }
          : answer
      )
    );
  };

  const handleSubmit = () => {
    if (!currentSection || submitted) return;

    const correctAnswers = currentSection.questions.filter(
      question => answers.find(a => a.questionId === question.id)?.selectedOption === question.correctAnswer
    ).length;

    setScore(correctAnswers);
    setSubmitted(true);

    // Save progress
    const progress = JSON.parse(localStorage.getItem('quizProgress') || '{}');
    progress[Number(sectionId)] = {
      attempted: true,
      score: correctAnswers,
      totalQuestions: currentSection.questions.length,
      timestamp: Date.now()
    };
    localStorage.setItem('quizProgress', JSON.stringify(progress));
  };

  const getOptionClass = (questionId: number, optionIndex: number) => {
    if (!submitted) return '';

    const question = currentSection.questions.find(q => q.id === questionId);
    if (!question) return '';

    const isSelected = answers.find(a => a.questionId === questionId)?.selectedOption === optionIndex;
    const isCorrect = optionIndex === question.correctAnswer;

    if (isCorrect) return 'bg-green-100 border-green-500';
    if (isSelected && !isCorrect) return 'bg-red-100 border-red-500';
    return '';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            {currentSection.title} Quiz
          </h1>
          <button
            onClick={() => router.push('/quiz')}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
          >
            Back to Sections
          </button>
        </div>

        {/* Progress bar */}
        <div className="mb-6 bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-blue-600 h-2.5 rounded-full" 
            style={{ width: `${((currentQuestionIndex + 1) / currentSection.questions.length) * 100}%` }}
          ></div>
        </div>

        {/* Question navigation */}
        <div className="flex flex-wrap gap-2 mb-6">
          {currentSection.questions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuestionIndex(index)}
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                currentQuestionIndex === index
                  ? 'bg-blue-600 text-white'
                  : answers[index]?.selectedOption !== null
                  ? 'bg-green-100 text-green-800'
                  : 'bg-white text-gray-800'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {/* Current question */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              Question {currentQuestionIndex + 1} of {currentSection.questions.length}
            </h2>
            {submitted && (
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {answers.find(a => a.questionId === currentQuestion.id)?.selectedOption === currentQuestion.correctAnswer 
                  ? 'Correct' 
                  : 'Incorrect'}
              </span>
            )}
          </div>
          
          <p className="text-lg mb-6">{currentQuestion.text}</p>
          
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <div
                key={index}
                onClick={() => handleOptionSelect(currentQuestion.id, index)}
                className={`p-3 border rounded-lg cursor-pointer transition ${
                  answers.find(a => a.questionId === currentQuestion.id)?.selectedOption === index
                    ? 'bg-blue-100 border-blue-500'
                    : 'hover:bg-gray-50'
                } ${getOptionClass(currentQuestion.id, index)}`}
              >
                <div className="flex items-center">
                  <div
                    className={`w-5 h-5 rounded-full border mr-3 flex-shrink-0 ${
                      answers.find(a => a.questionId === currentQuestion.id)?.selectedOption === index
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-400'
                    }`}
                  />
                  <span>{option}</span>
                </div>
              </div>
            ))}
          </div>

          {submitted && currentQuestion.explanation && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <button 
                onClick={() => setShowExplanation(showExplanation === currentQuestion.id ? null : currentQuestion.id)}
                className="text-blue-600 hover:underline mb-2"
              >
                {showExplanation === currentQuestion.id ? 'Hide Explanation' : 'Show Explanation'}
              </button>
              {showExplanation === currentQuestion.id && (
                <div className="text-gray-700">
                  {currentQuestion.explanation}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between mb-8">
          <button
            onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
            disabled={currentQuestionIndex === 0}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentQuestionIndex(prev => Math.min(currentSection.questions.length - 1, prev + 1))}
            disabled={currentQuestionIndex === currentSection.questions.length - 1}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>

        {!submitted && (
          <div className="flex justify-center">
            <button
              onClick={handleSubmit}
              disabled={answers.some(a => a.selectedOption === null)}
              className={`px-6 py-3 rounded-lg text-white font-medium ${
                answers.some(a => a.selectedOption === null)
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              Submit Answers
            </button>
          </div>
        )}

        {submitted && score !== null && (
          <div className="mt-8 p-6 bg-white rounded-lg shadow text-center">
            <h2 className="text-2xl font-bold mb-2">Quiz Results</h2>
            <div className="text-lg mb-4">
              You scored <span className="font-bold">{score}</span> out of{' '}
              {currentSection.questions.length} ({Math.round((score / currentSection.questions.length) * 100)}%)
            </div>
            <div className="mt-6 text-left">
              <h3 className="font-bold text-lg mb-2">Question Breakdown</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {currentSection.questions.map(q => (
                  <div key={q.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                    <span className="font-medium">Q{q.id}:</span>
                    <span>
                      {answers.find(a => a.questionId === q.id)?.selectedOption === q.correctAnswer ? '✅' : '❌'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={() => router.push('/quiz')}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Back to Quiz Sections
            </button>
          </div>
        )}
      </div>
    </div>
  );
}