import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseURL } from './helper';
import { attemptResult } from '../Models/AttemptResult';

@Injectable({
  providedIn: 'root'
})
export class AttemptService {

  constructor(private http: HttpClient) { }

  public saveResults(res:any){
    return this.http.post(`${baseURL}/attempts/`,res);
  }

  public getAttemptedQuiz(username:string){
    return this.http.get<attemptResult[]>(`${baseURL}/attempts/${username}/`);
  }

  public getAttemptById(id:string){
    return this.http.get<attemptResult>(`${baseURL}/attempts/${id}`);
  }

  public getAttemptedQuizSortBYDate(username:string){
    return this.http.get<attemptResult[]>(`${baseURL}/attempts/${username}/date`)
  }

  public getAttemptedQuizSortBYMarks(username:string){
    return this.http.get<attemptResult[]>(`${baseURL}/attempts/${username}/marks`)
  }
}
