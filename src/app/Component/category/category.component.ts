import { Component } from '@angular/core';
interface Course {
  img: string;
  course_name: string;
  discreption: string;
  teacher: string;
  rating: number;
  noOfRating: number;
  course_time: string;
  best: boolean;
  price: number;
}
@Component({
  selector: 'app-category',
  standalone: true,
  imports: [],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {

}
