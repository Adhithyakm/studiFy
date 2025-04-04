// src/data/quizQuestions.ts
export const quizData = {
    sections: [
      {
        id: 1,
        title: "Mathematics Fundamentals",
        attempted: false,
        questions: [
            {
                id: 1,
                text: "What is 2+2?",
                options: ["3", "4", "5", "6"],
                correctAnswer: 1,
                explanation: "The sum of 2 and 2 is 4. This is a basic arithmetic operation."
              },
          {
            id: 2,
            text: "What is the square root of 16?",
            options: ["2", "3", "4", "5"],
            correctAnswer: 2,
            explanation: "The . This is a basic arithmetic operation."
          }
          // Add 13 more questions...
        ]
      },
      {
        id: 2,
        title: "Web Development Basics",
        questions: [
          // 15 questions...
        ]
      }
      // Up to 10 sections...
    ]
  };