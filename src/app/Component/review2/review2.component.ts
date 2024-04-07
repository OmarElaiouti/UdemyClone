import { Component, Input, OnInit } from '@angular/core';
import { ReviewService } from '../../Services/review.service';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { VideoLessonService } from '../../Services/videoLesson/video-lesson.service';
import { Review } from '../../Models/lesson';

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
  studentReview!: Review;

  constructor(private reviewService: VideoLessonService) { }

  ngOnInit(): void {
    this.fetchReviews();
  }

  setRating(rating: number) {
    this.selectedRating = rating;
  }

  // reviews.component.ts
  submitReview() {
    const newReviewData: Review = {
    
      studentName: "",
      rate: this.studentReview.rate,
      date: "",
      reviewComment: this.studentReview.reviewComment,
      studentImage: ""
    };

    // Call the service method to submit the review data
    this.reviewService.SetStudentReviews(this.courseId,newReviewData).subscribe(savedReview => {

      this.reviewService.FillReviews(this.courseId).subscribe(reviews => {
        this.reviews = reviews;
      });
      this.reviewService.GetStudentReviews(this.courseId).subscribe(r => {
        this.studentReview = r;
      });        // Reset selected rating and review text
       
      });
  }

  fetchReviews() {
    this.reviewService.FillReviews(this.courseId).subscribe(reviews => {
      this.reviews = reviews;
    });
    this.reviewService.GetStudentReviews(this.courseId).subscribe(r => {
      this.studentReview = r;
    });
    
  }

  getStarArray(rating: number): number[] {
    return Array.from({ length: rating }, (_, index) => index + 1);
  }


}