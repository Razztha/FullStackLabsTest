import { Component, OnInit, Type } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee';
import { Address } from '../models/address';
import { Qualification } from '../models/qualification';

@Component({
  selector: 'app-employee-add-edit',
  templateUrl: './employee-add-edit.component.html',
  styleUrls: ['./employee-add-edit.component.css']
})
export class EmployeeAddEditComponent implements OnInit {

  form: FormGroup;
  actionType: string;
  formFirstName: string;
  formLastName: string;
  formEmail: string;
  formTelephone: string;
  formPAddress: string;
  formTAddress: string;
  formQualificationList: any;
  userQualification: any;
  addressList: any;
  degreeChecked:boolean;
  diplomaChecked:boolean;
  id: number;
  errorMessage: any;
  existingEmployee: Employee;

  constructor(private employeeService: EmployeeService, private formBuilder: FormBuilder,
      private avRoute: ActivatedRoute, private router: Router) 
      {
        const idParam = 'id';
        this.actionType = 'Add';
        this.formFirstName = 'fname';
        this.formLastName = 'lname';
        this.formEmail = 'email';
        this.formTelephone = 'telephone';
        this.formPAddress = 'paddress';
        this.formTAddress = 'taddress';
        this.formQualificationList = [
          { id: 1, name: 'Degree', checked: false},
          { id: 2, name: 'Diploma', checked: false}
        ];
        this.userQualification = [];
        this.addressList = [];
        this.degreeChecked = false;
        this.diplomaChecked = false;
        // this.formDegree = true;
        // this.formDiploma = true;
        if (this.avRoute.snapshot.params[idParam]) {
          this.id = this.avRoute.snapshot.params[idParam];
        }

        this.form = this.formBuilder.group(
          {
            id: 0,
            fname: ['', [Validators.required]],
            lname: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
            telephone: ['', [Validators.required, Validators.pattern("^[0-9]{10}$")]],
            paddress: ['', [Validators.required]],
            taddress: ['', [Validators.required]],
            qualification:[]
            // userqual: [[], [Validators.required]]
            // degree: [false, [Validators.requiredTrue]],
            // diploma: [false, [Validators.requiredTrue]],
          }
        )
       }

  ngOnInit(){

    if (this.id > 0) {
      this.actionType = 'Edit';
      this.employeeService.getEmployee(this.id)
        .subscribe(data => (
          this.existingEmployee = data,
          this.form.controls[this.formFirstName].setValue(data.firstName),
          this.form.controls[this.formLastName].setValue(data.lastName),
          this.form.controls[this.formEmail].setValue(data.email),
          this.form.controls[this.formTelephone].setValue(data.telephone),
          this.addressList = data.addresses,
          this.form.controls[this.formPAddress].setValue(data.addresses[0].line1),
          this.form.controls[this.formTAddress].setValue(data.addresses[1].line1),
          this.userQualification = data.qualifications,
          this.diplomaChecked = this.userQualification.some(x => x.type == 1),
          this.degreeChecked = this.userQualification.some(x => x.type == 0)
          // this.form.controls[this.formLastName].setValue(data.lastName),
          // this.form.controls[this.formLastName].setValue(data.lastName)
        ));

        // for(let i=0; i < this.formQualificationList.length; i++)
        //   {
        //      if (this.userQualification.length > 0 && this.formQualificationList[i].id == this.userQualification[i].type+1)
        //      this.formQualificationList[i].status = true;
        //   }
    }
  }

  save() {
    console.log(this.form);
    this.errorMessage = '';
    if (this.userQualification.length == 0){
      this.errorMessage = 'At least one qualification required';
    }

    if (!this.form.valid || this.userQualification.length == 0) {
      return;
    }

      console.log('add in');
      let addressList: Address[] = [];

      if (this.actionType === 'Edit'){
        addressList = [{id:this.addressList[0].id ,line1: this.form.get(this.formPAddress).value, line2: ''},
        {id:this.addressList[1].id, line1: this.form.get(this.formTAddress).value, line2: ''}];
      }
      else{
        addressList = [{line1: this.form.get(this.formPAddress).value, line2: ''},
        {line1: this.form.get(this.formTAddress).value, line2: ''}];
      }
      

      let qualificationList: Qualification[] = this.userQualification;
      let employee: Employee = null;

      if (this.actionType === 'Edit')
      {
        qualificationList.forEach(element => {
          element.employeeId = this.existingEmployee.id;
        });

        employee = {
          id: this.existingEmployee.id,
          firstName: this.form.get(this.formFirstName).value,
          lastName: this.form.get(this.formLastName).value,
          email: this.form.get(this.formEmail).value,
          telephone: this.form.get(this.formTelephone).value,
          addresses: addressList,
          qualifications:qualificationList
        };
      }

      else{
          employee = {
          firstName: this.form.get(this.formFirstName).value,
          lastName: this.form.get(this.formLastName).value,
          email: this.form.get(this.formEmail).value,
          telephone: this.form.get(this.formTelephone).value,
          addresses: addressList,
          qualifications:qualificationList
        };
      }

      if (this.actionType === 'Edit')
      {
        this.employeeService.updateEmployee(employee.id, employee)
        .subscribe((data) => {
          this.router.navigate(['/']);
        });
      }
      else{
        this.employeeService.saveEmployee(employee)
        .subscribe((data) => {
          this.router.navigate(['/']);
        });
      }

  }

  cancel() {
    this.router.navigate(['/']);
  }

  get fname() { return this.form.get(this.formFirstName); }
  get lname() { return this.form.get(this.formLastName); }
  get email() { return this.form.get(this.formEmail); }
  get telephone() { return this.form.get(this.formTelephone); }
  get taddress() { return this.form.get(this.formTAddress); }
  get paddress() { return this.form.get(this.formPAddress); }
  // get userqual() { return this.form.get(this.userQualification); }
  // get diploma() :boolean { return this.form.get(this.formDiploma); }

  onCheckboxChange(e)
  {
    const qual: FormArray = this.form.get('qualification') as FormArray;

    let val = e.target.value;
    
    if (e.target.checked) {
      let type = val == '1' ? 0 : 1;
      this.userQualification.push({'type':type, 'description':'des_'+val})
    } else {
      let type = val == '1' ? 0 : 1;
      for (let q of this.userQualification) {
        if (q.type.toString() == type) {
            this.userQualification.splice(this.userQualification.indexOf(q), 1);
            break;
        }
      }
    }
  }
}
