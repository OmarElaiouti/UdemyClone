import { Component, Input, OnInit } from '@angular/core';
import { Review } from '../../Models/lesson';
import { FormsModule } from '@angular/forms';
import { Review2Service } from '../../Services/review2/review2.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-review2',
  standalone: true,
  imports: [FormsModule, CommonModule,],
  templateUrl: './review2.component.html',
  styleUrl: './review2.component.css'
})
export class Review2Component implements OnInit {
  selectedRating: number = 0;
  comment: string = '';
  reviews: Review[] = [];

  constructor(private reviewService: Review2Service) { }

  ngOnInit(): void {
    this.fetchReviews();
  }

  setRating(rating: number): void {
    this.selectedRating = rating;
  }

  submitReview(): void {
    if (this.selectedRating === 0) {
      // Display error message or prevent submission
      return;
    }
    const newReview: Review = {
      studentName: '', // Get actual user name
      rate: this.selectedRating,
      studentImage: '', // Get actual user image
      date: new Date().toDateString(), // Get current date
      reviewComment: this.comment
    };
    this.reviewService.postReview(newReview).subscribe({
      next: response => {
        console.log('Review submitted successfully:', response);
        this.fetchReviews(); // Refresh reviews after submission
        this.selectedRating = 0; // Reset selected rating
        this.comment = ''; // Clear comment box
      },
      error: error => {
        console.error('Error submitting review:', error);
      }
    });
    
  }

  fetchReviews(): void {
    this.reviewService.getReviews().subscribe({
      next: reviews => {
        this.reviews = reviews;
      },
      error: error => {
        console.error('Error fetching reviews:', error);
      }
    });
    
  }

}