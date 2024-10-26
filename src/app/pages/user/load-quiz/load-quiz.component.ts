import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { QuizzServiceService } from '../../../services/quizz-service.service';
import { mt } from '../../../../MatModule';
import Swal from 'sweetalert2';
import { NgIf } from '@angular/common';
import { Quiz } from '../../../Models/quiz';

@Component({
  selector: 'app-load-quiz',
  standalone: true,
  imports: [...mt, NgIf, RouterLink],
  templateUrl: './load-quiz.component.html',
  styleUrl: './load-quiz.component.css'
})
export class LoadQuizComponent implements OnInit{
catId='';
quizzes:Quiz[]=[];
constructor(private router: ActivatedRoute, private qSer: QuizzServiceService){}
ngOnInit(): void {
  //We are on same component but changing parms so It will not reload page. Subscribe this and If param change it will send.
  this.router.params.subscribe((q:any)=>{
    this.catId = q.catId;
    if(this.catId=="all"){
      this.qSer.getAllActiveQuiz().subscribe((quiz:Quiz[])=>{
        this.quizzes=quiz;
      },er=>{
        Swal.fire("Error!","Something went wrong!","error");
      })
   }else{
    this.qSer.getAllActiveQuizByCategory(this.catId).subscribe((quiz:Quiz[])=>{
      this.quizzes = quiz;
    }, er=>{
      Swal.fire("Error","Something went wrong!!","error")
    })
   }
  
  })
}

}
