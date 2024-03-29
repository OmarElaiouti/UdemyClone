import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { CourseContentComponent } from "../course-content/course-content.component";
import { CourseSectionComponent } from "../course-section/course-section.component";
declare var slid:any;
declare var i:any;
@Component({
    selector: 'app-course-details',
    standalone: true,
    templateUrl: './course-details.component.html',
    styleUrl: './course-details.component.css',
    imports: [CommonModule, CourseContentComponent, CourseSectionComponent]
})
export class CourseDetailsComponent {
  instructor={id:1,instlink:'Jonas Schmedtmann',instwork:'Web Developer, Designer, and Teacher',instractorRating: 4.7 ,totalReview:426.458,numstudent:'1,918,547',instCourseNum:7,instImg:'/assets/support/7799204_2091_5.jpg',instDiscription:''}
  video={id:1,videoUrl:'/assets/video/1.mp4',price:4.480}
  Objectives=[
    {content:'to use Python professionally, learning both Python 2 and Python 3!'},
    {content:'to use Python professionally, learning both Python 2 and Python 3!'},
    {content:'to use Python professionally, learning both Python 2 and Python 3!'},
    {content:'to use Python professionally, learning both Python 2 and Python 3!'},
    {content:'to use Python professionally, learning both Python 2 and Python 3!'},
    {content:'to use Python professionally, learning both Python 2 and Python 3!'},
  ]
  top={categoryName:'Development',subcatName:'Programming',topicName:'Python',courseTitle:'2021 Complete Python Bootcamp From Zero to Hero in Python',
  courseDisc:'Learn Python like a Professional Start from the basics and go all theway to creating your own applications and games',rating:4.6,
  numStudent:'1,334,400',instractor:'jose potilla',LastUpdate:'3/2021' }

  total={totalsection:23,totallecture:155,totalhours:22,totalmin:13}
  Requirement=[
    {content:'Access to a computer with an internet connection.'},
    {content:'Access to a computer with an internet connection.'},
    {content:'Access to a computer with an internet connection.'},
  ]
  feature={imgReviewer:'https://img-c.udemycdn.com/user/200_H/101610246_6b5d_3.jpg',ReviewerName:'Ken k',NumberOfCourse:9,NumberOfReview:2,reviewDate:9,
  review:'Everything on this course is a goldmine except for the GUI since its specific for Jupyter Notebooks and its missing the video for GUIEvents. Still it was a nice introduction to GUI. Dont let thatdisappoint you though. THIS IS A MUST HAVE COURSE. I have alreadyrecommended it to few people and always will. Do yourself a favor and dothis course if you want to learn Python 3. Thank you so much for thiscourse, Jose-sensei!!'}


  @Output() addToCartClicked: EventEmitter<void> = new EventEmitter<void>();

  onAddToCartClick() {
    this.addToCartClicked.emit();
  }
}
