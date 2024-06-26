import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Icoursecontent } from '../../Models/icoursecontent';
import { CourseService } from '../../Services/dashboard/course.service';
import { IinstructorCourse } from '../../Models/idata';

@Component({
  selector: 'app-instructor-courses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './instructor-courses.component.html',
  styleUrl: './instructor-courses.component.css'
})
export class InstructorCoursesComponent {
  courses = [
    {id:1, name: 'Course 1',img:'https://i.pinimg.com/564x/79/2a/80/792a808b9b5caae17aa382fc080c469d.jpg', instructorName: 'Instructor 1', rate: 4.5, price: 50, reviewersNumber: 5651,briefDescription:'dygfoe dpuywejhdw pw97d8wd pd9ywtdg' },
    {id:2,name: 'Course 2 with a very long name',img:'https://i.pinimg.com/564x/79/2a/80/792a808b9b5caae17aa382fc080c469d.jpg', instructorName: 'Instructor 2 with a very long name', rate: 4.8, price: 60, reviewersNumber: 8723,briefDescription:'dygfoe dpuywejhdw pw97d8wd pd9ywtdg' },

];

instructorId!:number;
courseId!:number;
course!:IinstructorCourse;
constructor(private courseService: CourseService){}
ngOnit():void{
this.instructorCourse();
}
instructorCourse(){
    this.courseService.getAllCourses().subscribe(
      (data:any)=>{
        this.course = data.course;
      }
    )
  }

  Delete(){
    if (confirm('Are you sure you want to delete this course?')) {
      this.courseService.deleteCourse(this.courseId).subscribe(
        () => {

        },
        error => {
          alert("Invalid Deleting Course")
        }
      );
    }
  }


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
