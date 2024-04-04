import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ReviewService } from '../../Services/review.service';


@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent {
  courseRating = 3.9;

  reviews =
    [{ id: 1, PersonName: "Eman Salah", img: "/assets/support/7799204_2091_5.jpg", rate: 5, content: "This is nice course" }
      , { id: 1, PersonName: "Eman Salah", img: "/assets/support/7799204_2091_5.jpg", rate: 5, content: "This is nice course" },
    { id: 1, PersonName: "Eman Salah", img: "/assets/support/7799204_2091_5.jpg", rate: 5, content: "This is nice course" }
    ];


  /////
  currentDate: Date;

  // constructor() {
  //   this.currentDate = new Date();
  // }

  //////////////////////
  selectedRating: number = 0;
  reviewText: string = '';

  setRating(rating: number) {
    this.selectedRating = rating;
  }

  //   submitReview() {
  //     if (this.selectedRating === 0 || this.reviewText.trim() === '') {
  //       alert('Please rate the video and write your review.');
  //       return;
  //     }
  //     alert('Thank you for your review!\nRating: ' + this.selectedRating + '\nReview: ' + this.reviewText);
  //     // Here you can submit the rating and review to your backend for further processing.
  //   }


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
  ////////////////
  // reviews: any[]=[];
  newReview = {
    id: 1, // This line may cause the error if 'id' should be number
    PersonName: "",
    img: "/assets/support/7799204_2091_5.jpg",
    rate: 4,
    content: "",
    // date:""
  };

  constructor(private reviewService: ReviewService) {
    this.currentDate = new Date();

  }

  ngOnInit() {
    this.getReviews();
  }

  addReview() {
    if (this.newReview.rate && this.newReview.content) {
      this.reviewService.addReview(this.newReview).subscribe(() => {
        this.getReviews(); // Refresh reviews after adding
        this.resetNewReview(); // Reset newReview object
      });
    } else {
      alert('Please fill in all fields.');
    }
  }

  getReviews() {
    this.reviewService.getReviews().subscribe(reviews => {
      this.reviews = reviews;
    });
  }

  resetNewReview() {
    this.newReview = {
      id: 1, // Reset 'id' to null
      PersonName: "",
      img: "/assets/support/7799204_2091_5.jpg",
      rate: 4,
      content: ""
    };
  }

}
