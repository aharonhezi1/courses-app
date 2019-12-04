import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AddOrEditStudentComponent } from './addOrEditStudent/addOrEditStudent.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { HomePageComponent } from './home-page/home-page.component';

import { AuthModalComponent } from './auth-modal/auth-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StudentsZoneComponent } from './students-zone/students-zone.component';
import { StudentsHeaderComponent } from './students-zone/students-header/students-header.component';
import { StudentsProfileComponent } from './students-zone/students-profile/students-profile.component';
import { AgGridModule } from '@ag-grid-community/angular';
import { RouterModule, PreloadingStrategy, PreloadAllModules, Routes } from '@angular/router';
import { StudentCoursesComponent } from './students-zone/student-courses/student-courses.component';
import { StaffZoneComponent } from './staff-zone/staff-zone.component';
import { StaffHeaderComponent } from './staff-zone/staff-header/staff-header.component';
import { StaffStudentsInfoComponent } from './staff-zone/staff-students-info/staff-students-info.component';
import { StaffCoursesInfoComponent } from './staff-zone/staff-courses-info/staff-courses-info.component';
import { AddCourseComponent } from './staff-zone/staff-courses-info/add-course/add-course.component';
import { AdminDetailsComponent } from './staff-zone/admin-details/admin-details.component';
import { EditAdminComponent } from './staff-zone/admin-details/edit-admin/edit-admin.component';


const appRoute: Routes = [
  {
    path: '', redirectTo: '/home', pathMatch: 'full'
  },
  { path: 'home', component: HomePageComponent },
  {
    path: 'students', component: StudentsZoneComponent, children: [
      { path: '', component: StudentsZoneComponent },
      { path: 'my-profile', component: StudentsProfileComponent },
      { path: 'my-courses', component: StudentCoursesComponent }
    ]
  }, {
    path: 'staff', component: StaffZoneComponent, children: [
      { path: '', component: StaffZoneComponent },
      { path: 'students', component: StaffStudentsInfoComponent },
      { path: 'courses', component: StaffCoursesInfoComponent },
      { path: 'admin-details', component: AdminDetailsComponent }
    ]
  },
  { path: '**', pathMatch: 'full', component: HomePageComponent }];






@NgModule({
  declarations: [
    AppComponent,
    AddOrEditStudentComponent,
    HeaderComponent,
    HomePageComponent,
    AuthModalComponent,
    StudentsZoneComponent,
    StudentsHeaderComponent,
    StudentsProfileComponent,
    StudentCoursesComponent,
    StaffZoneComponent,
    StaffHeaderComponent,
    StaffStudentsInfoComponent,
    StaffCoursesInfoComponent,
    AddCourseComponent,
    AdminDetailsComponent,
    EditAdminComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    AgGridModule.withComponents([]),
    RouterModule.forRoot(appRoute)

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
