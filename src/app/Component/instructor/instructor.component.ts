import { Component, OnInit } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { Instructor } from '../../Models/ICourse';
import { CategoryService } from '../../Services/category-service/category.service';
@Component({
  selector: 'app-instructor',
  standalone: true,
  imports: [CarouselModule,ButtonModule],
  templateUrl: './instructor.component.html',
  styleUrl: './instructor.component.css'
})
export class InstructorComponent implements OnInit {
//   Instructors = [
//     { c_name: 'Course 1,Course 1', instructor: 'Instructor 1', rating: 4.5, nOfCourse: 50, students: 5651 },
//     { c_name: 'Course 2, Course 2', instructor: 'Instructor 2 ', rating: 4.8, nOfCourse: 60,  students: 8723 },
//     { c_name: 'Course 3,Course 3', instructor: 'Instructor 3', rating: 3.9, nOfCourse: 45,  students: 3210 },
//     { c_name: 'Course 4', instructor: 'Instructor 4', rating: 4.2, nOfCourse: 55, students: 4567 },
//     { c_name: 'Course 5', instructor: 'Instructor 5', rating: 4.7, nOfCourse: 65, students: 7890 },
//     { c_name: 'Course 6', instructor: 'Instructor 6', rating: 4.1, nOfCourse: 40,  students: 2345 },
// ];

Instructors: Instructor[] = [];

constructor(private instructorService: CategoryService) {}

ngOnInit(): void {
  this.fetchInstructors();
}

fetchInstructors(): void {
  this.instructorService.getInstructors().subscribe(
    (data) => {
      this.Instructors = data;
    },
    (error) => {
      console.error('Error fetching data from API:', error);
    }
  );
}





  // Responsive options for the carousel
  responsiveOptions= [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
    }
    // Add more responsive options as needed
  ];

  // Function to get the severity for the inventory status
  getStarArray(rating: number): number[] {
    const fullStars = Math.floor(rating);
    const halfStars = Math.ceil(rating - fullStars);
    const starArray = Array(fullStars).fill(0);
    if (halfStars > 0) {
        starArray.push(halfStars); // Add half star if applicable
    }
    return starArray;
}

}
