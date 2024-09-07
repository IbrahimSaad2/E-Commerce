import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviornment } from './environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private readonly _HttpClient = inject(HttpClient);
  getCategories():Observable<any>{
    return this._HttpClient.get(`${enviornment.baseUrl}/api/v1/categories`)
  }

  getSpesificCatogries(id:string):Observable<any>{
    return this._HttpClient.get(`${enviornment.baseUrl}/api/v1/categories/${id}`)
  }
}
