import { Component, inject } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { Subject } from 'rxjs';
import { mt } from '../../../../MatModule';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink,...mt],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

}
