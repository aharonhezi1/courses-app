import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs/Observable'
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class StudentsApiService {
  // student: any;
  url = 'http://localhost:3000';
  constructor(private http: HttpClient) { }
  getAllstudents() {
    return this.http.get(this.url + '/api/students');
  }
  getStudent(token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'my-auth-token'
      })
    };
    httpOptions.headers = httpOptions.headers.set('token', token);
    return this.http.get(this.url + '/api/student/', httpOptions);
  }
  postNewStudent(student: any) {
    return this.http.post(this.url + '/api/student', student);
  }
  updateStudent(token, student: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'my-auth-token'
      })
    };
    httpOptions.headers = httpOptions.headers.set('token', token);

    return this.http.patch(this.url + '/api/students', student, httpOptions);
  }
  addStudentToCourse(id: string, studentId) {
    return this.http.post(this.url + '/api/students/' + id, studentId);
  }
  loginStudent(loginDetail: any) {
    return this.http.post(this.url + '/api/students/login', loginDetail);
  }
  showStudentCourses(token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'my-auth-token'
      })
    };
    httpOptions.headers = httpOptions.headers.set('token', token);
    // const id = token;
    return this.http.get(this.url + '/api/students/courses', httpOptions);
  }
}
