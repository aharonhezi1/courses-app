import { Component, OnInit, OnDestroy } from '@angular/core';
import { StudentsApiService } from 'src/app/students-api.service';
import { AuthService } from 'src/app/auth-student.service';
import { BehaviorSubject } from 'rxjs';
import { CoursesApiService } from 'src/app/courses-api.service';
// import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-student-courses',
  templateUrl: './student-courses.component.html',
  styleUrls: ['./student-courses.component.css']
})
export class StudentCoursesComponent implements OnInit, OnDestroy {
  token: string;
  subscription;

  constructor(private studentsApiService: StudentsApiService,
    private AuthService: AuthService,
    private coursesApiService: CoursesApiService) { }
  columnsName = ['course id', 'course name', 'starts at', 'weekly sessions'];
  columns = [];
  characters;
  attendanceColumnsName = [];
  attndanceValues = [];
  isAttndanceShown = false;
  courseName;
  isEditAttendace = false;
  user;
  courseId;
  newComment = 'Please enter your comment...';
  newCommentSession;
  onclickAttendance(courseId: string, courseName) {
    this.courseName = courseName;
    this.courseId = courseId;
    this.coursesApiService.showAttendance(courseId,null).subscribe((res: any) => {
      if(!res){
       return this.isAttndanceShown=false;
      }
      this.attendanceColumnsName = Object.keys(res[0]);
      this.attndanceValues = res.map(session => ({
        ...session,
        comment: session.comment === 'null' ? '' : session.comment,
        attendance: !!session.attendance ? 'V' : '-'
      }));
      this.isAttndanceShown = true;
    });
  }
  onEditAttendance(session) {
    this.newComment = session.comment
    this.isEditAttendace = true;
    this.newCommentSession = session.session;
  }
  onSubmitComment(f) {
    const attendanceDetails = {
      session: this.newCommentSession,
      comment: this.newComment
    }
    this.coursesApiService.addCommentToAttendence(this.courseId, attendanceDetails).subscribe();
    this.isAttndanceShown = false;
    this.newComment = 'Please enter your comment...';
    this.isEditAttendace = false;

  }

  ngOnInit() {
    this.subscription = this.AuthService.autheticateNameSubject.subscribe(() => {
      if (localStorage.getItem('user') && localStorage.getItem('user')[0]) {
        this.user = JSON.parse(localStorage.getItem('user'));
        this.token = this.user[0].token;
      }
    });

    this.studentsApiService.showStudentCourses(this.token).subscribe((res: any) => {
      console.log(res);

      this.columns = Object.keys(res[0]);

      this.characters = res.map(course => ({
        ...course,
        start_at: course.start_at.slice(0, 10)
      }));
      console.log(this.characters);
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}



