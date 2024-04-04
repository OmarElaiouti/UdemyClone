import { Component, Input, OnInit } from '@angular/core';
import { IQuestion } from '../../Models/lesson';
import { QuestionService } from '../../Services/Questions/question.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-q',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './q.component.html',
  styleUrl: './q.component.css'
})
export class QComponent implements OnInit {

  // comment=[
  //   {id:1,ProblemName:'problem in VS code',problem:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo consectetur',arrow:'<i class="fa-solid fa-arrow-up"></i>'},
  //   {id:2,ProblemName:'problem in VS code',problem:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo consectetur'},
  //   {id:3,ProblemName:'problem in VS code',problem:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo consectetur'},
  //   {id:4,ProblemName:'problem in VS code',problem:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo consectetur'},
  //   {id:5,ProblemName:'problem in VS code',problem:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo consectetur'}
  // ];

  @Input() courseId!: Number;

  questions:IQuestion[] =[]
    // [{ id: 1, content: "What is class in C# interview questions?", personName: "eman salah", personPictureUrl: "/assets/course_img/4898526_657d_2.jpg" }
    // ];
  newQuestion: string = '';
  personName: string = '';
  personPictureUrl: string = '';

  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
      this.fetchQuestions();
  }

  fetchQuestions() {
    this.questionService.getQuestions(this.courseId).subscribe(questions => {
      this.questions = questions;
    });
  }
  askQuestion() {
    if (this.newQuestion.trim() !== '') {
      const newQuestion: IQuestion = {
        id: 1,
        courseId: this.courseId,
        content: this.newQuestion.trim(),
        personName: this.personName,
        personPictureUrl: this.personPictureUrl
      };

      this.questionService.askQuestion(newQuestion).subscribe(() => {
        this.fetchQuestions();
        this.newQuestion = '';
      });
    }
  }

  deleteQuestion(index: number) {
    const questionId = this.questions[index].id;
    this.questionService.deleteQuestion(this.courseId, questionId).subscribe(() => {
      this.fetchQuestions();
    });
  }

}

