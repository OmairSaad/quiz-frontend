import { Injectable } from '@angular/core';
import { baseURL } from './helper';
import { HttpClient } from '@angular/common/http';
import { LoginType } from '../Models/Login';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  //Generate Token
  public generateToken(data:LoginType){
    return this.http.post(`${baseURL}/login/`, data);
  }

  //Login User: Set token in Local Storage
  public loginUser(token:string){
    localStorage.setItem("token",JSON.stringify(token));
    return true;
  }
  
  //Check User Login or Not!
  public isUserLoggedIn(){
    let tokenStr = localStorage.getItem("token");
    if(tokenStr==undefined || tokenStr=='' || tokenStr==null){
      return false;
    }else{
      return true;
    }
  }

  //Log Out User: Remove token from Local Storage
  public logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("authorities");
    return true;
  }
  

  //Get Token
  public getToken(){
    let token = localStorage.getItem("token");
    return JSON.parse(token!);
  }
  
  //Set User to display : Not make call every time
  public setUser(){
    return this.http.get(`${baseURL}/authorities`);
    
  }

  //Get User
  public getUser(){
    let user = localStorage.getItem("user");
    if(user!=null){
      return JSON.parse(user);
    }else{
      this.logout();
      return user;
    }
  }
  
  //Get Authorities
  public getAuthorities(){
    let auth = localStorage.getItem("authorities");
    return JSON.parse(auth!)[0].authority;
    
  }


  //Create an Observable to emmit true when Logout or Login to reload navbar to hide these option. Navbar is another component it does not know when have to reload.
  public newSubject = new Subject<Boolean>();
}
