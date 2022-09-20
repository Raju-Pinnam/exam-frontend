import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { Routes, RouterModule } from '@angular/router';
import { QuesionPapersComponent } from './quesion-papers/quesion-papers.component';
import { QuesionPaperComponent } from './quesion-paper/quesion-paper.component';
import { QuesionPaperFormComponent } from './quesion-paper-form/quesion-paper-form.component';
import { HeaderComponent } from '../header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgSelectModule } from '@ng-select/ng-select';
import { QuestionCreationComponent } from '../question-creation/question-creation.component';
import { SubjectFormComponent } from '../subject-form/subject-form.component';

const routes: Routes = [
  {path: 'main', component: MainComponent}

]

@NgModule({
  declarations: [
    MainComponent,
    QuesionPapersComponent,
    QuesionPaperComponent,
    QuesionPaperFormComponent,
    HeaderComponent,
    QuestionCreationComponent,
    SubjectFormComponent
  ],
  imports: [
    NgMultiSelectDropDownModule.forRoot(),
    CommonModule,
    NgSelectModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class MainModule { }
