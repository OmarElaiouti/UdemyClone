import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CourseSliderComponent } from "../CourseSlider/course-slider/course-slider.component";
import { TabsToggleComponent } from "../TabsToggle/tabs-toggle/tabs-toggle.component";
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { IcourseSmallCard } from '../../Models/ICourse';
import { HomeCourseService } from '../../Services/home-course-service/home-course.service';
import { CategoryService } from '../../Services/category-service/category.service';


@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [CourseSliderComponent, CarouselModule, ButtonModule, RouterModule, TabsToggleComponent]
})
export class HomeComponent {
    categoryCourses: IcourseSmallCard[] = [];
    topRatedCourses: IcourseSmallCard[] = [];
    searchedCourses: IcourseSmallCard[] = [];
    developmentCategories: any[] = [];
    businessCategories: any[] = [];
    itAndSoftwareCategories: any[] = [];
    designCategories: any[] = [];

    lastSearchedKeyword: string | null = null;
    featcherdCategories = ["Development", "Business", "IT and Software", "IT and Software"]
    constructor(private homecourseService: HomeCourseService, private categoryService: CategoryService) { }





    ngOnInit(): void {
        // Fetch courses based on selected category
        this.homecourseService.getCoursesByCategory('selectedCategory').subscribe(courses => {
            this.categoryCourses = courses;
        });

        // Fetch top-rated courses
        this.homecourseService.getTopRatedCourses().subscribe(courses => {
            this.topRatedCourses = courses;
        });

        // Fetch searched courses
        // this.lastSearchedKeyword = this.searchHistoryService.getLastSearch();
        // if (this.lastSearchedKeyword) {
        //     this.getCoursesByKeyword(this.lastSearchedKeyword);
        // }

        // this.getfeatuerdCategories();


        // const keyword = 'searchKeyword'; // Retrieve keyword from session/local storage
        // this.homecourseService.searchCoursesByKeyword(keyword).subscribe(courses => {
        //     this.searchedCourses = courses;
        // });
    }

    getCoursesByKeyword(keyword: string): void {
        this.homecourseService.searchCoursesByKeyword(keyword).subscribe(courses => {
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
