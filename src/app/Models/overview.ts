export interface ICourseOverview {
    id: number;
    courseId:number,
    brifDescription: string;
    level: string;
    numStudents: number;
    Languages: string;
    totalLessons: number;
    totalTimeInMinute: number;
    fullDescription: string;
    instructorName: string;
    instructorBiography: string;
    InstrucHeadline: string;
    instructorImage: string;
    instractorRate:number;
    objective:[
      {id:number,
        content:string

      }
    ],
    requirements:[{
      id:number,
      content:string
    }]
  }