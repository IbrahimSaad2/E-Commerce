import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { enviornment } from './environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly _HttpClient = inject(HttpClient)

  cartNumber:BehaviorSubject<number> = new BehaviorSubject(0)

  addToCart(id:string):Observable<any>{
    return this._HttpClient.post(`${enviornment.baseUrl}/api/v1/cart`, 
      {
        "productId": id
      }
    )
  }
  getCart():Observable<any>{
    return this._HttpClient.get(`${enviornment.baseUrl}/api/v1/cart`, 

    )
  }


  deleteCart(id:string):Observable<any>{
    return this._HttpClient.delete(`${enviornment.baseUrl}/api/v1/cart/${id}`,
    )
  }


  updateCount(id:string,count:number):Observable<any>{
    return this._HttpClient.put(`${enviornment.baseUrl}/api/v1/cart/${id}`,
      {
          "count": count
      }
      
  )
  }



  clearCart():Observable<any>{
    return this._HttpClient.delete(`${enviornment.baseUrl}/api/v1/cart`,

    )
  }

}
