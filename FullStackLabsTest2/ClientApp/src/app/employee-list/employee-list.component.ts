import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/Employee';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employeeList: Array<Employee> = [];
  employeeFullList: Array<Employee> = [];
  constructor(private employeeService : EmployeeService) { }

  ngOnInit(){
    this.loadEmployees();
  }

  loadEmployees()
  {
    this.employeeService.getEmployeeList().subscribe(e=> {
      this.employeeList = e;
      this.employeeFullList = e;
    });
    console.log('test');
    console.log(this.employeeList);
  }

  getQulificationType(type)
  {
    return type == 0 ? 'Degree' : 'Diploma';
  }

  delete(id) {
    const ans = confirm('Do you want to delete employee with id: ' + id);
    if (ans) {
      this.employeeService.deleteEmployee(id).subscribe((data) => {
        this.loadEmployees();
      });
    }
  }

  // Filter by qualification
  onFilterChange(e)
  {
    let val = e.target.value;
    this.employeeList = this.employeeFullList.filter(e => e.qualifications.some(i => i.type.toString() == val || val == '2'));
  }
}
