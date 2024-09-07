import { Component, inject, OnInit } from '@angular/core';
import { ICategories } from '../../core/interfaces/icategories';
import { CategoriesService } from '../../core/services/categories.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit{

  private readonly _CategoriesService = inject(CategoriesService)


  listCaregories:ICategories[] = [];
  id:string = ""

  ngOnInit(): void {
    this._CategoriesService.getCategories().subscribe({
      next:(res)=>{
        console.log(res.data)
        this.id = res.data.id
        this.listCaregories = res.data;
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
  getCategory():void{
    this._CategoriesService.getSpesificCatogries(this.id).subscribe({
      next:(res)=>{
        console.log(res.data)
        this.listCaregories = res.data;
      },
      error:(err)=>{
        console.log(err)
      }
    })

  }
}
