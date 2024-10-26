import { userCreateType } from "./CreateUser";
import { Quiz } from "./quiz";

export interface attemptResult{
    "incorrectAnswer": number;
    "attemptQuestion":number;
    "correctAnswer":number;
    "date":Date;
    "quiz":Quiz;
    "user":userCreateType;
    "attemptId":number;
    "attemptBy":string;
    "totalMarks":number;
}