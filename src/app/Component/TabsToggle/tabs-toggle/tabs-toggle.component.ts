import { Component, Input, OnInit } from '@angular/core';
import { CourseSliderComponent } from "../../CourseSlider/course-slider/course-slider.component";
import { HomeCourseService } from '../../../Services/home-course-service/home-course.service';

@Component({
    selector: 'app-tabs-toggle',
    standalone: true,
    templateUrl: './tabs-toggle.component.html',
    styleUrl: './tabs-toggle.component.css',
    imports: [CourseSliderComponent]
})
export class TabsToggleComponent implements OnInit {
    coursesByTab: any[] = [];
  @Input() loggedIn!:boolean;
  constructor(private homecourseService: HomeCourseService) {
    
  }
  ngOnInit(): void {
// Fetch courses for each tab when the component initializes
this.fetchCoursesForTabs();
  }

  fetchCoursesForTabs() {
    // Fetch courses for Python tab
    this.homecourseService.getCoursesByCategory('Python').subscribe(courses => {
      this.coursesByTab.push(courses);
    });

    // Fetch courses for Development tab
    this.homecourseService.getCoursesByCategory('Development').subscribe(courses => {
      this.coursesByTab.push(courses);
    });

    // Fetch courses for Excel tab
    this.homecourseService.getCoursesByCategory('Excel').subscribe(courses => {
      this.coursesByTab.push(courses);
    });
  }

}
