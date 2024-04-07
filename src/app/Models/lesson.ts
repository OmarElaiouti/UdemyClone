// note.interface.ts
// export interface INote {
//   id: number;
//   videoId: Number;
//   content: string;
// }


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
export interface Review {
  studentName: string;
  rate: number;
  date: string;
  reviewComment: string;
  studentImage: string;

}



export interface IComment {
  id: number;
  courseId: number;
  content: string;
  studentName: string;
  studentImage: string;
  answerTo: number; // Make answer optional
  isReply: boolean;
  isUserComment: boolean;
  isUpdated: boolean;
  date: string;
}


export interface UserProfile {
  name: string;
  email: string;
}

export interface IAnnouncement {
  id: number;
  // courseId: number;
  content: string;
  instructorName: string;
  instructorImage: string;
  date: string;
}

// export interface IVideoLesson{
//   courseId:number,

//   section:[{
//     sectionId:number,
//     sectionName:string,
//     totalLessons:number,
//     totalMinutes:number,

//     lessons:[{
//       lessonId:number,
//       lessonName:string,
//       lessonTimeInMinutes:number,
//       lessonVideo:string,
//       inCompleted:true,
      
//       notes:[{
//         id:number,
//         content:string
//       }]


//     }]
    
//   }]

// }


export interface INote {
  id: number;
  content: string;
}

export interface ILesson {
  lessonId: number;
  lessonName: string;
  lessonTimeInMinutes: number;
  lessonVideo: string;
  inCompleted: boolean;
  notes: INote[];
}

export interface ISection {
  sectionId: number;
  sectionName: string;
  totalLessons: number;
  totalMinutes: number;
  lessons: ILesson[];
}

export interface ICourseSectionsData {
  sections: ISection[];
  
}
