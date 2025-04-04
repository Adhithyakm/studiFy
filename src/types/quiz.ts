export type SectionStatus = {
    id: number;
    title: string;
    attempted: boolean;
    locked: boolean;
  };
  export type QuizSection = {
    id: number;
    title: string;
    questions: Question[];
  };
  export type Question = {
    id: number;
    text: string;
    options: string[];
    correctAnswer: number;
  };
  
  export type Answer = {
    questionId: number;
    selectedOption: number | null;
  };
  
  export type QuizProgress = {
    [sectionId: number]: {
      attempted: boolean;
      score: number;
    };
  };