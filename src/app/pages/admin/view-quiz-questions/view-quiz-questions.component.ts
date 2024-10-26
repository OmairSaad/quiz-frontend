import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { mt } from '../../../../MatModule';
import { NgIf, TitleCasePipe, ViewportScroller } from '@angular/common';
import { QuestionServiceService } from '../../../services/question-service.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-view-quiz-questions',
  standalone: true,
  imports: [...mt, NgIf,RouterLink, TitleCasePipe],
  templateUrl: './view-quiz-questions.component.html',
  styleUrl: './view-quiz-questions.component.css'
})
export class ViewQuizQuestionsComponent implements OnInit {
constructor(private router: ActivatedRoute, private queSer: QuestionServiceService, private viewPortScroller: ViewportScroller, private ngx: NgxUiLoaderService){}
questions:any;
title='';
quizId='';
isLastPage:boolean=false;
currentPageNumber=0;
totalPages=0;
ngOnInit(): void {
    this.quizId =this.router.snapshot.params["quizId"];
    this.title = this.router.snapshot.params["title"];
    this.loadQuestions(this.quizId,this.currentPageNumber);
}
loadQuestions(qid:any,cpage:any){
    this.scrollToTop();
    //Getting question from quizId
    this.ngx.start();
    this.queSer.getQuizQuestions(qid,cpage).subscribe((q:any)=>{
      //q {lastpage,pagenumber,questions}
      this.ngx.stop();
      console.log(q);
      
      this.questions = q.questions;
      this.isLastPage=q.lastPage;
      this.currentPageNumber = q.pageNumber;
      this.totalPages=q.totalpages;
    }, err=>{
       Swal.fire("Error!", "Error in loading questions", "error");
       console.log(err);
       this.ngx.stop();
    })
}

next(){
this.currentPageNumber++;
this.loadQuestions(this.quizId,this.currentPageNumber);
}

pre(){
this.currentPageNumber--;
this.loadQuestions(this.quizId,this.currentPageNumber);
}

scrollToTop() {
  this.viewPortScroller.scrollToPosition([0,118]);
}



del(quesId:string){

Swal.fire({
  icon:'question',
  showCancelButton:true,
  confirmButtonText:"Delete",
  title:"Are you sure?",
  confirmButtonColor:"red"
}).then(res=>{
  if(res.isConfirmed){
    this.ngx.start();
this.queSer.deleteQues(quesId).subscribe((data)=>{
  this.ngx.stop();
  console.log(this.questions);
  
  // If after deletion, the current page has no questions, move to the previous page
  if (this.questions.length === 1 && this.currentPageNumber > 0) {
    //this means question length1 had only one question and now it has deleted, reload page and move back
    this.currentPageNumber--; // Go back to previous page
  }

  this.loadQuestions(this.quizId,this.currentPageNumber);
  Swal.fire("Success","Question deleted!!","success")
},er=>{
  Swal.fire("Error!!","Something went wrong!!","error")
})
  }
})

}
}
