import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Employee } from '../models/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  myAppUrl: string;
  myApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };
  
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.appUrl;
    this.myApiUrl = 'api/employee/';
   }

   test(){
   this.http.get(this.myAppUrl + this.myApiUrl).subscribe(  
    data => {  
      return data as string [];  
    }  
    );
   }

   getEmployeeList(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.myAppUrl + this.myApiUrl)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  getEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(this.myAppUrl + this.myApiUrl + id)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  saveEmployee(employee): Observable<Employee> {
    return this.http.post<Employee>(this.myAppUrl + this.myApiUrl, JSON.stringify(employee), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  updateEmployee(id: number, employee): Observable<Employee> {
    return this.http.put<Employee>(this.myAppUrl + this.myApiUrl + id, JSON.stringify(employee), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
}

deleteEmployee(id: number): Observable<Employee> {
    return this.http.delete<Employee>(this.myAppUrl + this.myApiUrl + id)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
}

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
