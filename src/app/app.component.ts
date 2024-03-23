import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './Component/footer/footer.component';
import { NavbarComponent } from './Component/navbar/navbar.component';
import { HomeComponent } from './Component/home/home.component';
import { CourseLessonComponent } from "./Component/CourseLessons/course-lesson/course-lesson.component";


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, FooterComponent, NavbarComponent, HomeComponent, CourseLessonComponent]
})
export class AppComponent {
  title = 'graduation_proj';

  expandedItems: { [key: string]: boolean } = {};

  toggleCollapse(collapseId: string): void {
    this.expandedItems[collapseId] = !this.expandedItems[collapseId];
  }

  isExpanded(collapseId: string): boolean {
    return this.expandedItems[collapseId] || false;
  }
}
