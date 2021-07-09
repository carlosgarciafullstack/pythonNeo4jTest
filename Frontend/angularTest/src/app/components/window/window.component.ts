import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProgramLauncher } from 'src/app/models/entities/program-launcher.entity';
import { TaskManagerService } from 'src/app/services/task-manager.service';

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.scss']
})
export class WindowComponent implements OnInit {

  public program: ProgramLauncher;
  public colorIcon: string;
  public idTask: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ProgramLauncher,
    public taskManager: TaskManagerService, 
    public router: Router
  ) {
    this.program = this.data;
    this.colorIcon = this.program.colorIcon;
    this.idTask = 0;
  }

  ngOnInit(): void {
    this.router.navigate([{ outlets: { routerOS: this.program.programRoute} }]);
  }

  public maximize() {
    this.taskManager.maximize(this.idTask);
  }

  public minimize() {
    this.taskManager.minimize(this.idTask);
  }

  public close() {
    this.taskManager.close(this.idTask);
  }

  public windowClick() {
    this.taskManager.primary(this.idTask);
  }

}
