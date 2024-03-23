import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './Component/footer/footer.component';
import { NavbarComponent } from './Component/navbar/navbar.component';
import { HomeComponent } from './Component/home/home.component';
import { CourseDetailsComponent } from "./Component/course-details/course-details.component";



@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, FooterComponent, NavbarComponent, HomeComponent, CourseDetailsComponent]
})
export class AppComponent {
  title = 'graduation_proj';
}
