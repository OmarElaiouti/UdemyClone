import { Component } from '@angular/core';
import { Route, Router, RouterModule } from '@angular/router';
import { CourseService } from '../../Services/dashboard/course.service';

@Component({
  selector: 'app-instructor-dashboard',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './instructor-dashboard.component.html',
  styleUrl: './instructor-dashboard.component.css'
})
export class InstructorDashboardComponent {
  id!:number;
  constructor(private courseService: CourseService,private router:Router){}
  
quesion(){
  this.courseService.InstructorQuestion(this.id).subscribe(response=>{
    if(response){
      this.router.navigate(['/next1']);
    }
    else{
      alert("You Must compelete you profile");
    }
  })
}
}
