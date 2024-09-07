import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviornment } from './environments/environment';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { IUserData } from '../interfaces/iuser-data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly  _HttpClient = inject(HttpClient);
  private readonly _Router = inject(Router)

  userData:IUserData = {} as IUserData;

  setRegister(data:object):Observable<any>{
    return this._HttpClient.post(`${enviornment.baseUrl }/api/v1/auth/signup`,data)
    }
  setlogin(data:object):Observable<any>{
    return this._HttpClient.post(`${enviornment.baseUrl}/api/v1/auth/signin`,data)
    }
    userId:string = ''
    decodeToken():void{
      if(localStorage.getItem('UserToken')!==null){
        this.userData = jwtDecode(localStorage.getItem('UserToken')!)
        console.log(this.userData.id)
        localStorage.setItem('UserId',this.userData.id)
        this.userId = this.userData.id
        
      }
    }



    logOut():void{
      localStorage.removeItem('UserToken');
      this.userData = {} as IUserData; 
      this._Router.navigate(['/login']);

    }




    emailVerify(data:object):Observable<any>{
      return this._HttpClient.post(`${enviornment.baseUrl}/api/v1/auth/forgotPasswords`,data)
    }



    codeVerify(data:object):Observable<any>{
      return this._HttpClient.post(`${enviornment.baseUrl}/api/v1/auth/verifyResetCode`,data)
    }



    resetPassword(data:object):Observable<any>{
      return this._HttpClient.put(`${enviornment.baseUrl}/api/v1/auth/resetPassword`,data)
    }
}
