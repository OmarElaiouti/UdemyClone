import { AfterViewInit, Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Icourses } from '../../Models/ICourse';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DataService } from '../../Service1/data.service';
import { LastsliderComponent } from '../lastslider/lastslider.component';
import { SearchService } from '../../Services/search-service/search.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule,CommonModule,LastsliderComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent  implements  OnInit {

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


  }
