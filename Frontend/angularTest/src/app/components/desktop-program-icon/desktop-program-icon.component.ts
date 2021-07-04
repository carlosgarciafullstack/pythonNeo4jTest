import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Task } from 'src/app/models/entities/task.entity';
import { TaskManagerProvider } from 'src/app/providers/task-manager.provider';
import { WindowComponent } from '../window/window.component';

@Component({
  selector: 'app-desktop-program-icon',
  templateUrl: './desktop-program-icon.component.html',
  styleUrls: ['./desktop-program-icon.component.scss']
})
export class DesktopProgramIconComponent implements OnInit {

  @Input() program: Task;
  
  constructor(
    public taskManager: TaskManagerProvider, 
    public dialog: MatDialog
  ) {
    this.program = new Task();
  }

  ngOnInit(): void {}

  public click(data: any) {
    if(data.detail == 2) {
      this.openDialog();
    }
  }

  public openDialog() {
    let a = this.dialog.open(WindowComponent, {
      data: this.program,
      panelClass: 'dialogProgram',
      disableClose: true
    });
    this.taskManager.open(this.program, a);
  }
  
}
