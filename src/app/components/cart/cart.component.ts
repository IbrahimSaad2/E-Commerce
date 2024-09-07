import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { ICart } from '../../core/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {


  cartItems:ICart = {} as ICart

  private readonly _ToastrService = inject(ToastrService)

  private readonly _CartService = inject(CartService);
  ngOnInit(): void {
      this._CartService.getCart().subscribe({
        next:(res)=>{
          console.log(res.data)
          this.cartItems = res.data; 
        },
        error:(err)=>{
          console.log(err);
        }
      })
    }



    removeItem(id:any):void{
      this._CartService.deleteCart(id).subscribe({
        next:(res)=>{
          console.log(res);
          this._ToastrService.error("item Removed")
          this.cartItems = res.data;
          this._CartService.cartNumber.next(res.numOfCartItems)
        },
        error:(err)=>{
          console.log(err);
        }
      })
    }


    updateCount(id:string , count:number):void{
      if(count>0){
        this._CartService.updateCount(id,count).subscribe({
          next:(res)=>{
            console.log(res)
            this._ToastrService.success("item Updated")

            this.cartItems = res.data
          },
          error:(err)=>{
            console.log(err)
          }
        })
      }
      else{
        this.removeItem(id);
      }
    }


    clearCart():void{
      this._CartService.clearCart().subscribe({
        next:(res)=>{
          console.log(res);
          this._ToastrService.error('Clear Cart Success')
          if(res.message == 'success'){
            this.cartItems = {} as ICart
            this._CartService.cartNumber.next(0)

          }
        },
        error:(err)=>{
          console.log(err);
        }
      })
    }

}
