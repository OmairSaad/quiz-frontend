import { Category } from "./category";

export interface Quiz{
        quizId: number;
        title: string;
        description: string;
        maxMarks: number;
        numberOfQuestions: number;
        active: boolean;
        category: Category
    
}