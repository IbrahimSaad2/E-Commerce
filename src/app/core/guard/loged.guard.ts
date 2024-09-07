import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const logedGuard: CanActivateFn = (route, state) => {

  let _Router = inject(Router)

  if(typeof localStorage !== 'undefined'){
    if(localStorage.getItem('UserToken')!==null){
      _Router.navigate(['/home'])
      return false;
    }
    else{
      return true
    }
  }
  else{
    return false
  }
 
};
