// note.interface.ts
export interface INote {
  id: number;
  videoId: Number;
  content: string;
}


export interface IComment {
  id: Number;
  courseId: Number;
  content: string;
  personName: string;
  personPictureUrl: string;
}

// export interface Review {
//   id: number;
//   videoId: string;
//   rating: number;
//   comment: string;
// }

// review.interface.ts
// export interface Review {
//   id: number;
//   reviewerName: string;
//   reviewerPhoto: string;
//   rating: number; 
//   comment: string;
//   courseId: number;
// }

// review.interface.ts
export interface ReviewData {
  rating: number;
  comment: string;
  courseId: number;
}

export interface Review extends ReviewData {
  id: number;
  reviewerName: string;
  reviewerPhoto: string;
}


export interface IQuestion {
  id: Number;
  courseId: Number;
  content: string;
  personName: string;
  personPictureUrl: string;
}

export interface IAnnouncement {
  id: number;
  courseId: number;
  content: string;
  personName: string;
  personPictureUrl: string;
  // date: Date;
}

export interface IvideoLesson{
  courseId:number,

  section:[{
    sectionId:number,
    sectionName:string,
    totalLessons:number,
    totalMinutes:number,

    lessons:[{
      lessonId:number,
      lessonName:string,
      lessonTimeInMinutes:number,
      lessonVideo:string,
      inCompleted:true,
      
      notes:[{
        id:number,
        content:string
      }]


    }]
    
  }]

}
