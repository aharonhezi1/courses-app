import { Component, OnInit } from '@angular/core';
import { StaffApiService } from 'src/app/staff-api.service';
import { AuthService } from 'src/app/auth-student.service';

@Component({
  selector: 'app-admin-details',
  templateUrl: './admin-details.component.html',
  styleUrls: ['./admin-details.component.css']
})
export class AdminDetailsComponent implements OnInit {
  profile = {
    name: '',
    password: ''
  };
  isEditMode;
  constructor(private staffApiService: StaffApiService, private authService: AuthService) { }
  onEdit() {
    this.isEditMode = true;
  }
  ngOnInit() {
    this.authService.autheticateNameSubject.subscribe(() =>
      this.staffApiService.getTeacher().subscribe((res:any) => {
        this.profile = res[0]
        console.log(res)
      }
      )
    )

  }

}
