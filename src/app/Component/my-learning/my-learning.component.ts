import { Component, OnInit } from '@angular/core';
import { UserCoursesService } from '../../Services/user-courses-service/user-courses.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-my-learning',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-learning.component.html',
  styleUrl: './my-learning.component.css'
})
export class MyLearningComponent implements OnInit {

  myCourses: any[] = [];
  wishlistCourses: any[] = [];

  constructor(private userCoursesService: UserCoursesService,private route:ActivatedRoute) { }
  activeTab: string = 'myLearning';
  headTitle: string = 'My Learning'

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.activeTab = params['activeTab'];console.log(this.activeTab);
      
      if(this.activeTab == 'myLearning'){
        this.headTitle = 'My Learning';
      }
      else if(this.activeTab == 'wishlist'){
        this.headTitle = 'My Wishlist';
        
      }
      console.log(this.headTitle);
    });
    this.fetchCourses();
  }

  fetchCourses() {
    this.userCoursesService.getMyLearningCourses().subscribe(
      {
        next: courses => {
        this.myCourses = courses;
      },
      error: err => {
        console.error('Error fetching courses:', err);
      }
    })

    this.userCoursesService.getWishlist().subscribe(
      {
        next: courses => {
        this.wishlistCourses = courses;
      },
      error: err => {
        console.error('Error fetching courses:', err);
      }
    })

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

