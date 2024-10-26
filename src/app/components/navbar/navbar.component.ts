import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{

hidden:boolean = true;
username!:String;
constructor(public login: LoginService, private router:Router){
  this.hidden = login.isUserLoggedIn();
  this.username = login.getUser();
}

logout(){
  this.login.logout();
  this.hidden = false;
  this.router.navigate(['/login']);
}
ngOnInit(): void {
  //This will wait for any emmit from observer and then call function and make changes
  this.login.newSubject.subscribe({
    next:()=>{
      this.hidden = this.login.isUserLoggedIn();
      this.username = this.login.getUser();
    },
    error:(e)=>{
      console.log(e);
      
    },
    complete:()=>{
      console.log("Completed");
    }
  })
}
}
