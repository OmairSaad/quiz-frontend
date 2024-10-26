import { Component, OnInit } from '@angular/core';
import { AttemptService } from '../../../services/attempt.service';
import Swal from 'sweetalert2';
import { attemptResult } from '../../../Models/AttemptResult';
import { mt } from '../../../../MatModule';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-attempted-quiz',
  standalone: true,
  imports: [...mt,RouterLink,DatePipe],
  templateUrl: './attempted-quiz.component.html',
  styleUrl: './attempted-quiz.component.css',
  providers:[DatePipe]
})
export class AttemptedQuizComponent implements OnInit {
constructor(private attemptSer:AttemptService, private datePipe: DatePipe, private loginSer: LoginService){}
result:attemptResult[]=[];
username='';
ngOnInit(): void {
  this.username = this.loginSer.getUser();
  this.attemptSer.getAttemptedQuiz(this.username).subscribe((res:attemptResult[])=>{
     this.result = res;
  },er=>{
    Swal.fire("Error!","Error in loading result","error")
    console.log(er);
  })
}

//Format Date
formatDate(date: Date): string {
  const dateObj = new Date(date); // Convert to Date object
  return this.datePipe.transform(dateObj, 'MMMM d, y, h:mm a') || ''; // Use DatePipe to format
}

filter(event:Event){
let val = (event.target as HTMLInputElement).value;
if(val=="date"){
    //Load filtered quiz by date
    this.attemptSer.getAttemptedQuizSortBYDate(this.username).subscribe((data:attemptResult[])=>{
      this.result = data;
    })
}else if(val=="maxmarks"){
  this.attemptSer.getAttemptedQuizSortBYMarks(this.username).subscribe((data:attemptResult[])=>{
    this.result = data;
  })
}else{
  this.attemptSer.getAttemptedQuiz(this.username).subscribe((data:attemptResult[])=>{
    this.result = data;
  })
}
}
}
