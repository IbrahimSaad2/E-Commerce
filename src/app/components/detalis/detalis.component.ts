import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { ISpecProduct } from '../../core/interfaces/ispec-product';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detalis',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './detalis.component.html',
  styleUrl: './detalis.component.css'
})
export class DetalisComponent implements OnInit {
  private readonly _ActivatedRoute = inject(ActivatedRoute)
  private readonly _ProductsService = inject(ProductsService)
  private readonly _CartService = inject(CartService)
  private readonly _ToastrService = inject(ToastrService)
  specProduct:ISpecProduct|null  = null;


  customOptions: OwlOptions  = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay:true,
    autoplayTimeout:2000,
    dots: false,
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

  ngOnInit():void {
      this._ActivatedRoute.paramMap.subscribe({
        next:(p)=>{
          console.log(p.get('Id'));
          let idProduct = p.get('Id');
          this._ProductsService.getspecificProducts(idProduct).subscribe({
            next:(res)=>{
              console.log(res.data);
              this.specProduct = res.data;
            },
            error:(err)=>{
              console.log(err);
            }
          });
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


