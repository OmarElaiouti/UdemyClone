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
  instructor:Itwo={instructorId:"1",name:'Jonas Schmedtmann',headline:'Web Developer, Designer, and Teacher',rate: 4.7 ,feedbacksCount:426.458,studentsCount:1.918547 ,coursesCount:7,image:'/assets/support/7799204_2091_5.jpg',boiography:'',
  courses:[{
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
  }]}]
  }


  feature:Ifour={studentImage:'https://img-c.udemycdn.com/user/200_H/101610246_6b5d_3.jpg',studentName:'Ken k',date:'9',
  reviewComment:'Everything on this course is a goldmine except for the GUI since its specific for Jupyter Notebooks and its missing the video for GUIEvents. Still it was a nice introduction to GUI. Dont let thatdisappoint you though. THIS IS A MUST HAVE COURSE. I have alreadyrecommended it to few people and always will. Do yourself a favor and dothis course if you want to learn Python 3. Thank you so much for thiscourse, Jose-sensei!!',rate:4.1,
  objectives:[
    {id:1,content:'to use Python professionally, learning both Python 2 and Python 3!'},
    // {id:1,content:'to use Python professionally, learning both Python 2 and Python 3!'},
    // {id:1,content:'to use Python professionally, learning both Python 2 and Python 3!'},
    // {id:1,content:'to use Python professionally, learning both Python 2 and Python 3!'},
    // {id:1,content:'to use Python professionally, learning both Python 2 and Python 3!'},
    // {id:1,content:'to use Python professionally, learning both Python 2 and Python 3!'},
  ],
  requirements:[
    {id:1,content:'Access to a computer with an internet connection.'},
    // {id:1,content:'Access to a computer with an internet connection.'},
    // {content:'Access to a computer with an internet connection.'},
  ]}
  top:Ione={ id:1, category:'Development',subCategory:'Programming',topic:'Python',name:'2021 Complete Python Bootcamp From Zero to Hero in Python',
  briefDescription:'Learn Python like a Professional Start from the basics and go all theway to creating your own applications and games',rate:4.6,
  numStudents:1.334400,lastUpdateDate:'3/2021',totalSections:23,totalLessons:155,totalMinutes:13,price:4.480,numFeedback:426.458,fullDescribtion:'',introVideo:'/assets/video/1.mp4' }







  IsEneolled:boolean = true;

  ngOnit():void{
    this.courseId = this.route.snapshot.params['id'];
    this.courseDetails();
    this.Instructor();
    this.Feature();
  }
  courseDetails(){
    this.coursedetailsService.getcourseDetails(this.courseId).subscribe(
      (data:any)=>{
        this.top = data.top;
        this.IsEneolled=data.IsEneolled;

      }
    )
  }

   Instructor(){
    this.coursedetailsService.getInstructor(this.courseId).subscribe(
      (data:any)=>{
        this.instructor = data.instructor;
        this.IsEneolled=data.IsEneolled;

      }
    )
  }

  Feature(){
    this.coursedetailsService.getFeature(this.courseId).subscribe(
      (data:any)=>{
        this.feature = data.feature;
        this.IsEneolled=data.IsEneolled;

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
