export enum Type{
    degree = 0,
    diploma = 1
}

export class Qualification{
    id?: number;
    type: Type;
    description: string;
    employeeId:number;
  } 