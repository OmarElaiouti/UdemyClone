import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CourseSliderComponent } from "../CourseSlider/course-slider/course-slider.component";
import { TabsToggleComponent } from "../TabsToggle/tabs-toggle/tabs-toggle.component";
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { HomeCourseService } from '../../Services/home-course-service/home-course.service';
import { CategoryService } from '../../Services/category-service/category.service';
import { SearchService } from '../../Services/search-service/search.service';
import { Icourse, IcourseWithObjectives } from '../../Models/ICourse';
import { Icategory } from '../../Models/ICategory';


@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [CourseSliderComponent, CarouselModule, ButtonModule, RouterModule, TabsToggleComponent]
})
export class HomeComponent {

    randomCourses: IcourseWithObjectives[] = [];
    randomCourses2: IcourseWithObjectives[] = [];

    topRatedCourses: IcourseWithObjectives[] = [];
    searchedCourses: IcourseWithObjectives[] = [];

    developmentCategories: Icategory[] = [];
    businessCategories: Icategory[] = [];
    itAndSoftwareCategories: Icategory[] = []; 
    designCategories: Icategory[] = [];

    lastSearchedKeyword: string | null = null;

    constructor(
      private homecourseService: HomeCourseService,
       private categoryService: CategoryService,
       private searchservice: SearchService) { }





    ngOnInit(): void {

        // Fetch top-rated courses
        this.homecourseService.getRandomCourses().subscribe(courses => {
            this.randomCourses = courses;
        });

        this.homecourseService.getRandomCourses().subscribe(courses => {
          this.randomCourses2 = courses;
      });

        this.homecourseService.getTopRatedCourses().subscribe(courses => {
          this.topRatedCourses = courses;
      });

        // Fetch searched courses
        this.lastSearchedKeyword = localStorage.getItem('lastSearchQuery');
        if (this.lastSearchedKeyword) {
          this.getCoursesByKeyword(this.lastSearchedKeyword);
        }
    }

    getCoursesByKeyword(keyword: string): void {
        this.searchservice.searchCoursesByKeywordForHome(keyword).subscribe(courses => {
            this.searchedCourses = courses
        });
    }

    getfeatuerdCategories(): void {
        this.categoryService.getHighestScoreTopicByParent('Development').subscribe(categories => {
          this.developmentCategories = categories;
        });
    
        this.categoryService.getHighestScoreTopicByParent('Business').subscribe(categories => {
          this.businessCategories = categories;
        });
    
        this.categoryService.getHighestScoreTopicByParent('IT and Software').subscribe(categories => {
          this.itAndSoftwareCategories = categories;
        });
    
        this.categoryService.getHighestScoreTopicByParent('Design').subscribe(categories => {
          this.designCategories = categories;
        });
      }
}
