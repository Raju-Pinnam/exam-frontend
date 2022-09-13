import { Component, Input, OnInit } from '@angular/core';
import { QuestionPaper } from 'src/app/resources/models/auth.models';

@Component({
  selector: 'app-quesion-paper',
  templateUrl: './quesion-paper.component.html',
  styleUrls: ['./quesion-paper.component.css']
})
export class QuesionPaperComponent implements OnInit {

  @Input() qp: QuestionPaper|any = null
  constructor() { }

  ngOnInit(): void {
  }

}
