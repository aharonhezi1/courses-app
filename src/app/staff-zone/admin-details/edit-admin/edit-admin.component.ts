import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StudentsApiService } from 'src/app/students-api.service';
import { StaffApiService } from 'src/app/staff-api.service';

@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.css']
})
export class EditAdminComponent implements OnInit {

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
  confirmPassword = '';
  @Input() isChangePassword: boolean;
  errorMessage;

  constructor(private studentsApiService: StudentsApiService, private staffApiService: StaffApiService) { }

  isPasswordconfirm() {
    return this.newPassword === this.confirmPassword;
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
    this.confirmPassword = '';
    this.errorMessage = '';
  }


  onSubmit(f: NgForm) {
    this.errorMessage = '';


    this.staffApiService.editAdmin(f.value).subscribe(res => {
      console.log(f.value);
      console.log('res', res)
    },
      error => {
        this.errorMessage = error.error.error;
        console.log(error);
      });
  }



  ngOnInit() {
  }

}
