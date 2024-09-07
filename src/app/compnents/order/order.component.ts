import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../core/services/orders.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit{

  private readonly _ActivatedRoute = inject(ActivatedRoute)

  private readonly _OrdersService = inject(OrdersService)

  isLoading:boolean = false
  orders:FormGroup = new FormGroup({
    details: new FormControl(null,Validators.required), 
    phone: new FormControl(null ,Validators.required), 
    city: new FormControl(null ,Validators.required), 
  })
  
  cartId:string | null =""

  ngOnInit(): void {
      this._ActivatedRoute.paramMap.subscribe({
        next:(parms)=>{
          console.log(parms)
           this.cartId = parms.get('id')
        },
        error:(err)=>{
          console.log(err)
        }
      })
  }


  orderSubmit():void{
    this.isLoading = true;


    this._OrdersService.checkOut(this.cartId , this.orders.value).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.status === 'success'){
          window.open(res.session.url , "_self")
        }
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
}
