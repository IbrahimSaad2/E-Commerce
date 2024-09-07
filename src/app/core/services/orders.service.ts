import { enviornment } from './environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private readonly _HttpClient =inject(HttpClient)
  url  = window.location.origin;

  checkOut(id:string|null , shhipingDetalis:object):Observable<any>{
    return this._HttpClient.post(`${enviornment.baseUrl}/api/v1/orders/checkout-session/${id}?url=${this.url}`,

      {
        "shippingAddress":shhipingDetalis
      }
    )
  }
}
