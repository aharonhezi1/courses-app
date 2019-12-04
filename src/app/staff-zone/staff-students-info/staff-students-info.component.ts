import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentsApiService } from 'src/app/students-api.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-staff-students-info',
  templateUrl: './staff-students-info.component.html',
  styleUrls: ['./staff-students-info.component.css']
})
export class StaffStudentsInfoComponent implements OnInit {
  @ViewChild('f', { static: false }) f: NgForm;

  constructor(private studentsApiService: StudentsApiService) { }
  columnsName = ['ID', 'name', 'phone', 'residence'];
  characters;
  columns;
  studentId;
  isAddStudent = false;
  isAddStudentToCourse = false;
  onAddStudent() {
    this.isAddStudent = true;
  }
  onAddStudentToCourse(id) {
    this.isAddStudentToCourse = !this.isAddStudentToCourse;
    this.studentId = id;
  }
  onSubmitStudentToCourse() {
    console.log(this.f.value, this.studentId);

    this.studentsApiService.addStudentToCourse(this.f.value.courseId, { id: this.studentId }).subscribe();

  }
  ngOnInit() {
    this.studentsApiService.getAllstudents().subscribe(res => {
      this.columns = Object.keys(res[0]);
      this.characters = res;
    })
  }

}
