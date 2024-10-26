import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './services/login.service';

export const userGuard: CanActivateFn = (route, state) => {
  let login = inject(LoginService);
  let router = inject(Router);

  if(login.isUserLoggedIn()){
    if(login.getAuthorities()=="NORMAL"){
      return true;
    }else if(login.getAuthorities()=="ADMIN"){
      router.navigate(['/admin']);
      return false;
    }
  }
  router.navigate(['login'])
  return false;
};
