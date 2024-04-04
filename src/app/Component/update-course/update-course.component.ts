import { Component } from '@angular/core';
import { IData } from '../../Models/idata';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../../Services/dashboard/course.service';

@Component({
  selector: 'app-update-course',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './update-course.component.html',
  styleUrl: './update-course.component.css'
})
export class UpdateCourseComponent {
  courseId!: number;
  course!: IData;

  constructor(private route: ActivatedRoute, private courseService: CourseService) { }

  ngOnInit(): void {
    this.courseId = this.route.snapshot.params['id'];
    this.courseService.getCourseById(this.courseId).subscribe(
      course => {
        this.course = course;
      },
      error => {
        console.error('Error fetching course:', error);
      }
    );
  }

  onSubmit(): void {
    this.courseService.updateCourse(this.courseId, this.course).subscribe(
      updatedCourse => {
        console.log('Course updated successfully:', updatedCourse);
        // Optionally navigate to another page or display a success message
      },
      error => {
        console.error('Error updating course:', error);
      }
    );
  }
}
