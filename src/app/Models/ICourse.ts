export interface Icourselong {
  id:number;
    name:string;
    image:string;
    briefDescription:string;
    instructorName:string;
    rate:number;
    price:number;
    totalLessons:number;
    totalHours:number;

}


export interface Instructor{
  id:number;
  c_name:string;  //course name
  instructor:string;
  img:string;
  rating:number;
  nOfCourse:number;
  students:number     //number of student

}
   

export interface IcourseWithObjectives {
  id:number;
    name:string;
    image:string;
    instructorName:string;
    rate:number;
    price:number;
    reviewersNumber:number;
    objectives:Iobjective[]
//for my learning
}
export interface Iobjective {
id:number;
content:string
}



export interface Icourse {
    id:number;
    name:string;
    image:string;
    instructorName:string;
    rate:number;
    price:number;
}

  //for slider and wishlist in navbar






