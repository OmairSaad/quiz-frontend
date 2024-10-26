import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './services/login.service';

export const adminGuard: CanActivateFn = (route, state) => {
  let login = inject(LoginService);
  let router = inject(Router);
  if(login.isUserLoggedIn()){
    if(login.getAuthorities()=="ADMIN"){
      return true;
    }else if(login.getAuthorities()=="NORMAL"){
      router.navigate(['/user-dashboard']);
      return false;
    }
  }
  router.navigate(['login'])
  return false;
};
