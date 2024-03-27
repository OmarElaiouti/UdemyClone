import { AfterViewInit, Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Icourses } from '../../Models/ICourse';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DataService } from '../../Service1/data.service';
import { LastsliderComponent } from '../lastslider/lastslider.component';
import { SearchService } from '../../Services/search-service/search.service';
import { Subscription } from 'rxjs';
import { NavigationEnd, Router ,ActivatedRoute} from '@angular/router';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, CommonModule, LastsliderComponent, PaginatorModule, ButtonModule,],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {


  results!:any[];

  constructor(private dataserice: DataService,
    private searchService:SearchService, 
    private router: Router,
    private route: ActivatedRoute) { }
  
  
  
  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      const searchValue = params['search'];
      if (searchValue) {
        // Use the searchValue here, you can call your search service function or perform any other actions
        this.searchService.searchCoursesForSearchResult(searchValue).subscribe({
          next: (courses: any[]) => {
            this.results = courses;
            console.log(this.results.length);
          },
          error: (error) => {
            console.error('Error fetching courses:', error);
          }
        });
      }
    });
  }

   //sidebar
   expandedItems: { [key: string]: boolean } = {};

  toggleCollapse(collapseId: string): void {
    this.expandedItems[collapseId] = !this.expandedItems[collapseId];
  }

  isExpanded(collapseId: string): boolean {
    return this.expandedItems[collapseId] || false;
  }
  //end slider

  getStarArray(rating: number): number[] {
    const fullStars = Math.floor(rating);
    const halfStars = Math.ceil(rating - fullStars);
    const starArray = Array(fullStars).fill(0);
    if (halfStars > 0) {
      starArray.push(halfStars); // Add half star if applicable
    }
    return starArray;
  }

  searchTerm: string = '';



  
//silder
sectionVisible: boolean = true;

toggleSection() {
  this.sectionVisible = !this.sectionVisible;
}



courses: any[] = []; // Assuming your course data structure
filteredCourses: any[] = [];
durationFilters: number[] = [];

pagedCourses: any[] = [];
rows: number = 5;
first: number = 0;




fetchCourses() {
    this.courses = this.results
   this.filteredCourses = this.courses; // Initialize filteredCourses with all courses
    this.applyFilters();

 
}

filterCourses(rating: number) {
  this.filteredCourses = this.courses.filter(course => course.rating >= rating);
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