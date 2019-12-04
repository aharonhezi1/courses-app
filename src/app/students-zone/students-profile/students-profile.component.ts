import { Component, OnInit, ViewChild, Injectable, OnDestroy } from '@angular/core';
import { AllCommunityModules } from '@ag-grid-community/all-modules';
import { GridOptions } from 'ag-grid-community';

import { StudentsApiService } from 'src/app/students-api.service';
import { AuthService } from 'src/app/auth-student.service';
import { AgGridAngular } from '@ag-grid-community/angular';

@Component({
  selector: 'app-students-profile',
  templateUrl: './students-profile.component.html',
  styleUrls: ['./students-profile.component.css']
})
export class StudentsProfileComponent implements OnInit, OnDestroy {
  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
  rowData: any;
  token: any;
  subscription;
  user;
  profile = {
    name: '',
    residence: '',
    phone: ''
  };
  isEditMode = false;
  constructor(private studentsApiService: StudentsApiService, private AuthService: AuthService) { }

  onEdit() {
    this.isEditMode = true;
  }
  // columnDefs = [
  //   { headerName: 'name', field: 'name', sortable: true, filter: true },
  //   { headerName: 'password', field: 'password', sortable: true, filter: true },
  //   { headerName: 'residence', field: 'residence', sortable: true, filter: true },
  //   { headerName: 'phone', field: 'phone', sortable: true, filter: true }
  // ];
  // modules = AllCommunityModules;
  //  this.agGrid.gridOptions = {
  //     rowClass: 'my-green-class'
  //   }

  ngOnInit() {

    this.subscription = this.AuthService.autheticateNameSubject.subscribe(() => {
      if (localStorage.getItem('user') && localStorage.getItem('user')[0]) {
        this.user = JSON.parse(localStorage.getItem('user'));
        this.token = this.user[0].token;
      }
      if (this.token) {
        this.studentsApiService.getStudent(this.token).subscribe(res => {
          console.log(res);
          this.rowData = res;
          this.profile = res[0];
        });
      }
    });


  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
