import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IProducts } from '../../core/interfaces/iproducts';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../core/services/products.service';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../core/search.pipe';
import { WishListComponent } from '../wish-list/wish-list.component';
import { WishListService } from '../../core/services/wish-list.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [FormsModule,RouterLink,SearchPipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit,OnDestroy{

  private readonly _ProductsService = inject(ProductsService)
  private readonly _CartService = inject(CartService)
  private readonly _ToastrService = inject( ToastrService)
  private readonly _WishListService = inject(WishListService)

  listProduct:IProducts[] = []
  allProductSub!:Subscription
  text:string = ""
  idProductWishlist:string [] = []
  ngOnInit(): void {
    this.allProductSub = this._ProductsService.getProducts().subscribe({
      next:(res)=>{
        console.log(res.data); 
        this.listProduct = res.data 
      },
      error:(err)=>{
        console.log(err);
      }

    })
  }

  ngOnDestroy(): void {
    this.allProductSub?.unsubscribe()
}


addCart(id:string):void{
  this._CartService.addToCart(id).subscribe({
    next:(res)=>{
      console.log(res);
      this._ToastrService.success(res.message);
      this._CartService.cartNumber.next(res.numOfCartItems)
    },
    
    error:(err)=>{
      console.log(err);
    }
  })
}


addWishList(id:string):void{
  this._WishListService.addWishList(id).subscribe({
    next:(res)=>{
      console.log(res);
      this._ToastrService.success(res.message);
      console.log(res.data)
      this.idProductWishlist = res.data
    },
    error:(err)=>{
      console.log(err);
    }
  })
}


removeWishList(id:string):void{
  this._WishListService.removeWishList(id).subscribe({
    next:(res)=>{
      console.log(res)
      this._ToastrService.error(res.message);
      console.log(res.data)
      this.idProductWishlist = res.data
    }
  })
}
}
