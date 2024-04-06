export interface Icollaps {
  courseId:number;
  sections:[{
    sectionId: number;
    sectionName: string;
    totalLessons:number;
    totalMinutes: number;
    lessons:[{
      LessonId: number;
      LessonName: string;
      lessonTimeInMinutes: string;
      lessonVideo:string;
      isCompeleted:true;
      notes:[{
        id:number;
        content:string
      }]
    }];
  }];
}

