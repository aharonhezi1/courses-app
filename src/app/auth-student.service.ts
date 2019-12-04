import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  autheticateTokenSubject = new BehaviorSubject<string>('');
  autheticateNameSubject = new BehaviorSubject<string>('');
  isStaffLogingIn = new BehaviorSubject<boolean>(false);
  authErrorMessege = new BehaviorSubject<string>('');



  constructor() { }
}
