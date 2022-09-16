import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { timer } from 'rxjs';
import { QuestionPaper } from 'src/app/resources/models/auth.models';

@Component({
  selector: 'app-quesion-papers',
  templateUrl: './quesion-papers.component.html',
  styleUrls: ['./quesion-papers.component.css']
})
export class QuesionPapersComponent implements OnInit {

  @Input() questionpapers!: QuestionPaper[];
  @Input() UserProfileChoice: string = "Setter"
  @Output() selectedPaperOutput = new EventEmitter<QuestionPaper>()
  @Output() selectEditQp = new EventEmitter<QuestionPaper>();
  @Output() selectedeleteQp = new EventEmitter<QuestionPaper>();
  @Output() createQp = new EventEmitter();
  @Output() createQuestion = new EventEmitter();
  @Output() qpAcceptedByCheckOrExam = new EventEmitter()
  constructor() { }

  async ngOnInit() {
    await timer(3000).toPromise()
  }

  selectedQpFunc(questionpaer: QuestionPaper){
    this.selectedPaperOutput.emit(questionpaer)
  }
  editQpFunc(qp: QuestionPaper){
    this.selectEditQp.emit(qp)
  }
  createQpFunc(){
    this.createQp.emit()
  }
  createQuestionFunc(){
    this.createQuestion.emit()
  }
  qpAcceptedByCheckOrExamFunc(qp_id:number){
    this.qpAcceptedByCheckOrExam.emit(qp_id)
  }
}
