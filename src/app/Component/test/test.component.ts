import { Component } from '@angular/core';
import { Idata } from '../../Models/idata';
import { CourseService } from '../../Services/dashboard/course.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {
    course!:Idata;
    courseTitle: string = '';
    categoryName: string='';
    subcatName: string='';
    topicName: string='';
    FullDescription: string='';
    courseDisc: string='';
    sectionnum: number=0;
    requirement: string='';
    reqnum: number=0;
    secName: string='';
    secLecNum: number=0;
    lessonName: string='';
    lessonTime: string='';
    fullDescription: any;

      constructor( private courseService: CourseService) { }


      numInputs: number = 0;
      inputsArray: any[] = [];
      inputsArr: any[] = [];
      inputsArrr: any[] = [];
      inputsArrrr: any[] = [];
      createInputs() {
        this.inputsArray = Array.from({ length: this.numInputs }, (_, i) => '');

      }
      createInput(value: string) {
        const reqnum = parseInt(value, 10);
        if (!isNaN(reqnum)) {
          this.inputsArr = Array.from({ length: reqnum }, (_, i) => '');
        }
      }

      createInputss() {
        this.inputsArrr = Array.from({ length: this.sectionnum }, (_, i) => '');
      }

      createInputsss() {
        this.inputsArrrr = Array.from({ length: this.secLecNum }, (_, i) => '');
      }
      onSubmit(): void {
        this.courseService.createCourse(this.course).subscribe(
          (createdCourse) => {
            console.log('Course created successfully:', createdCourse);
            // Optionally navigate to another page or display a success message
          },
          (error) => {
            console.error('Error creating course:', error);
            // Handle error, display error message, etc.
          }
        );
      }
    }


