import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-next1',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './next1.component.html',
  styleUrl: './next1.component.css'
})
export class Next1Component {
  buttonActive: boolean = false;
  divActive: boolean = false;
  activateButton() {
    this.buttonActive = true;
    this.divActive = true;
  }
}
