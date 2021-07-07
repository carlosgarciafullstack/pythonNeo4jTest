import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Program } from 'src/app/models/entities/program.entity';
import { TaskManagerService } from 'src/app/services/task-manager.service';

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.scss']
})
export class WindowComponent implements OnInit {

  public program: Program;
  public colorIcon: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Program,
    public taskManager: TaskManagerService, 
    public router: Router
  ) {
    this.program = JSON.parse(JSON.stringify(this.data));
    this.colorIcon = this.program.colorIcon;
  }

  ngOnInit(): void {
    this.router.navigate([{outlets: {sidebar: this.data.programRoute}}]);
  }

  public maximize() {
    this.taskManager.maximize(this.program);
  }

  public minimize() {
    this.taskManager.minimize(this.program);
  }

  public close() {
    this.taskManager.close(this.program);
  }

  public windowClick() {
    this.taskManager.primary(this.program);
  }

}
