import { authGuard } from './core/guard/auth.guard';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { Routes } from '@angular/router';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import path from 'path';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { title } from 'process';
import { ProductComponent } from './components/product/product.component';
import { logedGuard } from './core/guard/loged.guard';
import { DetalisComponent } from './components/detalis/detalis.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { OrderComponent } from './compnents/order/order.component';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { NotfoundComponent } from './components/notfound/notfound.component';

export const routes: Routes = [
    {path:'',component:AuthLayoutComponent,canActivate:[logedGuard],children:[
        {path:'',redirectTo:'login',pathMatch:'full',title:"login"},
        {path:'login',component:LoginComponent,title:'Login'},
        {path:'register',component:RegisterComponent,title:'Register'},
        {path:'forgot',component:ForgotPasswordComponent,title:'ResetPassword'},

    ]},
    {path:'',component:BlankLayoutComponent,canActivate:[authGuard],children:[
        {path:'',redirectTo:'home',pathMatch:'full'},
        {path:'home',component:HomeComponent, title:'Home'},
        {path:'cart',component:CartComponent,title:'Cart'},
        {path:'brands',component:BrandsComponent,title:'Brands'},
        {path:'categories',component:CategoriesComponent,title:'Categories'},
        {path:'product',component:ProductComponent,title:'Product'},
        {path:'detalis/:Id',component:DetalisComponent,title:'Detalis'},
        {path:'allorders',component:AllordersComponent,title:'Payment'},
        {path:'order/:id',component:OrderComponent,title:'Confirm Order'},
        {path:'wishlist',component:WishListComponent,title:'Wish List'},

    ]},
    {path:'**',component:NotfoundComponent,title:'Error 404'}
];
