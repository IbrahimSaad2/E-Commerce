import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { IProducts } from '../../core/interfaces/iproducts';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../core/services/categories.service';
import { ICategories } from '../../core/interfaces/icategories';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../core/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { Toast, ToastrService } from 'ngx-toastr';
import { WishListService } from '../../core/services/wish-list.service';
import { IWishList } from '../../core/interfaces/iwish-list';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule,RouterLink,SearchPipe,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit , OnDestroy{
  private readonly _ProductsService = inject(ProductsService)
  private readonly _CategoriesService = inject(CategoriesService)
  private readonly _CartService = inject(CartService)
  private readonly _ToastrService = inject( ToastrService)
  private readonly _WishListService = inject( WishListService)


  text:string = ""

  customOptionscat: OwlOptions  = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay:true,
    autoplayTimeout:2000,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: false
  }

  customOptionsMain: OwlOptions  = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay:true,
    autoplayTimeout:4000,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    nav: false,
    items:1,
  }



  listProduct:IProducts[] = []

  listCaregories:ICategories[] = [];

  allProductSub!:Subscription
  idProductWishlist:string [] = []

  ngOnInit(): void {
      console.log(localStorage.getItem('idWishListProduct'))
      this._CategoriesService.getCategories().subscribe({
      next:(res)=>{
        console.log(res.data)
        this.listCaregories = res.data;
      },
      error:(err)=>{
        console.log(err)
      }
    })


      this.allProductSub = this._ProductsService.getProducts().subscribe({
        next:(res)=>{
          console.log(res.data); 
          this.listProduct = res.data
        },
        error:(err)=>{
          console.log(err);
        }

      })


      this._WishListService.getWishList().subscribe({
        next:(res)=>{
          console.log(res.data)
          for(let i = 0; i<res.data.length;i++ ){
            console.log(res.data[i]._id)
            this.idProductWishlist[i] = res.data[i]._id
            console.log(this.idProductWishlist)
          }
      }
      })
  }


  ngOnDestroy(): void {
      this.allProductSub?.unsubscribe()
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
}