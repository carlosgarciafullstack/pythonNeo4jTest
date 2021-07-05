import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Program } from 'src/app/models/entities/program.entity';
import { Task } from 'src/app/models/entities/task.entity';
import { TaskManagerService } from 'src/app/services/task-manager.service';

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.scss']
})
export class WindowComponent implements OnInit {

  public program: Program;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Program,
    public taskManager: TaskManagerService, 
  ) {
    this.program = JSON.parse(JSON.stringify(this.data));
  }

  ngOnInit(): void {}

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
