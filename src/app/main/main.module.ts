import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { Routes, RouterModule } from '@angular/router';
import { QuesionPapersComponent } from './quesion-papers/quesion-papers.component';
import { QuesionPaperComponent } from './quesion-paper/quesion-paper.component';
import { QuesionPaperFormComponent } from './quesion-paper-form/quesion-paper-form.component';

const routes: Routes = [
  {path: 'main', component: MainComponent}

]

@NgModule({
  declarations: [
    MainComponent,
    QuesionPapersComponent,
    QuesionPaperComponent,
    QuesionPaperFormComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class MainModule { }
