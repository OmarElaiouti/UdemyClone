import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CourseSliderComponent } from "../CourseSlider/course-slider/course-slider.component";
import { TabsToggleComponent } from "../TabsToggle/tabs-toggle/tabs-toggle.component";
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
declare var $:any


@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [ CourseSliderComponent, TabsToggleComponent,CarouselModule ,ButtonModule]
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('carouselExampleControls', { static: false })
  carousel!: ElementRef;

  ngAfterViewInit() {
    // Initialize the carousel
    if (this.carousel && this.carousel.nativeElement) {
      $(this.carousel.nativeElement).carousel();
    }
  }
}
