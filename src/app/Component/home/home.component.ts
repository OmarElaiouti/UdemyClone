import { Component } from '@angular/core';
import { CourcesComponent } from '../cources/cources.component';
import { CourseSliderComponent } from "../CourseSlider/course-slider/course-slider.component";
import { TabsToggleComponent } from "../TabsToggle/tabs-toggle/tabs-toggle.component";


@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [CourcesComponent, CourseSliderComponent, TabsToggleComponent]
})
export class HomeComponent {

}
