import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseURL } from './helper';
import { Question } from '../Models/Question';
import { EvaluateAnswer } from '../Models/evaluatedAnswer';

@Injectable({
  providedIn: 'root'
})
export class QuestionServiceService {

  constructor(private _http:HttpClient) { }

  public getQuizQuestions(quizId:any, pageNumber:any){
    console.log(pageNumber);
    
    return this._http.get<Question[]>(`${baseURL}/question/quiz/${quizId}?pageNumber=${pageNumber}&pageSize=10`);
  }


  public addQuestion(question:any){
     return this._http.post(`${baseURL}/question/`, question);
  }

  public deleteQues(quesId:string){
    return this._http.delete(`${baseURL}/question/${quesId}`);
  }

  public getQuestionById(quesId:string){
      return this._http.get<Question>(`${baseURL}/question/${quesId}`)
  }

  public updateQuestion(question:any){
      return this._http.put(`${baseURL}/question/`,question);
  }

  public getQuestionsOfParticullarQuizForUser(quizId:string){
    return this._http.get<Question[]>(`${baseURL}/question/quiz/specific/${quizId}`);
  }

  public EvaluateAnswer(questions:any){
    return this._http.post<EvaluateAnswer>(`${baseURL}/question/evaluate/`,questions);
  }
}
