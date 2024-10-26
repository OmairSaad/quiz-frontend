import { Component } from '@angular/core';
import { mt } from '../../../../MatModule';
import { Router, RouterLink } from '@angular/router';
import { CategoryserviceService } from '../../../services/categoryservice.service';
import Swal from 'sweetalert2';
import { Category } from '../../../Models/category';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [...mt,RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
categories:any;
constructor(private catg: CategoryserviceService, private rt:Router){}

ngOnInit(): void {
  this.catg.getCategories().subscribe((Categories:Category[])=>{
    this.categories = Categories;
  }, er=>{
    Swal.fire("Error!","Something went wrong!!","error")
  })
}


}
