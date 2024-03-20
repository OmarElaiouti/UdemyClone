import { Component } from '@angular/core';
import { CourseSliderComponent } from "../../CourseSlider/course-slider/course-slider.component";

@Component({
    selector: 'app-tabs-toggle',
    standalone: true,
    templateUrl: './tabs-toggle.component.html',
    styleUrl: './tabs-toggle.component.css',
    imports: [CourseSliderComponent]
})
export class TabsToggleComponent {

}
