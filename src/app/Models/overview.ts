export interface ICourseOverview {
  courseID: number;
  briefDescription: string;
  level: string;
  numStudent: number;
  totalLessons: number;
  totalHours: string;
  fullDescription: string;
  language: string;
  instructorName: string;
  instrucHeadlind: string;
  instructorBiography: string;
  instructorRate: number;
  instructorImage: string;
  objectives: IObjective[];
  requirements: IRequirement[];
}

export interface IObjective {
  id: number;
  content: string;
}

export interface IRequirement {
  id: number;
  content: string;
}