import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoursesApiService {
  url = 'http://localhost:3000';

  constructor(private http: HttpClient) { }
  getAstudentToken() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'my-auth-token'
      })
    };
    const token = JSON.parse(localStorage.getItem('user'))[0].token;
    httpOptions.headers = httpOptions.headers.set('token', token);
    return this.http.get(this.url + '/api/token', httpOptions);
  }
  getAllCourese() {
    return this.http.get(this.url + '/api/courses')
  }
  postNewCourse(course: any) {
    return this.http.post(this.url + '/api/courses', course);
  }
  getStudentsInCourse(id: string) {
    return this.http.get(this.url + '/api/courses/' + id);
  }
  markAttendance(id: string, attendanceDetails: any) {
    return this.http.post(this.url + '/api/courses/' + id + '/attendance', attendanceDetails);
  }
  addCommentToAttendence(courseId: string, attendanceDetails: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'my-auth-token'
      })
    };
    const token = JSON.parse(localStorage.getItem('user'))[0].token;
    httpOptions.headers = httpOptions.headers.set('token', token);
    return this.http.patch(this.url + '/api/courses/' + courseId + '/attendance', attendanceDetails, httpOptions);
  }
  showAttendance(courseId: string, studetId) {
    console.log(courseId)
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'my-auth-token'
      })
    };
    const token = JSON.parse(localStorage.getItem('user'))[0].token;
    httpOptions.headers = httpOptions.headers.set('token', token);
    if(studetId){
    httpOptions.headers = httpOptions.headers.set('studetId', studetId);
  }
    return this.http.get(this.url + '/api/courses/' + courseId + '/attendance/', httpOptions);
  }

}
