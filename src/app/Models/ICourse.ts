export interface Icourses {
  id:number;
    name:string;
    img:string;
    disc:string;
    instructor:string;
    rating:number;
    price:number;
    totallectuer:number;
    totalHour:number;
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
   

export interface IcoursesMylearning {
  name:string;
  Image:string;
  instructor:string;
  rating:number;
  progress:number;

}

export interface IcourseSmallCard {
    id:number;
    name:string;
    instructor:string;
    rating:number;
    price:number;
}

export interface IuserCourse {
    id: number;
    name: string;
    instructor: string;
    img: string;
    price: number;
  }







[
    { name: 'Course 1',disc:'Python is a general-purpose, versatile, and powerful programming language. It’s a great first language because Python code is concise and easy to read', instructor: 'Instructor 1', rating: 4.5, price: 50, totalHour: 5 ,'totallectuer':16},
    { name: 'Course 2 ',disc:'Python is a general-purpose, versatile, and powerful programming language. It’s a great first language because Python code is concise and easy to read', instructor: 'Instructor 2 with a very long name', rating: 4.8, price: 60, numReviewers: 8723,'totallectuer':16 },
    { name: 'Course 3',disc:'Python is a general-purpose, versatile, and powerful programming language. It’s a great first language because Python code is concise and easy to read', instructor: 'Instructor 3', rating: 3.9, price: 45, totalHour: 1,'totallectuer':16 },
    { name: 'Course 4',disc:'Python is a general-purpose, versatile, and powerful programming language. It’s a great first language because Python code is concise and easy to read', instructor: 'Instructor 4', rating: 4.2, price: 55, totalHour: 3,'totallectuer':16 },
    { name: 'Course 5',disc:'Python is a general-purpose, versatile, and powerful programming language. It’s a great first language because Python code is concise and easy to read', instructor: 'Instructor 5', rating: 4.7, price: 65, totalHour: 2 ,'totallectuer':16 },
    { name: 'Course 6',disc:'Python is a general-purpose, versatile, and powerful programming language. It’s a great first language because Python code is concise and easy to read', instructor: 'Instructor 6', rating: 4.1, price: 40, totalHour: 3 ,'totallectuer':16},
    // Add more courses as needed
  ];