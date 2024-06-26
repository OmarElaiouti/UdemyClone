// import { Component, Input, OnInit } from '@angular/core';
// import { IQuestion } from '../../Models/lesson';
// import { QuestionService } from '../../Services/Questions/question.service';
// import { FormsModule } from '@angular/forms';

// interface UserProfile {
//   name: string;
//   // Add other properties as needed (e.g., pictureUrl)
// }

// @Component({
//   selector: 'app-q',
//   standalone: true,
//   imports: [FormsModule],
//   templateUrl: './q.component.html',
//   styleUrl: './q.component.css'
// })


// export class QComponent implements OnInit {



//   @Input() courseId!: number;

//   // questions:IQuestion[] =
//   //   [{ id: 1, content: "What is class in C# interview questions?", studentName: "eman salah", studentImage: "/assets/course_img/4898526_657d_2.jpg" }
//   //   ];
//     // courseId: number = 1; // Example courseId
//     questions: IQuestion[] = [];
//   newQuestionText: string = '';
//   newAnswerText: string = '';


//   constructor(private questionService: QuestionService) { }

//   ngOnInit(): void {
//     this.fetchQuestions();
//   }

//   fetchQuestions() {
//     this.questionService.getQuestions(this.courseId).subscribe({
//       next: questions => {
//         this.questions = questions;
//       },
//       error: error => {
//         console.error('Error fetching questions:', error);
//       }
//     });
//   }

//   // Function to submit a new question
//   submitQuestion() {
//     const newQuestion: string = this.newQuestionText.trim();
//     if (newQuestion) {
//       // Assuming you have a method in questionService to add a new question
//       this.questionService.addQuestion(newQuestion).subscribe({
//         next: response => {
//           console.log('Question submitted successfully:', response);
//           // Clear the question input
//           this.newQuestionText = '';
//           // Refetch questions to update the list
//           this.fetchQuestions();
//         },
//         error: error => {
//           console.error('Error submitting question:', error);
//         }
//       });
//     }
//   }



//   submitAnswer(question: IQuestion) {
//     const newAnswer: string = this.newAnswerText.trim();
//     if (newAnswer) {
//       this.questionService.getUserProfile().subscribe({
//         next: (userProfile: UserProfile) => {
//           question.answer = newAnswer;
//           question.answeredBy = userProfile.name;
//           question.answerDate = new Date().toLocaleString(); // Current date/time
//           this.questionService.updateQuestion(question).subscribe({
//             next: response => {
//               console.log('Answer submitted successfully:', response);
//               // Clear the answer input
//               this.newAnswerText = '';
//             },
//             error: error => {
//               console.error('Error submitting answer:', error);
//             }
//           });
//         },
//         error: error => {
//           console.error('Error fetching user profile:', error);
//         }
//       });
//     }

// }}