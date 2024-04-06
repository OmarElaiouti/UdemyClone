export interface IData {    //update
  categoryName:string;
  subcatName:string;
  topicName:string;
  courseTitle:string;
  courseDisc:string;
  price:number;
  level:string;
  cover:string;
  language:string;
  Objectives:[{
    id:number;
    content:string;
  }];
  fullDescription:string;
  sectionnum:number;
  sections:[{
    sectionName:string;
    lessons:[{
      lessonName:string;
      lessonTimeInMinutes:number;
    }]
  }]
  requirements:[{
    id:number;
    content:string;
  }];
}


export interface Idata{    //create

  categoryName:string;
  subcatName:string;
  topicName:string;
  courseTitle:string;
  courseDisc:string;
  price:number;
  level:string;
  cover:string;
  language:string;
  Objectives:[{
    id:number;
    content:string;
  }];
  fullDescription:string;
  sectionnum:number;
  sections:[{
    sectionName:string;
    lessons:[{
      lessonName:string;
      lessonTimeInMinutes:number;
      lessonVideo:string
    }]
  }]
  requirements:[{
    id:number;
    content:string;
  }];
}


export interface IinstructorCourse{
  id:number;
    name:string;
    image:string;
    instructorName:string;
    rate:number;
    price:number;
    reviewersNumber:number;
    briefDescription:string
}
