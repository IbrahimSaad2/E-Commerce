import { routes } from './../../app.routes';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {


  private readonly _AuthService = inject(AuthService)
  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _Router = inject(Router)


  messageError:string = "";

  isloading:boolean = false;



  registerForm:FormGroup  = this._FormBuilder.group( {
    name:[null, [Validators.required,Validators.minLength(3),Validators.maxLength(30)]],
    email:[null, [Validators.required,Validators.email]],
    password:[null, [Validators.required , Validators.pattern(/^\w{6,}$/)]],
    rePassword:[null],
    phone:[null, [Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]],
  } ,{validators:this.confrimPasswrd} );


confrimPasswrd(g:AbstractControl){
  if(g.get('password')?.value === g.get('rePassword')?.value){
    return null
  }
  else{
    return {mismatch:true}
  }
}



registerSubmit():void{
  if(this.registerForm.valid){
    this.isloading = true
    console.log(this.registerForm)
    this._AuthService.setRegister(this.registerForm.value).subscribe({
      next:(res)=>{
        console.log(res)
        if(res.message == "success"){
          this._Router.navigate(['/login'])
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
    this.registerForm.setErrors({mismatch:true})
    this.registerForm.markAllAsTouched()
  }
}
}
