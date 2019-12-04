import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';
import { StudentsApiService } from '../students-api.service';

import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-or-edit-student',
  templateUrl: './addOrEditStudent.component.html',
  styleUrls: ['./addOrEditStudent.component.css']
})
export class AddOrEditStudentComponent implements OnInit {
  @ViewChild('f', { static: false }) f: NgForm;
  @Input() isEditMode: boolean;
  @Input() profile = {
    name: null,
    id: null,
    password: null,
    residence: null,
    token: null,
    phone: null
  };
  newPassword = '';
  comformPassword = '';
  @Input() isChangePassword: boolean;
  errorMessage;

  constructor(private studentsApiService: StudentsApiService) { }

  isPasswordConform() {
    return this.newPassword === this.comformPassword;
  }
  onClear() {
    this.f.reset({
      'name': this.profile.name,
      'id': this.profile.id
    });

  }
  onChangePassword() {
    this.isChangePassword = !this.isChangePassword;
    this.newPassword = '';
    this.comformPassword = '';
    this.errorMessage = '';
  }

  fetchStudents() {
    this.studentsApiService.getAllstudents().subscribe(res =>
      console.log(res));
  }
  onSubmit(f: NgForm) {
    this.errorMessage = '';
    if (this.isEditMode) {

      this.studentsApiService.updateStudent(this.profile.token, f.value).subscribe(res =>
        console.log('res', res),
        error => {
          this.errorMessage = error.error.error;
          console.log(error);
        });
    } else {
      console.log('not wotking');
      this.studentsApiService.postNewStudent(f.value).subscribe((res: any) => {

        console.log(res);
      },
        error => {
          this.errorMessage = error.error.error;
          console.log(error);
        });
    }
  }


  ngOnInit() {
    //this.fetchStudents();
    // this.addStudent();
  }

}
