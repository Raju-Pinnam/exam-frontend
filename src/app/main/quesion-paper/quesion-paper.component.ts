import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { timer } from 'rxjs';
import { QuestionPaper } from 'src/app/resources/models/auth.models';

@Component({
  selector: 'app-quesion-paper',
  templateUrl: './quesion-paper.component.html',
  styleUrls: ['./quesion-paper.component.css']
})
export class QuesionPaperComponent implements OnInit {

  @Input() qp: QuestionPaper|any = null
  @Input() userType: string|any = "Setter"
  @Output() sendForSetterApproval = new EventEmitter<QuestionPaper>()
  @Output() ApprovalTypeRequest = new EventEmitter<any>();
  approval: boolean = true
  // test_paper_id, approval, message
  approvalForm = new FormGroup({
    // test_paper_id: new FormControl(),
    message: new FormControl()
  })
  constructor() { }

  async ngOnInit(){
    await timer(3000).toPromise()
    this.userType = localStorage.getItem('user-type')
  }

  sentForSetterApprovalFunc(){
    this.sendForSetterApproval.emit(this.qp)
  }
  qpPaperApprovalFunc(){
    this.ApprovalTypeRequest.emit({approval: this.approval, message: this.approvalForm.value.message, testpaper_id: this.qp.id})
  }
  approvedFunc(): void{
    this.approval = true
  }
  rejectFunc(): void{
    this.approval = false
  }
}
