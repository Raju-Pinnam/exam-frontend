import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
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
  defaultAll: boolean = true
  defaultcheck: boolean = false
  defaultExaminer: boolean = false
  constructor(
    private apiService: AuthService,
    private cookieService: CookieService,
    private router: Router
    ) { }
    @Input() isAuthenticated: Boolean = false;
    ngOnInit(): void {
      this.OnChanges()
    }
    user_obj: any = null
    OnChanges(): void {
      let userToken = this.cookieService.get('user-token');
      if (userToken){
        this.router.navigate(['/main'])
        this.isAuthenticated = true;
        this.apiService.getUserDetails().subscribe(
          (result: UserObj)=>{
            this.user_obj = result
          },
          error => console.log(error)
        )
      }
      else{
        this.router.navigate(['/auth'])
        localStorage.clear()
        this.isAuthenticated = false
      }
    }
    logoutFunc(){
      this.cookieService.delete('user-token')
      localStorage.clear()
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
}
