import { Component, Input, OnInit } from '@angular/core';
import { OverviewService } from '../../Services/overview/overview.service';
import { ICourseOverview } from '../../Models/overview';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})

export class OverviewComponent implements OnInit {
  

//   overview:ICourseOverview=
// {id:1,courseId:1, aboutThisCourse :"ASP.NET Core 6 and Angular 14 Full ecommerce website with payment integration using stripe gateway.",
// Captions:"Yes",SkillLevel:"Intermediate Level" ,NofStudents:265562,Languages:"Arabic",NofLectures:55,totalHours:52
// ,Description:"In a world drowning in data, standing out is no longer an option; it's a necessity. Traditional SEO methods are becoming obsolete, and the future belongs to those who adapt, evolve, and embrace the power of Artificial Intelligence. This course is a treasure trove of cutting-edge tools and strategies, meticulously designed to make you the Gandalf of SEO"
// ,WhatLearn:"Learn to implement full ecommerce using Angular and .NET Core",courseRequirements:"Some knowledge of Angular and .NET Core"
// ,InstructorName:"Abanoub Nabil Tawfik",InstructorDescription:"Teaching Assistant at ITI, Project manager , Head of technical department at McShippers company ,Have great experience at Full stack DOT Net technologies such as , HTML , CSS , JavaScript , TypeScript , Angular , BootStrap , C# , MVC , Dot net Core , React JS and JQuery. Works in many project such as ecommerce application , ERP systems and Banking systems"
// ,InstructorRank:"Teaching Assistant-Team Leader",img:"/assets/support/7799204_2091_5.jpg",

// };

  @Input() courseId!: number;

  overview!: ICourseOverview;

  constructor(private overviewService: OverviewService) { }

  ngOnInit(): void {
    this.fetchOverviewData();
  }

  fetchOverviewData() {
    this.overviewService.getOverviewData(this.courseId).subscribe({
      next: (data) => {
        this.overview = data;
      },
      error: (error) => {
        console.error('Error fetching overview data:', error);
      }
    });
  }
  

}
