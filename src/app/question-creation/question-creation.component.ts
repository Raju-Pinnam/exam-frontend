import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-question-creation',
  templateUrl: './question-creation.component.html',
  styleUrls: ['./question-creation.component.css']
})
export class QuestionCreationComponent implements OnInit {
  // @Input() question: any;
  @Output() newQuestion = new EventEmitter()
  questionForm = new FormGroup({
    question_title: new FormControl(),
    answer: new FormControl(),
    marks: new FormControl()
  })
  constructor() { }

  ngOnInit(): void {
  }

  saveQuestion(){
    this.newQuestion.emit(this.questionForm.value)
  }

}
