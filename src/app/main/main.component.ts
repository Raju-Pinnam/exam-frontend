import { Component, OnInit } from '@angular/core';
import { QuestionPaper } from '../resources/models/auth.models';
import { AuthService } from '../resources/services/auth.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  main_question_paper_list: QuestionPaper[]|any = []

  constructor(
    private authApiService: AuthService
  ) { }

  ngOnInit(): void {
    this.getQuestionPapers()
  }

  getQuestionPapers(){
    this.authApiService.getQuestionPapers().subscribe(
      (data: QuestionPaper[]|any) => {
        this.main_question_paper_list = data['result'];
      },
      error => console.error(error)
    )
  }


}
