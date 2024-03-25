import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CourseSliderComponent } from "../CourseSlider/course-slider/course-slider.component";
import { TabsToggleComponent } from "../TabsToggle/tabs-toggle/tabs-toggle.component";
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { IcourseSmallCard } from '../../Models/ICourse';
import { HomeCourseService } from '../../Services/home-course-service/home-course.service';
import { CategoryService } from '../../Services/category-service/category.service';
import { SearchService } from '../../Services/search-service/search.service';


@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [CourseSliderComponent, CarouselModule, ButtonModule, RouterModule, TabsToggleComponent]
})
export class HomeComponent {
    randomCourses: IcourseSmallCard[] = [];
    topRatedCourses: IcourseSmallCard[] = [];
    searchedCourses: IcourseSmallCard[] = [];
    developmentCategories: any[] = [];
    businessCategories: any[] = [];
    itAndSoftwareCategories: any[] = [];
    designCategories: any[] = [];

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
