import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { timer } from 'rxjs';
import { QuestionPaper, TestPaper, UserObj } from '../resources/models/auth.models';
import { AuthService } from '../resources/services/auth.service';
// import { setTimeout } from "timers/promises";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  userAuthenticated:boolean = false;
  userTypeInMain:string|any=""
  editingQp!: TestPaper|any;
  creatingQp!: TestPaper|any;
  createQuestion!: any;
  main_question_paper_list: QuestionPaper[]|any = []
  selectedQP: QuestionPaper|any = null;

  constructor(
    private authApiService: AuthService,
    private cookieService: CookieService,
    private router: Router
  ) { }
  user_obj: any = null

  async ngOnInit() {
    await timer(3000).toPromise()
    this.userTypeInMain = this.cookieService.get('user-type')
    if (this.userTypeInMain=="" || this.userTypeInMain==null){
      this.userTypeInMain = localStorage.getItem("user-type")
    }

    if (this.userTypeInMain=="Checker" || this.userTypeInMain == "Examinar"){
      this.getSentToVerificationPapers()
    }
    else{
      this.getQuestionPapers();
    }

    this.redirectToPages()
  }
  async getUserType(userType:string){
    this.userTypeInMain = userType
  }

  async getSentToVerificationPapers(){
    await this.authApiService.getSentToVeerificationPapersService(
      this.userTypeInMain
    ).subscribe(
      (data: QuestionPaper[]|any)=>{
        this.main_question_paper_list = data;
      },
      error=>console.error(error.error.detail)
    )
  }
  async getVerificationAcceptedPapers(){
    this.authApiService.getVerificationAcceptedPapersService(this.userTypeInMain).subscribe(
      (data: QuestionPaper[]|any)=>{
        this.main_question_paper_list = data;
      },
      error=>console.error(error.error.detail)
    )
  }

  async getVerifiedByPapers(){

  }


  getQuestionPapers(){
    this.authApiService.getQuestionPapers().subscribe(
      (data: QuestionPaper[]|any) => {
        this.main_question_paper_list = data['result'];
      },
      error => console.error(error.error.detail)
    )
  }
  getSetterQuestionPapers(){
    this.authApiService.getQuestionPapers({'is_sent_checker': true}).subscribe(
      (data: QuestionPaper[]|any) => {
        this.main_question_paper_list = data['result'];
      },
      error => console.error(error.error.detail)
    )
  }
  getExaminerQuestionPapers(){
    this.authApiService.getQuestionPapers({'is_sent_examiner': true}).subscribe(
      (data: QuestionPaper[]|any) => {
        this.main_question_paper_list = data['result'];
      },
      error => console.error(error.error.detail)
    )
  }



  redirectToPages(){
    if (!this.cookieService.get('user-token')){
        // this.cookieService.delete('user-token')
        this.router.navigate(['/auth'])
    }
  }
  selectQpFunc(qp: QuestionPaper){
    this.selectedQP = qp
    this.editingQp = null;
    this.createQuestion = null;
  }
  checkLogin(){
    if (this.cookieService.get('user-token')){
      this.userAuthenticated = true
    }
    else{
      this.userAuthenticated = false
    }
    return this.userAuthenticated
  }
  editQPMainFunc(qp: QuestionPaper){
    this.selectedQP = null
    this.editingQp = qp;
    this.createQuestion = null;

  }
  createQpFunc(){
    this.selectedQP = null;
    this.editingQp = {'questions': [], 'cut_off_marks': 0}
    this.createQuestion = null;
  }
  createQuestionMainFunc(){
    this.selectedQP = null;
    this.editingQp = null;
    this.createQuestion = {'question_title': "", "answer": "", "marks": 0}

  }
  creatingQpFunc(qp:any){
  this.authApiService.createQp(qp.title.toString(), qp.description).subscribe(
    result => {
      this.getSetterQuestionPapers()
    },
    error => console.error(error.error.detail)

  )
  }
  editingQPFunc(qp:any){
    this.authApiService.editingQp().subscribe(
      result => {this.getQuestionPapers()},
      error=>console.error(error.error.detail)

    )
  }
  creatingQuestion(question_data:any){
    console.log(question_data)
    this.authApiService.createQuestionService(question_data.question_title, question_data.answer,
      question_data.marks).subscribe(
        result => {
          this.getQuestionPapers()
        },
        error => console.error(error.error.detail)
      )
  }
  sendingQPforCheckerApprovalFunc(qp:QuestionPaper){
    this.authApiService.sendToCheckerApprovalService(qp.id).subscribe(
      result=>{
        this.getSetterQuestionPapers();
        this.getQuestionPapers();
        this.selectedQP = null
      },
      error => console.error(error.error.detail)
    )
  }

  acceptingQPForVerifyMainFunc(qp_id:number){
    this.authApiService.acceptingQPForVerifyFuncService(qp_id).subscribe(
      result=>{
        this.getSentToVerificationPapers()
      },
      error => console.log(error.error.detail)
    )
  }
  verifyingQpMainFun(data:any){
    this.authApiService.verifyingQpFuncService(data).subscribe(
      result => {
        this.getSetterQuestionPapers();
        this.getExaminerQuestionPapers();
        this.getVerificationAcceptedPapers();
        this.selectedQP = null
      }
    )
  }
}
