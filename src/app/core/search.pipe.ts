import { title } from 'process';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(arrayOfProduct:any[] , product:string ): any[] {
    return arrayOfProduct.filter((item)=> item.title.toLowerCase().includes(product.toLowerCase()));
  }

}
