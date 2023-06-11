import { Component, OnInit } from '@angular/core';
import { StatusService } from '../../services/status/status.service';
import { Status } from '../../api/status';
import { ProjectService } from '../../services/project/project.service';
import { Project } from '../../api/project';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css'],
})
export class StatusComponent implements OnInit {
  status: Status;
  form: any = {
    name: null,
  };
  projects: Project[] = [];
  statuses: Status[] = [];
  project: Project;
  constructor(
    private statusService: StatusService,
  ) {}

  createStatus() {
    this.status = this.form;
    console.log(this.status);
    this.statusService.createStatus(this.status).subscribe(data => {
      console.log(data);
    });
  }

  ngOnInit(): void {}

  deleteStatus() {
    this.statusService.deleteStatus(this.status).subscribe((response: any) => {
      console.log('response: ', response);
    });
  }

  updateStatus() {
    this.statusService.updateStatus(this.status).subscribe(response => {
      this.status = response;
    });
  }
}
