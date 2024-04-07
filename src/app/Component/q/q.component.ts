import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IComment } from '../../Models/lesson';

// interface UserProfile {
//   name: string;
//   // Add other properties as needed (e.g., pictureUrl)
// }

@Component({
  selector: 'app-q',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './q.component.html',
  styleUrl: './q.component.css'
})


export class QComponent implements OnInit {



  @Input() courseId!: number;

  // questions:IQuestion[] =[]
    // [{ id: 1, content: "What is class in C# interview questions?", personName: "eman salah", personPictureUrl: "/assets/course_img/4898526_657d_2.jpg" }
    // ];
    // courseId: number = 1; // Example courseId
    questions: IComment[] = [];
  newAnswerText: string = '';

  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
    this.fetchQuestions();
  }

  fetchQuestions() {
    this.questionService.getQuestions(this.courseId).subscribe({
      next: questions => {
        this.questions = questions;
      },
      error: error => {
        console.error('Error fetching questions:', error);
      }
    });
  }

  submitAnswer(question: IComment) {
    const newAnswer: string = this.newAnswerText.trim();
    if (newAnswer) {
      this.questionService.getUserProfile().subscribe({
        next: (userProfile: UserProfile) => {
          question.answer = newAnswer;
          question.answeredBy = userProfile.name;
          question.answerDate = new Date().toLocaleString(); // Current date/time
          this.questionService.updateQuestion(question).subscribe({
            next: response => {
              console.log('Answer submitted successfully:', response);
              // Clear the answer input
              this.newAnswerText = '';
            },
            error: error => {
              console.error('Error submitting answer:', error);
            }
          });
        },
        error: error => {
          console.error('Error fetching user profile:', error);
        }
      });
    }

}}

