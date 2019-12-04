import { Component, OnInit } from '@angular/core';
import { CoursesApiService } from 'src/app/courses-api.service';

@Component({
  selector: 'app-staff-courses-info',
  templateUrl: './staff-courses-info.component.html',
  styleUrls: ['./staff-courses-info.component.css']
})
export class StaffCoursesInfoComponent implements OnInit {
  constructor(
    private coursesApiService: CoursesApiService) { }
  columnsName = ['course id', 'course name', 'starts at', 'weekly sessions'];
  studentsColumnsName = ['ID', 'name', 'phone', 'residence'];
  studentsColumns;
  columns = [];
  characters;
  courseId;
  courseName;
  studentToken;
  studetsInCourse;
  isStudentShown;
  attendanceColumnsName;
  attndanceValues;
  isAttndanceShown;
  isAddCourse = false;

  onWatchStudents(course) {
    this.courseId = course.courseId;
    this.courseName = course.course_name;
    console.log(course);

    this.coursesApiService.getStudentsInCourse(this.courseId).subscribe(res => {
      if(!res[0]){
         this.isStudentShown=false;

      }else{

      this.studetsInCourse = res;
      console.log(res);
      this.isStudentShown = true;
      this.studentsColumns = Object.keys(res[0]);
      }
    });
  }
  onAddCourse() {
    this.isAddCourse = !this.isAddCourse;
  }
  onclickAttendance(studentId) {
    this.isAttndanceShown = false;

    // this.coursesApiService.getAstudentToken().subscribe(token => {
    //   this.studentToken = token;
    this.coursesApiService.showAttendance(this.courseId, studentId).subscribe((res: any) => {

      this.attendanceColumnsName = Object.keys(res[0]);
      this.attndanceValues = res.map(session => ({
        ...session,
        comment: session.comment === 'null' ? '' : session.comment,
        attendance: !!session.attendance ? 'V' : '-'
      }));
      this.isAttndanceShown = true;
    });
    // });
  }
  ngOnInit() {
    this.coursesApiService.getAllCourese().subscribe((res: any) => {
      console.log(res);
      this.columns = Object.keys(res[0]);

      this.characters = res.map(course => ({
        ...course,
        start_at: course.start_at.slice(0, 10)
      }));
      console.log(this.characters);
    });
  }

}
