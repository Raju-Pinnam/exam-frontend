import { Component, Input, OnInit } from '@angular/core';
import { QuestionPaper } from 'src/app/resources/models/auth.models';

@Component({
  selector: 'app-quesion-papers',
  templateUrl: './quesion-papers.component.html',
  styleUrls: ['./quesion-papers.component.css']
})
export class QuesionPapersComponent implements OnInit {

  @Input() questionpapers!: QuestionPaper[];
  constructor() { }

  ngOnInit(): void {
  }

}
