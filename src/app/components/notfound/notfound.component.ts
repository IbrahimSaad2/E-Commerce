import { Component } from '@angular/core';
import { NavBlankComponent } from "../nav-blank/nav-blank.component";

@Component({
  selector: 'app-notfound',
  standalone: true,
  imports: [NavBlankComponent],
  templateUrl: './notfound.component.html',
  styleUrl: './notfound.component.css'
})
export class NotfoundComponent {

}
