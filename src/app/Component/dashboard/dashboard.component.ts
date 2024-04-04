import { Component } from '@angular/core';
import { CourseService } from '../../Services/dashboard/course.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  courseForm!: FormGroup;

  constructor(private fb: FormBuilder, private courseService: CourseService) { }

  ngOnInit(): void {
    this.courseForm = this.fb.group({
      id: ['', Validators.required],
      categoryName: ['', Validators.required],
      subcatName: ['', Validators.required],
      topicName: ['', Validators.required],
      courseTitle: ['', Validators.required],
      courseDisc: ['', Validators.required],
      Objectives: ['', Validators.required],
      FullDescription: ['', Validators.required],
      sectionnum: ['', Validators.required],
      totallecture: ['', Validators.required],
      totalhoures: ['', Validators.required],
      totalmin: ['', Validators.required],
      secName: ['', Validators.required],
      secLecNum: ['', Validators.required],
      secHourNum: ['', Validators.required],
      lessonName: ['', Validators.required],
      lessonTime: ['', Validators.required],
      announcement: ['', Validators.required],
      requirement: ['', Validators.required],
      // Add more form controls for other course details
    });
  }

  onSubmit() {
    if (this.courseForm.valid) {
      const formData = this.courseForm.value;
      this.courseService.createCourse(formData).subscribe(
        (response) => {
          // Handle successful save
          console.log('Course saved successfully:', response);
        },
        (error) => {
          // Handle error
          console.error('Error saving course:', error);
        }
      );
    }
  }
}
