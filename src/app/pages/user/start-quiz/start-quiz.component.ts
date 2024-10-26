import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionServiceService } from '../../../services/question-service.service';
import { mt } from '../../../../MatModule';
import { FormsModule } from '@angular/forms';
import { DatePipe, LocationStrategy, NgFor, PlatformLocation } from '@angular/common';
import Swal from 'sweetalert2';
import { Quiz } from '../../../Models/quiz';
import { QuizzServiceService } from '../../../services/quizz-service.service';
import { Question } from '../../../Models/Question';
import { EvaluateAnswer } from '../../../Models/evaluatedAnswer';
import { LoginService } from '../../../services/login.service';
import { AttemptService } from '../../../services/attempt.service';
import { ApiserviceService } from '../../../services/apiservice.service';

@Component({
  selector: 'app-start-quiz',
  standalone: true,
  imports: [...mt, FormsModule,NgFor,DatePipe],
  templateUrl: './start-quiz.component.html',
  styleUrl: './start-quiz.component.css',
  providers:[DatePipe]
})
export class StartQuizComponent implements OnInit {
constructor(private router: ActivatedRoute, private queSer: QuestionServiceService, private quizSer: QuizzServiceService,public loginser:LoginService, private datePipe:DatePipe,private attSer:AttemptService,private apiSer:ApiserviceService){}
quizId='';
quiz:Quiz= {} as Quiz;
questions:Question[]=[];
totaltime=65;
mintue=0;
second=0;
hour=0;
title='';
elapsed=0;
progressvalue=0;
isSubmitted:boolean = false;
evaluatedResult:EvaluateAnswer={} as EvaluateAnswer;
totlaMarks =0;
user:any;
ngOnInit(): void {
    this.quizId = this.router.snapshot.params["quizId"];
    console.log(this.quizId);
    this.loadQuestions();
    this.loadQuiz();
    let temp =setInterval(() => {
      this.updateTimer();
      if(this.elapsed>=this.totaltime){
        clearInterval(temp);
        //save automatically answers
        this.evlAndSave();
      } 
    }, 1000);
   
    //to save result with ref
    this.loadUser();
}
loadQuestions(){
  this.queSer.getQuestionsOfParticullarQuizForUser(this.quizId).subscribe((q:Question[])=>{
    this.questions=q;
  },er=>{
    Swal.fire("Error!","Error in loading questions","error");
    console.log(er);
  })
}
loadQuiz(){
  this.quizSer.getQuiz(this.quizId).subscribe((q:Quiz)=>{
    this.quiz=q;
    this.title = this.quiz.title;
    this.totaltime = this.quiz.numberOfQuestions*2*60;
  },er=>{
    Swal.fire("Error!","Something went wrong","error");
    console.log(er);
  })
}

send(){
  Swal.fire({
    icon:'question',
    showCancelButton:true,
    title:'Are you sure?'
  }).then((res)=>{
    //Evaluate answers and save in db.
    if(res.isConfirmed){
      this.evlAndSave();
    }
  })
}
updateTimer(){
  this.elapsed++;
  const reminTiming = this.totaltime - this.elapsed;
  this.hour = Math.floor(reminTiming/3600);
  this.mintue = Math.floor((reminTiming%3600)/60);
  this.second = reminTiming%60;
  this.progressvalue = this.elapsed/this.totaltime *100;
}

//Format Date
formatDate(date: Date): string {
  const dateObj = new Date(date); // Convert to Date object
  return this.datePipe.transform(dateObj, 'MMMM d, y, h:mm a') || ''; // Use DatePipe to format
}

loadUser(){
  let username = this.loginser.getUser();
  this.apiSer.getCurrentUser().subscribe(user=>{
     this.user = user;
  },er=>{
    Swal.fire("Error!","Something went wrong","error");
    console.log(er);
  })
}
 //Evaluating correct answers and saving in db
 evlAndSave(){
  this.queSer.EvaluateAnswer(this.questions).subscribe((evl:EvaluateAnswer)=>{
    this.isSubmitted=true;
    this.evaluatedResult = evl;
    this.totlaMarks = (this.quiz.maxMarks/this.quiz.numberOfQuestions)*evl.correctAnswer;
  
    //Add this details in 
    const totalMarks = this.totlaMarks;
    const quiz = this.quiz;
    const user = this.user;
    const attemptBy = this.loginser.getUser();
    const result = {...evl,totalMarks,quiz,user,attemptBy}
    this.attSer.saveResults(result).subscribe((res)=>{
      console.log(res);
      
    },er=>{
      Swal.fire("Error!","Something went wrong","error");
    console.log(er);
    })
  
   },er=>{
    Swal.fire("Error!","Something went wrong","error");
    console.log(er);
   })
 }
}
