import {Address} from './address';
import {Qualification} from './qualification';

export class Employee {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    telephone: string;
    addresses: Array<Address>;
    qualifications: Array<Qualification>
  }
