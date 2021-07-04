import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { Task } from 'src/app/models/entities/task.entity';
import { TaskManagerService } from 'src/app/services/task-manager.service';

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.scss']
})
export class WindowComponent implements OnInit {

  public program: Task;
  public dialogRef: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Task,
    public taskManager: TaskManagerService, 
  ) {
    this.program = new Task();
  }

  ngOnInit(): void {
    this.program = this.data;
    this.dialogRef = this.data.dialogRef;
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
