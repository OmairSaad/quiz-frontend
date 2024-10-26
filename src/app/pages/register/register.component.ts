import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiserviceService } from '../../services/apiservice.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { NgxUiLoaderService } from 'ngx-ui-loader';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
regData:any;
constructor(private apiService: ApiserviceService, private route: Router,private ngx: NgxUiLoaderService){
  this.regData = new FormGroup({
   username: new FormControl('', [Validators.required]),
   password: new FormControl('', [Validators.required, Validators.minLength(5)]),
   firstname: new FormControl('', [Validators.required]),
   lastname: new FormControl('', [Validators.required]),
   email: new FormControl('', [Validators.required]),
   phone: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.min(10)])
  })
}
isSubmitting:boolean = false;
save(data:any){
  this.isSubmitting = true;
  console.log(data.value);
  this.ngx.start();
  this.apiService.addUser(data.value).subscribe(e=>{
    this.ngx.stop()
    this.isSubmitting = false;
    Swal.fire('Success','User is registered','success');
    setTimeout(() => {
      this.route.navigate(['/login'])
    }, 2000);
    this.regData.reset();
  }, error=>{
    Swal.fire("Failed",error.error, 'error');
    this.isSubmitting = false;
    console.log(error.error);
  })
}
get f(){
  return this.regData.controls;
}
}
