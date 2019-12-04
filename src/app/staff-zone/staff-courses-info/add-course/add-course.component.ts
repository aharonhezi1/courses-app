import { Component, OnInit } from '@angular/core';
import { CoursesApiService } from 'src/app/courses-api.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  errorMessage;
  constructor(private coursesApiService: CoursesApiService) { }
  onSubmit(f) {
    console.log(f.value)
    this.coursesApiService.postNewCourse(f.value).subscribe()
  }
  ngOnInit() {
  }

}
