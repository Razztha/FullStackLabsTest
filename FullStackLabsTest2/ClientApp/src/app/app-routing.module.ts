import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { EmployeeAddEditComponent } from './employee-add-edit/employee-add-edit.component';

const routes: Routes = [
  { path:'', component: EmployeeListComponent, pathMatch: 'full'},
  { path:'employee', component: EmployeeListComponent},
  { path:'employee/:id', component: EmployeeDetailComponent},
  { path:'create', component: EmployeeAddEditComponent},
  { path:'employee/edit/:id', component: EmployeeAddEditComponent},
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
