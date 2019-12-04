import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StaffApiService {
  url = 'http://localhost:3000';
  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'my-auth-token'
    })
  };
  constructor(private http: HttpClient) { }
  loginStaff(loginDetail: any) {
    return this.http.post(this.url + '/api/staff/login', loginDetail)
  }
  getTeacher() {
    const token = JSON.parse(localStorage.getItem('user'))[0].token;
    this.httpOptions.headers = this.httpOptions.headers.set('token', token);
    return this.http.get(this.url + '/api/teacher', this.httpOptions);
  }
  editAdmin(newDetsils) {
    const token = JSON.parse(localStorage.getItem('user'))[0].token;
    this.httpOptions.headers = this.httpOptions.headers.set('token', token);
    return this.http.patch(this.url + '/api/teacher', newDetsils, this.httpOptions)
  }
}
