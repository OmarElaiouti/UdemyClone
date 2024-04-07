import { Component, Input, OnInit } from '@angular/core';
import { ICourseOverview, IObjective, IRequirement } from '../../Models/overview';
import { VideoLessonService } from '../../Services/videoLesson/video-lesson.service';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})

export class OverviewComponent implements OnInit {
  


  @Input() courseId!: number;

  overview!: ICourseOverview;
  objectives: IObjective[] = this.overview.objectives;
  requirements: IRequirement[] = this.overview.requirements;

  constructor(private overviewService: VideoLessonService) { }

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
