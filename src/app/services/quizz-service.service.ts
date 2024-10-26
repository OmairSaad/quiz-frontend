import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseURL } from './helper';
import { Quiz } from '../Models/quiz';

@Injectable({
  providedIn: 'root'
})
export class QuizzServiceService {

  constructor(private http: HttpClient) { }

  public getAllQuizzes(){
    return this.http.get(`${baseURL}/quiz/`);
  }

  public delQuiz(id:number){
    return this.http.delete(`${baseURL}/quiz/${id}`);
  }

  public addQuiz(quiz:any){
    return this.http.post(`${baseURL}/quiz/`, quiz);
  }

  public getQuiz(qid:string){
    return this.http.get<Quiz>(`${baseURL}/quiz/${qid}`);
  }

  public updateQuiz(quiz:any){
    return this.http.put(`${baseURL}/quiz/`, quiz);
  }

  public getAllActiveQuiz(){
    return this.http.get<Quiz[]>(`${baseURL}/quiz/active`);
  }

  public getAllActiveQuizByCategory(catId:string){
    return this.http.get<Quiz[]>(`${baseURL}/quiz/category/${catId}`)
 }
}
 