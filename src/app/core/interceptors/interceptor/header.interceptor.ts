import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {

  if(localStorage.getItem('UserToken') !== null){
    req = req.clone({
      setHeaders:{
        token : localStorage.getItem('UserToken')!
      }
    })
  }
  return next(req);
};
