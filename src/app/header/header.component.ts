import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { timer } from 'rxjs';
import { UserObj } from '../resources/models/auth.models';
import { AuthService } from '../resources/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() clickAllQP = new EventEmitter<boolean>()
  @Output() clickSentCheckQP = new EventEmitter<boolean>()
  @Output() clickSentExaminerQP = new EventEmitter<boolean>()
  @Output() userTypeOutput = new EventEmitter<string>()
  defaultAll: boolean = true
  defaultcheck: boolean = false
  defaultExaminer: boolean = false

  defaultPapersToVerify: boolean = true
  defaultPapersAcceptedToverify: boolean = false
  defaultPapersVerified: boolean = false

  @Output() clickToverifyQp = new EventEmitter<boolean>()
  @Output() clickToPapersAccToverifyQp = new EventEmitter<boolean>()
  @Output() clickToPapersVerified = new EventEmitter<boolean>()

  constructor(
    private apiService: AuthService,
    private cookieService: CookieService,
    private router: Router
    ) { }
    userType : string = ""
    @Input() isAuthenticated: Boolean = false;
    ngOnInit(): void {
      this.getOnChanges()
    }
    user_obj: any = null
    async getOnChanges(){
      let userToken = this.cookieService.get('user-token');
      if (userToken){

            this.apiService.getUserDetails().subscribe(
            (result: UserObj)=>{
              this.user_obj = result
              this.userType = this.user_obj.profile_choice
              timer(1000).toPromise()
              localStorage.setItem("user-type", this.userType)
              this.userTypeOutput.emit(this.userType)
            },
            error => alert(error.error.detail)
          )

        this.router.navigate(['/main'])
        this.isAuthenticated = true;
      }
      else{
        this.router.navigate(['/auth'])
        this.cookieService.delete('user-token')

        // localStorage.clear()
        // window.location.reload();
        this.isAuthenticated = false
      }
    }
    logoutFunc(){
      this.cookieService.delete('user-token')
      localStorage.clear()
      window.location.reload();
      this.router.navigate(['/auth'])
    }
    sentToCheckerQps(){
      this.defaultAll = false
      this.defaultExaminer = false
      this.defaultcheck = true

      this.clickSentCheckQP.emit(this.defaultcheck)
    }
    sentToAllQps(){
      this.defaultAll = true
      this.defaultExaminer = false
      this.defaultcheck = false
      this.clickAllQP.emit(this.defaultAll)
    }
    sentToExaminerQps(){
      this.defaultAll = false
      this.defaultExaminer = true
      this.defaultcheck = false
      this.clickSentExaminerQP.emit(this.defaultcheck)
    }

    sendToPapersToVerify(){
      this.defaultPapersToVerify = true
      this.defaultPapersAcceptedToverify = false
      this.defaultPapersVerified = false
      this.clickToverifyQp.emit()
    }
    sendToPapersToAccpetedToVerify(){
      this.defaultPapersToVerify = false
      this.defaultPapersAcceptedToverify = true
      this.defaultPapersVerified = false
      this.clickToPapersAccToverifyQp.emit()
    }
    sendToPapersVerified(){
      this.defaultPapersToVerify = false
      this.defaultPapersAcceptedToverify = false
      this.defaultPapersVerified = true
      this.clickToPapersVerified.emit()
    }

}
