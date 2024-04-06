import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-bb',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bb.component.html',
  styleUrl: './bb.component.css'
})
export class BbComponent {
  selectedRating: number = 0;

  constructor() { }

  setRating(rating: number): void {
    this.selectedRating = rating;
  }
}
