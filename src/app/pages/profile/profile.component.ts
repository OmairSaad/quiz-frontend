import { Component } from '@angular/core';
import { mt } from '../../../MatModule';
import { NgIf } from '@angular/common';
import { ApiserviceService } from '../../services/apiservice.service';
import { userCreateType } from '../../Models/CreateUser';
import Swal from 'sweetalert2';
import { NgxUiLoaderService } from 'ngx-ui-loader';

// Add more users if needed

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [...mt, NgIf],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  
  constructor(public ser:ApiserviceService, private ngx: NgxUiLoaderService){}
  displayedColumns: string[] = ['label', 'value'];


  public dataSource:any;
  public name:string='';
  ngOnInit(): void {
    this.ngx.start();
    this.ser.getCurrentUser().subscribe((CURRENT_USER:userCreateType)=>{
      this.ngx.stop()
      this.name = `${CURRENT_USER.firstname} ${CURRENT_USER.lastname}`
      this.dataSource = [
        {
          label: "Username", value: CURRENT_USER.username,
        },
        {
          label: "Email", value: CURRENT_USER.email,
        },
        {
          label: "Phone", value: CURRENT_USER.phone,
        },
        
  
      ];
    }, er=>{
      Swal.fire("Error!", "Error in loading data","error")
    })
  }
}
