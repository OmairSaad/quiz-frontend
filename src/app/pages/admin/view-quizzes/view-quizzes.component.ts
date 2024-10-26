import { Component } from '@angular/core';
import { mt } from '../../../../MatModule';
import { QuizzServiceService } from '../../../services/quizz-service.service';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-view-quizzes',
  standalone: true,
  imports: [...mt, RouterLink],
  templateUrl: './view-quizzes.component.html',
  styleUrl: './view-quizzes.component.css'
})
export class ViewQuizzesComponent {
  constructor(private qz: QuizzServiceService, private ngx: NgxUiLoaderService){}
quizzes:any;
ngOnInit(): void {
  this.ngx.start();
this.qz.getAllQuizzes().subscribe((data:any)=>{
  this.ngx.stop();
  this.quizzes = data;
  console.log(this.quizzes);
}, (err)=>{
  this.ngx.stop();
  Swal.fire("Error!!", "Error in loading data", "error")
  console.log(err);
})
}

delQuiz(id:number){
Swal.fire({
  title:'Are you sure?',
  showCancelButton:true,
  confirmButtonText:"Delete",
  icon:'info'
}).then((res)=>{
  if(res.isConfirmed){
this.ngx.start();  
this.qz.delQuiz(id).subscribe((data:any)=>{
  this.ngx.stop();
  Swal.fire('Success','Quiz deleted successfully!!', 'success');
  this.quizzes = this.quizzes.filter((q:any)=>{
    return q.quizId!=id;
  })
}, er=>{
  this.ngx.stop();
  Swal.fire("Error!!","Something went wrong!!", "error")
})
  }
})

}
}
