import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { attemptResult } from '../../../Models/AttemptResult';
import { mt } from '../../../../MatModule';
import { AttemptService } from '../../../services/attempt.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-show-attempted-quiz',
  standalone: true,
  imports: [...mt,DatePipe],
  templateUrl: './show-attempted-quiz.component.html',
  styleUrl: './show-attempted-quiz.component.css',
  providers:[DatePipe]
})
export class ShowAttemptedQuizComponent implements OnInit{
constructor(private router: ActivatedRoute, private attemptSer:AttemptService, private datePipe:DatePipe){}
attemptId='';
result:attemptResult = {} as attemptResult;
ngOnInit(): void {
  this.attemptId = this.router.snapshot.params["attemptId"];
  this.loadResult();
}
loadResult(){
this.attemptSer.getAttemptById(this.attemptId).subscribe((data:attemptResult)=>{
  this.result = data;
},er=>{
  Swal.fire("Error!","Error in loading result!","error");
  console.log(er);
})
}

//Format Date
formatDate(date: Date): string {
  const dateObj = new Date(date); // Convert to Date object
  return this.datePipe.transform(dateObj, 'MMMM d, y, h:mm a') || ''; // Use DatePipe to format
}
}
