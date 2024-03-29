export interface Icollaps {
  courseId:number;
  sections:section[];
}

export interface section {
  sectionId: number;
  sectionName: string;
  lectureNum:string;
  time: number;
  Lessons:Lesson[];
}

export interface Lesson {
    LessonId: number;
    LessonName: string;
    LessonTime: string;
}
