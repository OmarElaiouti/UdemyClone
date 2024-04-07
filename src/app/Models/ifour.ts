export interface Ifour {
  featuredFeedback:{

    studentName:string;
    rate:number;
    studentImage:string;
    date:string;
    reviewComment:string;
  }
  // feedbacks:[{
  // studentName:string;
  // rate:number;
  // studentImage:string;
  // date:string;
  // }];
  objectives:[{
    id:number;
    content:string;
  }];
  requirements:[{
    id:number;
    content:string;
  }];
}
