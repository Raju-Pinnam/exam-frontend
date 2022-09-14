import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { QuestionPaper } from 'src/app/resources/models/auth.models';

@Component({
  selector: 'app-quesion-paper',
  templateUrl: './quesion-paper.component.html',
  styleUrls: ['./quesion-paper.component.css']
})
export class QuesionPaperComponent implements OnInit {

  @Input() qp: QuestionPaper|any = null
  @Output() sendForSetterApproval = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }

  sentForSetterApprovalFunc(){
    this.sendForSetterApproval.emit()
  }
}
