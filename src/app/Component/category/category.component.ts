import { Component, OnInit, SimpleChanges } from '@angular/core';
import { CourseSliderComponent } from '../CourseSlider/course-slider/course-slider.component';
import { SliderssComponent } from '../sliderss/sliderss.component';
import { InstructorComponent } from '../instructor/instructor.component';
import { LastsliderComponent } from '../lastslider/lastslider.component';
import { CommonModule } from '@angular/common';
import { Icourses } from '../../Models/ICourse';
import { FormsModule } from '@angular/forms';
import { MyServiceService } from '../../Service1/my-service.service';
import { PaginatorModule } from 'primeng/paginator';




@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CourseSliderComponent, SliderssComponent, InstructorComponent,
    LastsliderComponent, CommonModule, FormsModule, PaginatorModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})

export class CategoryComponent implements OnInit {

  courses: any[] = []; // Assuming your course data structure
  filteredCourses: any[] = [];
  durationFilters: number[] = [];

  pagedCourses: any[] = [];
  rows: number = 5;
  first: number = 0;

  constructor(private apiService: MyServiceService) { }

  ngOnInit(): void {
    this.fetchCourses();
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['filteredCourses']) {
      this.updatePagedCourses();
    }
  }

  fetchCourses() {
    this.apiService.getCourses().subscribe((data: any[]) => {
      this.courses = data;
      this.filteredCourses = this.courses; // Initialize filteredCourses with all courses
      this.applyFilters();

    });
  }

  filterCourses(rating: number) {
    this.filteredCourses = this.courses.filter(course => course.rating >= rating);
  }

  sectionVisible: boolean = true;

  toggleSection() {
    this.sectionVisible = !this.sectionVisible;
  }
  ///////lecture time 

  applyFilters() {
    // Filter courses based on duration
    this.filteredCourses = this.courses.filter(course => {
      if (this.durationFilters.length === 0) return true; // If no duration filter selected, include all courses

      const duration = course.totalHour; // Assuming 'totalHour' is a property in your course object
      for (const filter of this.durationFilters) {
        if (this.checkDuration(duration, filter)) return true;
      }
      return false;
    });

    // Update pagination settings and pagedCourses
    this.updatePagedCourses();
  }



  checkDuration(duration: number, filter: number): boolean {
    // Implement logic to check if duration matches the selected filter
    switch (filter) {
      case 0:
        return duration >= 0 && duration <= 1; // 0-1 hour
      case 1:
        return duration > 1 && duration <= 3; // 1-3 hours
      case 2:
        return duration > 3 && duration <= 6; // 3-6 hours
      case 3:
        return duration > 6 && duration <= 17; // 6-17 hours
      case 4:
        return duration > 17; // 17+ hours
      default:
        return false;
    }
  }

  toggleDurationFilter(filterIndex: number) {
    const index = this.durationFilters.indexOf(filterIndex);
    if (index !== -1) {
      // If filter exists, remove it
      this.durationFilters.splice(index, 1);
    } else {
      // If filter does not exist, add it
      this.durationFilters.push(filterIndex);
    }
    this.applyFilters(); // Apply filters
  }


  

  //sidebar
  expandedItems: { [key: string]: boolean } = {};

  toggleCollapse(collapseId: string): void {
    this.expandedItems[collapseId] = !this.expandedItems[collapseId];
  }

  isExpanded(collapseId: string): boolean {
    return this.expandedItems[collapseId] || false;
  }

  //////////////
  responsiveOptions = [
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


  //////////////////

  updatePagedCourses() {
    // Get the current page of courses based on pagination settings
    this.pagedCourses = this.filteredCourses.slice(this.first, this.first + this.rows);
  }

  onPageChange(event: any) {
    // Update pagination settings when page changes
    this.rows = event.rows;
    this.first = event.first;
    // Update pagedCourses based on pagination
    this.updatePagedCourses();
  }


}
