import { Component } from '@angular/core';
import { mt } from '../../../../MatModule';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { CategoryserviceService } from '../../../services/categoryservice.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-add-categories',
  standalone: true,
  imports: [...mt, FormsModule],
  templateUrl: './add-categories.component.html',
  styleUrl: './add-categories.component.css'
})
export class AddCategoriesComponent {
  constructor(private catSer:CategoryserviceService, private ngx: NgxUiLoaderService){}
category ={
  title:'',
  description:''
}
add(){
  console.log(this.category);
  if(this.category.title==''){
    Swal.fire('Error','Title can not be blank', 'error');
    return;
  }
  this.ngx.start();
  this.catSer.addCategory(this.category).subscribe(()=>{
    this.ngx.stop();
    Swal.fire("Success",'Category added', 'success');
  }, (e:any)=>{
    Swal.fire("Error!!","Something went wrong", 'error')
  })
  this.category.title='';
  this.category.description='';
}
}
