import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { QuestionModel, QuestionPaper, UserObj } from 'src/app/resources/models/auth.models';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { AuthService } from 'src/app/resources/services/auth.service';

@Component({
  selector: 'app-quesion-paper-form',
  templateUrl: './quesion-paper-form.component.html',
  styleUrls: ['./quesion-paper-form.component.css']
})
export class QuesionPaperFormComponent implements OnInit {
  qpForm: any;
  qpId: number|any = null;
  user_obj: UserObj|any = null
  questions:QuestionModel[]|any = []
  subject_id: number = 0

  @Output() qpNew = new EventEmitter()
  @Output() qpEdit = new EventEmitter()
  allquestions:QuestionModel[] = []
  @Input() set qp(val: QuestionPaper|any){
    this.qpId = val.id;
    this.qpForm = new FormGroup({
      title: new FormControl(val.title),
      description: new FormControl(val.description)
    })
  }
  constructor(
    private authApiService: AuthService,
  ) { }

  categories = Array();

  selected = [
    {id: 5, name: 'Angular'},
    {id: 6, name: 'Vue'}
  ];

  getSelectedValue(){
    console.log(this.selected);
  }
  ngOnInit(): void {
    this.authApiService.getUserDetails().subscribe(
      (result: UserObj)=>{

          this.user_obj = result


      },
      error => console.log(error)
    )
    setTimeout(() => {
    this.subject_id=this.user_obj.subject_id},
    500)
    this.authApiService.getSubjectWiseQuestions({'subject': this.subject_id}).subscribe(
      (result:QuestionModel[]) => {
        this.allquestions = result
      }
    )
    // setTimeout(() => {
    //   for (let i=0; i< this.allquestions.length; i++){
    //     var dict = {key: this.allquestions[i].id, value: this.allquestions[i].question}
    //     this.categories.push({key: this.allquestions[i].id, value: this.allquestions[i].question})
    //   }
    //   console.log(this.categories)

    // },
    // 400)


    // for (let i=0; i<length())
    if (this.qpId){
      console.log(this.qp)
    }
  }

  saveFormFunc(){
    if (this.qpId){
      this.qpEdit.emit({'id': this.qpId, 'title': this.qpForm.value.title,
    'description': this.qpForm.value.description})
    }
    else{
      this.qpNew.emit(this.qpForm.value)
    }
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
}
