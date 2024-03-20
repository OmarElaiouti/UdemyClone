import { Component } from '@angular/core';
import { CourcesComponent } from '../cources/cources.component';
import { CourseSliderComponent } from "../CourseSlider/course-slider/course-slider.component";


@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [CourcesComponent, CourseSliderComponent]
})
export class HomeComponent {

}
