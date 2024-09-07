import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  let _Router = inject(Router)


  if(typeof localStorage !== 'undefined'){
    if(localStorage.getItem('UserToken')!== null){
      return true;
    }
    else{
      _Router.navigate(['/login']);
      return false
    }
  }
  else{
    return false;
  }

};
