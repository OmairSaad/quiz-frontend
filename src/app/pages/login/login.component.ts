import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  //New Subscribe 
  public LoginObs:any;
loginForm:FormGroup;
constructor(private loginSer: LoginService, private router:Router, private ngx:NgxUiLoaderService){
  this.loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })
 
}
send(){
  this.ngx.start();
  
  this.loginSer.generateToken(this.loginForm.value).subscribe(async (data:any)=>{
    this.ngx.stop();
    this.loginSer.loginUser(data.token);
    this.loginSer.setUser().subscribe((data:any)=>{
      localStorage.setItem("user",JSON.stringify(data.username));
      localStorage.setItem("authorities", JSON.stringify(data.authorities));
      let role =  this.loginSer.getAuthorities();
     
      if(role=="NORMAL"){
        //Normal Dashboard 
        this.router.navigate(['/user-dashboard/all']);
        this.loginSer.newSubject.next(true);
        // window.location.href="/user-dashboard"
      }else if(role=="ADMIN"){
        //Admin Dashboard
        this.router.navigate(['/admin'])  //not refresh page , navigate on admin but navabr still getting old value initially, we have to manually refresh(Or modify) that component.
        this.loginSer.newSubject.next(true);
        // window.location.href="/admin"
      }else{
        this.loginSer.logout();
        this.loginSer.newSubject.next(true);
      }

    })
    
  }, e=>{
    console.log(e);
    Swal.fire("Failed","User name or Password not Matched",'error');
    console.log(this.loginSer.getUser());

    
    
  })
}
get f(){
  return this.loginForm.controls;
}
}
