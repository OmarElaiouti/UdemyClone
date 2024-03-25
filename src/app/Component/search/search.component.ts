import { AfterViewInit, Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Icourses } from '../../Models/ICourse';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DataService } from '../../Service1/data.service';
import { LastsliderComponent } from '../lastslider/lastslider.component';
import { SearchService } from '../../Services/search-service/search.service';
import { Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule,CommonModule,LastsliderComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent  implements  OnInit {

  results: any[]=[]
  private searchSubscription: Subscription | undefined;
  private navigationSubscription: Subscription | undefined;

  constructor(private dataserice: DataService,private searchService:SearchService, private router: Router) { }
  
  
  
  ngOnInit(): void {

    
    this.searchSubscription = this.searchService.searchCoursesForSearchResult().subscribe({
      next: (courses: any[]) => {
        this.results = courses;
        console.log(this.results.length);
        
      },
      error: (error) => {
        console.error('Error fetching courses:', error);
      }
    });


    // Subscribe to NavigationEnd event to clean up subscriptions when navigating away from the component
    this.navigationSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.onNavigationEnd();
      }
    });
  }
  
  
  getCourses(): void {
    
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








    

  

    searchTerm: string='';


      // search() {
      //   this.dataserice.searchProducts(this.searchTerm).subscribe(data => {
      //     this.results = data;
      //   });
      // }

      // ngOnChanges(): void {
      //   this.dataserice.searchProducts(this.searchTerm).subscribe((data) => {
      //     this.results = data;
      //   })
      
      // }
 
      ngOnDestroy(): void {
        // Unsubscribe from NavigationEnd event
        this.navigationSubscription?.unsubscribe();
        // Perform other cleanup operations if needed
      }
    
      private onNavigationEnd(): void {
        // Perform cleanup operations when navigation occurs
        console.log('Navigation ended');
      }


  }
