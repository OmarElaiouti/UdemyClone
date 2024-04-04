import { Component, Input, OnInit } from '@angular/core';
import { Review, ReviewData } from '../../Models/lesson';
import { ReviewService } from '../../Services/review.service';
import { FormsModule } from '@angular/forms';
import { Review2Service } from '../../Services/review2/review2.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-review2',
  standalone: true,
  imports: [FormsModule, CommonModule,],
  templateUrl: './review2.component.html',
  styleUrl: './review2.component.css'
})
export class Review2Component implements OnInit {
  @Input() courseId!: number;

  selectedRating: number = 0;
  reviewText: string = '';
  reviews: Review[] = [];

  constructor(private reviewService: Review2Service) { }

  ngOnInit(): void {
    this.fetchReviews();
  }

  setRating(rating: number) {
    this.selectedRating = rating;
  }

  // reviews.component.ts
  submitReview() {
    const newReviewData: ReviewData = {
      rating: this.selectedRating,
      comment: this.reviewText,
      courseId: this.courseId
    };

    // Call the service method to submit the review data
    this.reviewService.submitReview(newReviewData).subscribe(savedReview => {
      // Once the review is successfully saved in the database, 
      // fetch the full review with additional information from the backend
      this.reviewService.getReview(savedReview.id).subscribe(fullReview => {
        // Add the retrieved review to the reviews array
        this.reviews.unshift(fullReview);
        // Reset selected rating and review text
        this.selectedRating = 0;
        this.reviewText = '';
      });
    });
  }

  fetchReviews() {
    this.reviewService.getReviews().subscribe(reviews => {
      this.reviews = reviews;
    });
  }

  getStarArray(rating: number): number[] {
    return Array.from({ length: rating }, (_, index) => index + 1);
  }


}