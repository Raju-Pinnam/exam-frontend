import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { QuestionPaper } from 'src/app/resources/models/auth.models';

@Component({
  selector: 'app-quesion-papers',
  templateUrl: './quesion-papers.component.html',
  styleUrls: ['./quesion-papers.component.css']
})
export class QuesionPapersComponent implements OnInit {

  @Input() questionpapers!: QuestionPaper[];
  @Output() selectedPaperOutput = new EventEmitter<QuestionPaper>()
  @Output() selectEditQp = new EventEmitter<QuestionPaper>();
  @Output() selectedeleteQp = new EventEmitter<QuestionPaper>();
  @Output() createQp = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
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
}
