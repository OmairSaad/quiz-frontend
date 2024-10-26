import { Quiz } from "./quiz";

export interface Question {
    quesId: number;
    content: string;
    image: string | null; // Can be null
    option1: string;
    option2: string;
    option3: string;
    option4: string;
    answer: string; // Assuming answer will hold a string value
    givenanswer: string | null; // Can be null if not provided
    quiz: Quiz;
  }