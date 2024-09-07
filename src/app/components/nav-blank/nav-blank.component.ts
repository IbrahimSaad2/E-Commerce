import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.css'
})
export class NavBlankComponent implements OnInit{
  readonly _AuthService = inject(AuthService);
  readonly _CartService = inject(CartService);

  numberCart:number = 0
ngOnInit(): void {

  this._CartService.getCart().subscribe({
    next:(res)=>{
      console.log(res)
      this._CartService.cartNumber.next(res.numOfCartItems)
    }
  })
  this._CartService.cartNumber.subscribe({
    next:(data)=>{
      this.numberCart = data
    }
  })
}
  

}
