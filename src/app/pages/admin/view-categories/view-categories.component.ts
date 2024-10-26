import { Component, OnInit } from '@angular/core';
import { mt } from '../../../../MatModule';
import { NgFor } from '@angular/common';
import { CategoryserviceService } from '../../../services/categoryservice.service';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-view-categories',
  standalone: true,
  imports: [...mt, NgFor, RouterLink],
  templateUrl: './view-categories.component.html',
  styleUrl: './view-categories.component.css'
})
export class ViewCategoriesComponent implements OnInit{       
  constructor(private categSer:CategoryserviceService, private ngx:NgxUiLoaderService){}
Categories:any;

ngOnInit(): void {
  console.log(this.Categories);
  this.ngx.start();
  this.categSer.getCategories().subscribe({
    next:(data:any)=>{
      this.ngx.stop();
      this.Categories = data;
    },
    error:(er)=>{
      this.ngx.stop();
      console.log(er);
      Swal.fire('Error!!','Error in loading data','error');
    }
    
  })
}
}
