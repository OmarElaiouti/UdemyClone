import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { CourseContentComponent } from "../course-content/course-content.component";
import { CourseSectionComponent } from "../course-section/course-section.component";
import { UserCoursesService } from '../../Services/user-courses-service/user-courses.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseDetailsService } from '../../Services/Course-Details/course-details.service';
import { Ione } from '../../Models/ione';
import { Itwo } from '../../Models/itwo';
import { Ifour } from '../../Models/ifour';
import { CourseSliderComponent } from "../CourseSlider/course-slider/course-slider.component";
import { IcourseWithObjectives } from '../../Models/ICourse';
declare var slid:any;
declare var i:any;
@Component({
    selector: 'app-course-details',
    standalone: true,
    templateUrl: './course-details.component.html',
    styleUrl: './course-details.component.css',
    imports: [CommonModule, CourseContentComponent, CourseSectionComponent, CourseSliderComponent]
})
export class CourseDetailsComponent {
  courseId!:number;
  instructor!:Itwo;
  courses =[{
    id:1,
    image:'',
    name:'',
    instructorName:'',
    price: 64,
    rate:3.5,
    reviewersNumber:7965,
    objectives:[{
      id:1,
      content:'',
  }]

}]
  


  feature!:Ifour;
  top!:Ione;






  IsEnrolled:boolean = true;

  ngOnit():void{
    this.route.params.subscribe(params => {
      this.courseId = +params['id']; // Convert to number
    });    
    this.courseDetails();
    this.Instructor();
    this.Feature();
  }
  courseDetails(){
    this.coursedetailsService.getcourseDetails(this.courseId).subscribe(
      (data:any)=>{
        this.top = data.top;
        // this.IsEnrolled=data.IsEneolled;

      }
    )
  }

   Instructor(){
    this.coursedetailsService.getInstructor(this.courseId).subscribe(
      (data:any)=>{
        this.instructor = data.instructor;
        this.IsEnrolled=data.IsEnrolled;

      }
    )
  }

  Feature(){
    this.coursedetailsService.getFeature(this.courseId).subscribe(
      (data:any)=>{
        this.feature = data.feature;
        this.IsEnrolled=data.IsEneolled;

      }
    )
  }

  constructor(private usercoursesService:UserCoursesService,private route:ActivatedRoute,private coursedetailsService:CourseDetailsService){
    this.route.params.subscribe(params => {
      this.courseId = +params['id'];
    });
  }
  onAddToCartClick() {
    // Call the addToCart function from the cart service when the button is clicked
    this.usercoursesService.addToCart(this.courseId).subscribe(
      response => {
        // Handle success response if needed
        console.log('Course added to cart successfully:', response);
      },
      error => {
        // Handle error if needed
        console.error('Error adding course to cart:', error);
      }
    );
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
