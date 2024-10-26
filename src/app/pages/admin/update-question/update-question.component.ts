import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { mt } from '../../../../MatModule';
import { QuestionServiceService } from '../../../services/question-service.service';
import Swal from 'sweetalert2';
import { AngularEditorConfig ,AngularEditorModule} from '@kolkov/angular-editor';
import { Quiz } from '../../../Models/quiz';
import { Question } from '../../../Models/Question';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-update-question',
  standalone: true,
  imports: [ReactiveFormsModule,...mt,AngularEditorModule],
  templateUrl: './update-question.component.html',
  styleUrl: './update-question.component.css'
})
export class UpdateQuestionComponent implements OnInit{
question:FormGroup;
constructor(private router: ActivatedRoute, private fb:FormBuilder, private qSer:QuestionServiceService, private rt:Router, private ngx: NgxUiLoaderService){
  this.question= new FormGroup({
    content:fb.control('', [Validators.required]),
    option1:fb.control('', [Validators.required]),
    option2:fb.control('', [Validators.required]),
    option3:fb.control('', [Validators.required]),
    option4:fb.control('', [Validators.required]),
    answer:fb.control('',[Validators.required])
  })
}

getOptions(): string[] {
  return [
    this.question.get('option1')?.value,
    this.question.get('option2')?.value,
    this.question.get('option3')?.value,
    this.question.get('option4')?.value,
  ].filter(option => option); // If option is empty then func
}
quesId='';
title='';
quiz:Quiz = {} as Quiz;
ngOnInit(): void {
    this.quesId=this.router.snapshot.params["quesId"];
    this.title = this.router.snapshot.params["title"];
    this.ngx.start();
    this.qSer.getQuestionById(this.quesId).subscribe((q:Question)=>{
      this.ngx.stop();
      this.quiz = q.quiz;

      //!I have modified InnerHTM in db to show good using text editor. Extract only text.
      q.content=this.parseHTML(q.content);
      this.question.patchValue(q);
      
    }, er=>{
      Swal.fire("Error!","Something went wrong!!","error");
    })
}

send(){
  let quiz = this.quiz;
  let quesId = this.quesId;
  let formData={...this.question.value,quiz,quesId};
  this.ngx.start();
  this.qSer.updateQuestion(formData).subscribe((d)=>{
    this.ngx.stop()
    Swal.fire("Succcess","Question updated!!","success");
    this.question.reset();
    this.rt.navigate(['/admin/questions/'+quiz.quizId+'/'+this.title])
  },er=>{
    Swal.fire("Error!","Something went wrong","error");

  })
}


//! Converting raw html to plain text to send value in form input value
parseHTML(content:string){
    //*content </b>Omair</b>
   let temp =document.createElement('div');
   temp.innerHTML = content;
   let text = temp.innerText;   //*Omair
   return text;
}


//Rich text editor


editorConfig: AngularEditorConfig = {
  editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      {class: 'arial', name: 'Arial'},
      {class: 'times-new-roman', name: 'Times New Roman'},
      {class: 'calibri', name: 'Calibri'},
      {class: 'comic-sans-ms', name: 'Comic Sans MS'}
    ],
    customClasses: [
    {
      name: 'quote',
      class: 'quote',
    },
    {
      name: 'redText',
      class: 'redText'
    },
    {
      name: 'titleText',
      class: 'titleText',
      tag: 'h1',
    },
  ],
  
};
}

