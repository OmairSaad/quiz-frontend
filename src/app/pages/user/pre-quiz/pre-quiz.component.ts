import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Quiz } from '../../../Models/quiz';
import { QuizzServiceService } from '../../../services/quizz-service.service';
import Swal from 'sweetalert2';
import { mt } from '../../../../MatModule';

@Component({
  selector: 'app-pre-quiz',
  standalone: true,
  imports: [...mt, RouterLink],
  templateUrl: './pre-quiz.component.html',
  styleUrl: './pre-quiz.component.css'
})
export class PreQuizComponent implements OnInit {
quizId='';
quiz:Quiz = {} as Quiz;
constructor(private router: ActivatedRoute, private quizSer: QuizzServiceService, private rout:Router){}
ngOnInit(): void {
    this.quizId = this.router.snapshot.params["quizId"];
    this.quizSer.getQuiz(this.quizId).subscribe((q:Quiz)=>{
      this.quiz = q;
      console.log(this.quiz);
      
    },er=>{
      Swal.fire("Error","Error in loading quiz","error");
    })
}
startQuiz(){
  Swal.fire({
    showCancelButton:true,
    confirmButtonText:"Start",
    title:"Are you ready?",
    icon:"info"
  }).then(res=>{
    if(res.isConfirmed){
      this.rout.navigate([`/start-quiz/${this.quizId}`])
    }
  })
}
}
