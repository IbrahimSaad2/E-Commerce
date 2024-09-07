import { routes } from './../../app.routes';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  
  private readonly _AuthService = inject(AuthService)
  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _Router = inject(Router)


  messageError:string = "";

  isloading:boolean = false;



  loginForm:FormGroup  = this._FormBuilder.group( {
    email:[null, [Validators.required,Validators.email]],
    password:[null, [Validators.required , Validators.pattern(/^\w{6,}$/)]],
  } );




loginSubmit():void{
  if(this.loginForm.valid){
    this.isloading = true
    console.log(this.loginForm)
    this._AuthService.setlogin(this.loginForm.value).subscribe({
      next:(res)=>{
        console.log(res)
        if(res.message == "success"){
          localStorage.setItem('UserToken',res.token);
          this._AuthService.decodeToken();
          this._Router.navigate(['/home']);
        }
        this.isloading = false
      },
      error:(err)=>{
        console.log(err)
        this.messageError = err.error.message
        this.isloading = false

      }
    })
  }

  else{
    this.loginForm.setErrors({mismatch:true})
    this.loginForm.markAllAsTouched()
  }
}

}
