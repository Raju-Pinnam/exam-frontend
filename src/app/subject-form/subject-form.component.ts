import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-subject-form',
  templateUrl: './subject-form.component.html',
  styleUrls: ['./subject-form.component.css']
})
export class SubjectFormComponent implements OnInit {

  @Output() subjectEmit = new EventEmitter()
  subjectForm = new FormGroup(
    {
      subject_name: new FormControl('')
    }
  )
  constructor() { }

  ngOnInit(): void {
  }

  subjectEmitFunc(){
    this.subjectEmit.emit(this.subjectForm.value)
  }

}
