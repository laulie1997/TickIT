import { Component, Input } from '@angular/core';
import { Status } from 'src/app/api/status';

@Component({
  selector: 'app-status-header',
  templateUrl: './status-header.component.html',
  styleUrls: ['./status-header.component.css']
})
export class StatusHeaderComponent {
  @Input() status: Status;
}
