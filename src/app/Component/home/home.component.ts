import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CourseSliderComponent } from "../CourseSlider/course-slider/course-slider.component";
import { TabsToggleComponent } from "../TabsToggle/tabs-toggle/tabs-toggle.component";
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';


@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [ CourseSliderComponent, TabsToggleComponent,CarouselModule ,ButtonModule,RouterModule]
})
export class HomeComponent{
 
}
