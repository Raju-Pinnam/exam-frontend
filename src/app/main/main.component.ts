import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { QuestionPaper, TestPaper } from '../resources/models/auth.models';
import { AuthService } from '../resources/services/auth.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  userAuthenticated:boolean = false;
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

  ngOnInit(): void {
    this.getQuestionPapers()
    this.redirectToPages()
  }

  getQuestionPapers(){
    this.authApiService.getQuestionPapers().subscribe(
      (data: QuestionPaper[]|any) => {
        this.main_question_paper_list = data['result'];
      },
      error => alert(error.message)
    )
  }
  getSetterQuestionPapers(){
    this.authApiService.getQuestionPapers({'is_sent_checker': true}).subscribe(
      (data: QuestionPaper[]|any) => {
        this.main_question_paper_list = data['result'];
      },
      error => alert(error.message)
    )
  }
  getExaminerQuestionPapers(){
    this.authApiService.getQuestionPapers({'is_sent_examiner': true}).subscribe(
      (data: QuestionPaper[]|any) => {
        this.main_question_paper_list = data['result'];
      },
      error => alert(error.message)
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
    error => alert(error.message)

  )
  }
  editingQPFunc(qp:any){
    this.authApiService.editingQp().subscribe(
      result => {this.getSetterQuestionPapers()},
      error=>alert(error.message)

    )
  }
  creatingQuestion(question_data:any){
    console.log(question_data)
    this.authApiService.createQuestionService(question_data.question_title, question_data.answer,
      question_data.marks).subscribe(
        result => {

        },
        error => alert(error.message)
      )
  }
}
