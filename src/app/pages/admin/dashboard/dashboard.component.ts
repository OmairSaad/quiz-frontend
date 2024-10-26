import { Component, inject, OnInit } from '@angular/core';
import { ProfileComponent } from '../../profile/profile.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { LoginService } from '../../../services/login.service';
import { mt } from '../../../../MatModule';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ProfileComponent, SidebarComponent,CommonModule,RouterOutlet, ...mt],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  
}
