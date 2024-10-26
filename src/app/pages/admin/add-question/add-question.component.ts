import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { mt } from '../../../../MatModule';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { QuestionServiceService } from '../../../services/question-service.service';
import Swal from 'sweetalert2';
import { AngularEditorConfig ,AngularEditorModule} from '@kolkov/angular-editor';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-add-question',
  standalone: true,
  imports: [...mt, ReactiveFormsModule,AngularEditorModule],
  templateUrl: './add-question.component.html',
  styleUrl: './add-question.component.css'
})
export class AddQuestionComponent implements OnInit{

 constructor(private router: ActivatedRoute, private fb: FormBuilder, private queSer: QuestionServiceService, private rt:Router, private ngx: NgxUiLoaderService){
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
  quizId='';
  title='';
  question:FormGroup;
ngOnInit(): void {
    this.quizId = this.router.snapshot.params["quizId"];
    this.title = this.router.snapshot.params["title"];
}

send(){
  let quizId =this.quizId;
  const formData = {...this.question.value,quiz:{quizId}}
  console.log(formData);
  this.ngx.start();
  this.queSer.addQuestion(formData).subscribe((data)=>{
    this.ngx.stop();
    Swal.fire("Success","Question is added", "success");
    this.question.reset();
  },er=>{
    console.log((er));
  })
}


//Ritch text editor
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
