import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseURL } from './helper';
import { userCreateType } from '../Models/CreateUser';
@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private http: HttpClient) { }
  public addUser(user:userCreateType){
    return this.http.post(`${baseURL}/user/`,user);
  }

  public getCurrentUser(){
    return this.http.get<userCreateType>(`${baseURL}/user/current-user`);
  }

  public changePassword(data:any){
    return this.http.put(`${baseURL}/change-password`,data);
  }
}
