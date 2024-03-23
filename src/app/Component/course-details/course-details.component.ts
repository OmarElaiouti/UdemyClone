import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
  instructor={id:1,inslink:'Jonas Schmedtmann',inswork:'Web Developer, Designer, and Teacher',rating:'4.7 Instructor Rating',review:'426,458 Reviews ',numstudent:'1,918,547 Students',numcourse:'7 Courses',img:'',discription:''}

  }

