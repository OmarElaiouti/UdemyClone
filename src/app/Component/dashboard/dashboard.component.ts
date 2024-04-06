import { Component } from '@angular/core';
import { CourseService } from '../../Services/dashboard/course.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IData, Idata } from '../../Models/idata';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
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



  // onFileSelected(event: any) {
  //   const file: File = event.target.files[0];

  //   // Check if file is selected
  //   if (!file) {
  //     console.log('No file selected');
  //     return;
  //   }

  //   // Create a video element to load the file
  //   const video = document.createElement('video');
  //   video.preload = 'metadata';
  //   video.onloadedmetadata = () => {
  //     // Calculate duration in minutes
  //     const durationMinutes = Math.floor(video.duration / 60);
  //     alert('Video duration:'+ durationMinutes+ 'minutes');

  //     // Check if duration exceeds 5 minutes
  //     if (durationMinutes > 5) {
  //       alert('Video duration exceeds 5 minutes');
  //       // Optionally, reset the file input to clear the selection
  //       event.target.value = null;
  //     }
  //   };

  //   // Set video source
  //   video.src = URL.createObjectURL(file);
  // }


  onFilesSelected(event: any) {
    const files: FileList = event.target.files;
    let totalTimeInSeconds = 0;

    // Iterate over each selected file
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Create a video element to load the file
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.onloadedmetadata = () => {
        // Calculate duration in seconds
        const durationInSeconds = Math.floor(video.duration);

        // Add duration to total time
        totalTimeInSeconds += durationInSeconds;

        // Check if this is the last file
        if (i === files.length - 1) {
          // Convert total time to minutes (optional)
          const totalTimeInMinutes = Math.floor(totalTimeInSeconds / 60);

          // Now you can save the total time to the database using an API
          this.saveTotalTimeToDatabase(totalTimeInMinutes);
        }
      };

      // Set video source
      video.src = URL.createObjectURL(file);
    }
  }

  saveTotalTimeToDatabase(totalTimeInMinutes: number) {
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
    // Call your API to save the total time to the database
    // You can use Angular HttpClient or any other method to make the API call
    // Example:
    // this.http.post('your-api-endpoint', { totalTime: totalTimeInMinutes })
    //   .subscribe(response => {
    //     console.log('Total time saved successfully:', response);
    //   }, error => {
    //     console.error('Error saving total time to database:', error);
    //   });
  }


}
