import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth-student.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  name: string;
  isAuth = false;
  isStaffLogingIn: boolean;
  user: any;
  subscription;
  isStaffSubscription;
  constructor(private authService: AuthService, private router: Router) { }

  onLogout() {
    this.authService.autheticateNameSubject.next('');
    this.authService.autheticateTokenSubject.next('');
    localStorage.removeItem('user');
    localStorage.removeItem('isStaffLogingIn');
    this.authService.isStaffLogingIn.next(false);
    this.router.navigateByUrl('/home');
  }
  onClickStudentsInfo() {
    this.authService.authErrorMessege.next('');
    this.authService.isStaffLogingIn.next(false)
  }
  onClickStaffInfo() {
    this.authService.authErrorMessege.next('');
    this.authService.isStaffLogingIn.next(true)
  }

  ngOnInit() {
    this.subscription = this.authService.autheticateNameSubject.subscribe((name) => {
      if (!name && this.isAuth) {
        this.name = '';
        this.user = '';
        this.isAuth = false;
        localStorage.removeItem('user');
      } else {
        if (localStorage.getItem('user') && localStorage.getItem('user')[0]) {
          this.user = JSON.parse(localStorage.getItem('user'));
          this.name = this.user[0].name;
          this.isAuth = true;
        }
      }
    });
    this.isStaffSubscription = this.authService.isStaffLogingIn.subscribe(islog => {
      if (islog) {
        this.isStaffLogingIn = islog;
      } else {
        this.isStaffLogingIn = !!JSON.parse(localStorage.getItem('isStaffLogingIn'))
      }
    }
    );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.isStaffSubscription.unsubscribe();
  }


}


