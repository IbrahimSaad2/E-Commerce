import { enviornment } from './environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private readonly _HttpClient = inject(HttpClient)

  getProducts():Observable<any>{
    return this._HttpClient.get(`${enviornment.baseUrl}/api/v1/products`);
  }

  getspecificProducts(id:string|null):Observable<any>{
    return this._HttpClient.get(`${enviornment.baseUrl}/api/v1/products/${id}`);
  }
}
