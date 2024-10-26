import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiserviceService } from '../../../services/apiservice.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cange-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './cange-password.component.html',
  styleUrl: './cange-password.component.css'
})
export class CangePasswordComponent {
  changePassword:FormGroup;
  constructor(private fb:FormBuilder, private ser:ApiserviceService, private router:Router){
   this.changePassword= fb.group({
    "oldPassword":fb.control('',[Validators.required]),
    "newPassword":fb.control('',[Validators.required]),
    "repeatPassword":fb.control('', [Validators.required])
   },{validators: this.passwordMatchValidator})
  }
 
  get f(){
    return this.changePassword.controls;
  }

  send(){
    this.ser.changePassword(this.changePassword.value).subscribe({
      next:(res:any)=>{
        Swal.fire('Success','Password Changed Successfully','success');
        this.router.navigate(['/user-dashboard/all']);
        this.changePassword.reset();
      },
      error:(er)=>{
        Swal.fire('Error','Old Password not matched','error');
        console.log(er);
      }
    })
    
  }
  passwordMatchValidator(formGroup:FormGroup){
    const password = formGroup.get('newPassword')?.value;
    const confirmPassword = formGroup.get('repeatPassword')?.value;

    if (password !== confirmPassword) {
        formGroup.get('repeatPassword')?.setErrors({ passwordMisMatch:true });
    } else {
        formGroup.get('repeatPassword')?.setErrors(null);  // Clear the error if they match
    }

  }
}
