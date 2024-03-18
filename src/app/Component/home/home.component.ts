import { Component } from '@angular/core';
import { CourcesComponent } from '../cources/cources.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CourcesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
