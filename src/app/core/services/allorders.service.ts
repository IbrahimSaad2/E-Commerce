import { authGuard } from './../guard/auth.guard';
import { jwtDecode } from 'jwt-decode';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviornment } from './environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AllordersService {

  private readonly _HttpClient = inject(HttpClient);
  private readonly _AuthService = inject(AuthService);



  getOrders():Observable<any>{
    console.log("hello")
    return this._HttpClient.get(`${enviornment.baseUrl}/api/v1/orders/user/${localStorage.getItem('UserId')}`)
  }
}
