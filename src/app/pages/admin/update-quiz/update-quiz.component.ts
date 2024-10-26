import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizzServiceService } from '../../../services/quizz-service.service';
import { mt } from '../../../../MatModule';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryserviceService } from '../../../services/categoryservice.service';
import Swal from 'sweetalert2';
import { Quiz } from '../../../Models/quiz';
import { Category } from '../../../Models/category';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-update-quiz',
  standalone: true,
  imports: [...mt, ReactiveFormsModule],
  templateUrl: './update-quiz.component.html',
  styleUrl: './update-quiz.component.css'
})
export class UpdateQuizComponent implements OnInit{
qId='';
quiz:FormGroup;
Categories:any;
constructor(private catSer: CategoryserviceService, private quizSer: QuizzServiceService, private router:ActivatedRoute, private rout: Router, private ngx: NgxUiLoaderService){
  this.quiz = new FormGroup({
   title: new FormControl('', [Validators.required]),
   description: new FormControl('', [Validators.required]),
   maxMarks: new FormControl('', [Validators.required]),
   numberOfQuestions: new FormControl('', [Validators.required]),
   active: new FormControl(false),
   category: new FormGroup({  // Change here to FormGroup
    cid: new FormControl('', [Validators.required]) // Adjusted to include the cid
  })
  })
} 
ngOnInit(): void {
  this.ngx.start();
  this.catSer.getCategories().subscribe((Cat:Category[])=>{
    this.ngx.stop();
    this.Categories = Cat;
  }, er=>{
    console.log(er);
    this.ngx.stop();
  })
this.qId = this.router.snapshot.params['quizId'];
this.ngx.start();
this.quizSer.getQuiz(this.qId).subscribe((q:Quiz)=>{
  this.ngx.stop();
  this.quiz.patchValue(q)
})
}
send(){
  let data = this.quiz.value;
  //set original quizId to make update otherwise it will add
  data.quizId=this.qId;
  this.ngx.start();
  this.quizSer.updateQuiz(data).subscribe((d)=>{
    this.ngx.stop();
    Swal.fire("Success","Updated Succesfully!", "success");
    this.quiz.reset();
    this.rout.navigate(['/admin/quizzes'])
  }, e=>{
    Swal.fire("Error!!","Something went wrong!","error");
    console.log(e);
    this.ngx.stop();
  })
}
}
