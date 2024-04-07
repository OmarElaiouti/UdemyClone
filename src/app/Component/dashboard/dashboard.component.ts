import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../Services/dashboard/course.service';
import { CommonModule } from '@angular/common';
import { IData, Idata } from '../../Models/idata';
import { CategoryService } from '../../Services/category-service/category.service';
import { Icategory } from 'e:/f/src/app/Models/ICategory';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { ILesson } from '../../Models/lesson';
import { HttpErrorResponse } from '@angular/common/http';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
course!:Idata;





courseTitle: string = '';
categoryName: string='';
subcatName: string='';
topicName: string='';
FullDescription: string='';
courseDisc: string='';
requirement: string='';
secName: string='';
lessonName: string='';
lessonTime: string='';
fullDescription: any;


lessonsVideos:any[] = [];
courseCover:any;

  categories!:Icategory[];
  activeCategory!:string;
  subcategoriesMap!: Map<string, Icategory[]>;
  topicsMap!: Map<string, Icategory[]>;
  filteredSubcategories!: Icategory[];
  activeSubCategory="Programming";
  filteredTopics!: Icategory[];
  activeTopic!: string;

  constructor( private courseService: CourseService,private catService:CategoryService) { }
  ngOnInit(): void {
    this.course = {
      categoryName: '',
      subcatName: '',
      topicName: '',
      courseTitle: '',
      courseDisc: '',
      price: 0,
      level: '',
      language: '',
      Objectives: [{ id: 0, content: '' }],
      fullDescription: '',
      sectionnum: 0,
      section: { sectionName: '', lessons: [{ lessonName: '', lessonTimeInMinutes: 0}] },
      requirements: [{ id: 0, content: '' }]
    };

    this.loadCategories();
    this.createInput();
    this.createInputs();
    this.createInputss();
    this.createInputsss();
  }

  loadCategories(): void {
    this.catService.getAllCategories().subscribe(categories => {
      this.categories = categories;
      // this.activeCategory = this.categories[0].name; // Initialize activeCategory
      this.initializeMaps();
      this.filterData();
    });
  }
  
  initializeMaps(): void {
    this.subcategoriesMap = new Map<string, Icategory[]>();
    this.topicsMap = new Map<string, Icategory[]>();

    const observables = this.categories.map(category =>
        this.catService.getSubcategoriesOrTopicsByParentName(category.name)
    );

    forkJoin(observables).subscribe(results => {
        results.forEach((subcategories, index) => {
            this.subcategoriesMap.set(this.categories[index].name, subcategories);

            const subcategoryObservables = subcategories.map(subcategory =>
                this.catService.getSubcategoriesOrTopicsByParentName(subcategory.name)
            );

            forkJoin(subcategoryObservables).subscribe(topicResults => {
                topicResults.forEach((topics, subIndex) => {
                    this.topicsMap.set(subcategories[subIndex].name, topics);
                });
            });
        });
    });
}
  
  filterData(): void {
    this.filteredSubcategories = this.activeCategory ? this.subcategoriesMap.get(this.activeCategory) || [] : [];
    console.log(this.activeCategory);
    
    this.filteredTopics = this.activeSubCategory ? this.topicsMap.get(this.activeSubCategory) || [] : [];
    console.log(this.activeSubCategory);

  }
  
  setActiveCategory(): void {
    this.course.categoryName = this.activeCategory;
    this.filterData(); // Call filterData method to update filteredSubcategories and filteredTopics
}
  
  // Implement setActiveSubCategory method
  setActiveSubCategory(): void {
    this.course.subcatName = this.activeSubCategory;
    this.filterData(); // Call filterData method to update filteredTopics
  }
  
  // Implement setActiveTopic method
  setActiveTopic(): void {
    this.course.topicName = this.activeTopic;
  }
  
  // Implement filterData method to filter subcategories and topics based on activeCategory and activeSubCategory

  
  numInputs: number = 1;
  reqnum: number=1;
  sectionnum: number=1;
  secLecNum: number=1;

  inputsArray: any[] = [];
  inputsArr: any[] = [];
  inputsArrr: any[] = [];
  inputsArrrr: any[] = [];
  createInputs() {
    this.inputsArray = Array.from({ length: this.numInputs }, (_, i) => '');

  }
  createInput() {
 
    
      this.inputsArr = Array.from({ length: this.reqnum }, (_, i) => '');
    
  }

  createInputss() {
    this.inputsArrr = Array.from({ length: this.sectionnum }, (_, i) => '');
  }

  createInputsss() {
    this.inputsArrrr = Array.from({ length: this.secLecNum }, (_, i) => '');
  }

  onSubmit(): void {
    const formData = new FormData();



    // Add course data to FormData

    // Add lesson files to FormData
    
    this.lessonsVideos.forEach(lessonVideo => {
      formData.append('lessonFiles', lessonVideo);
    });

    // Add cover image to FormData
    if (this.courseCover) {
      formData.append('coverImage', this.courseCover);
    }

    formData.append('courseData', JSON.stringify(this.course));

    // Send request to create or update course
    this.courseService.createCourse(formData).subscribe({
      next: () => {
        // Handle success
        console.log('Course created/updated successfully');
      },
      error: (error: HttpErrorResponse) => {
        // Handle error
        if (error.status === 415 && error.error && error.error.errors) {
          // If the error is due to validation errors, log them
          console.log('Validation errors:', error.error.errors);
        } else {
          // For other types of errors, log the message
          console.error('Error creating/updating course:', error.message);
        }

        console.log(formData);
        
      }
    });
  }


  onLessonVideoSelected(event: any, lesson: any): void {
    const file:File = event.target.files;
    let totalTimeInSeconds = 0;
    // Iterate over each selected file
    this.lessonsVideos.push(file);
    console.log(this.lessonsVideos);

      // Create a video element to load the file
      const video = document.createElement('video');
      // video.src = URL.createObjectURL(file);
      video.preload = 'metadata';
      video.onloadedmetadata = () => {
        // Calculate duration in seconds
        const durationInSeconds = Math.floor(video.duration);

        // Add duration to total time
        totalTimeInSeconds += durationInSeconds;

        // Check if this is the last file
          // Convert total time to minutes (optional)
          const totalTimeInMinutes = Math.floor(totalTimeInSeconds / 60);
          lesson.lessonTimeInMinutes = totalTimeInMinutes;
          // Now you can save the total time to the database using an API
          // this.saveTotalTimeToDatabase(totalTimeInMinutes);
        }
      };

      // Set video source
    

    // Save the lesson video file

    

  
  onCoverFileSelected(event: any): void {
    this.courseCover = event.target.files[0];
 console.log(this.courseCover);
 
    }
  

    changeName(event:any,lesson:any){
      lesson.lessonName = event.target.value;
    }


  


}
