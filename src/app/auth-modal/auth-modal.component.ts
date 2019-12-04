import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StudentsApiService } from '../students-api.service';
import { AuthService } from '../auth-student.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StaffApiService } from '../staff-api.service';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.css']
})
export class AuthModalComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) f: NgForm;
  @ViewChild('close', { static: false }) close: ElementRef;

  errorMessage = '';
  isClick = true;
  isStaff = false;
  isCheckAuthActive = false;
  subscription;
  constructor(private router: Router,
    private studentsApiService: StudentsApiService,
    private staffApiService: StaffApiService,
    private authService: AuthService,
    private route: ActivatedRoute) { }

  onCheckAuth() {
    this.isCheckAuthActive = true;

    this.authService.isStaffLogingIn.subscribe(isStaffLogingIn => {
      if (this.isCheckAuthActive) {
        if (!isStaffLogingIn && this.isCheckAuthActive) {
          this.studentsApiService.loginStudent(this.f.value).subscribe((res: any) => {
            console.log(res);
            if (res) {

              this.authService.autheticateTokenSubject.next(res[0].token);
              localStorage.removeItem('user');
              localStorage.setItem('user', JSON.stringify(res));
              this.authService.autheticateNameSubject.next(res[0].name);
              this.errorMessage = '';
              this.router.navigate(['/students/my-profile']);
              this.close.nativeElement.click();
            }
          }, error => this.errorMessage = error.error.error
          );
        } else {
          this.staffApiService.loginStaff(this.f.value).subscribe((res: any) => {

            this.authService.autheticateTokenSubject.next(res[0].token);
            localStorage.removeItem('user');
            localStorage.setItem('user', JSON.stringify(res));
            localStorage.removeItem('isStaffLogingIn');
            localStorage.setItem('isStaffLogingIn', 'true');
            this.authService.autheticateNameSubject.next(res[0].name);
            this.errorMessage = '';
            this.router.navigate(['/staff/students']);
            this.close.nativeElement.click();
          }
            , error => this.errorMessage = error.error.error)
        }

        this.f.reset();
      }
    }
    );
    this.isCheckAuthActive = false;
  }

  ngOnInit() {
    this.subscription = this.authService.authErrorMessege.subscribe(message =>
      this.errorMessage = message);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
