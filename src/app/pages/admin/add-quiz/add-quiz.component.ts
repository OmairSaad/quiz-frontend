import { Component, OnInit, signal } from '@angular/core';
import { mt } from '../../../../MatModule';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryserviceService } from '../../../services/categoryservice.service';
import { QuizzServiceService } from '../../../services/quizz-service.service';
import Swal from 'sweetalert2';
import { Category } from '../../../Models/category';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-add-quiz',
  standalone: true,
  imports: [...mt, FormsModule, ReactiveFormsModule],
  templateUrl: './add-quiz.component.html',
  styleUrl: './add-quiz.component.css'
})
export class AddQuizComponent implements OnInit{

  quiz:any;
 constructor(private catSer: CategoryserviceService, private quizSer: QuizzServiceService,private ngx: NgxUiLoaderService){
   this.quiz = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    maxMarks: new FormControl('', [Validators.required]),
    numberOfQuestions: new FormControl('', [Validators.required]),
    active: new FormControl(true),
    category: new FormGroup({
      cid: new FormControl('', [Validators.required])
    })
   })
 }

  
  Categories:Category[]=[];
  ngOnInit(): void {
    this.ngx.start();
    this.catSer.getCategories().subscribe((categories:Category[])=>{
      this.ngx.stop();
      this.Categories = categories;
      console.log(this.Categories);
    }, er=>{
      console.log(er);
      
    })
  }

  send(){
    let temp =this.quiz.value;
    console.log(temp);
    this.ngx.start();
    this.quizSer.addQuiz(temp).subscribe((data:any)=>{
      this.ngx.stop();
      Swal.fire("Success", "Quizz added successfully!!", 'success');
      this.quiz.reset();
    }, e=>{
      Swal.fire("Error!!","Something went wrong!!", "error");
      console.log(e);
    })
  }
}
