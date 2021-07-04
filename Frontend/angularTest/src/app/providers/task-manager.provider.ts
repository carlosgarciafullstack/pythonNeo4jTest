import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Task } from 'src/app/models/entities/task.entity';
import { WindowComponent } from '../components/window/window.component';

@Injectable({
  providedIn: 'root'
})
export class TaskManagerProvider {

  public activeTasks: Task[];

  constructor() {
    this.activeTasks = [];
  }

  public open(task: Task, dialogRef: MatDialogRef<WindowComponent>) {
    task.dialogRef = dialogRef;
    this.activeTasks.push(task);
  }

  public close(task: Task) {
    const index = this.activeTasks.indexOf(task, 0);
    if (index > -1) {
      this.activeTasks.splice(index, 1);
    }
  }
  
  public maximize(importTask: Task) {
    let task = this.getTask(importTask);
    if(task) {
      this.setMaximize(task);
    }
  }

  public minimizeAll(task?: Task) {
    this.activeTasks.forEach(element => {
      if(task == undefined) {
        this.hide(element);
      } else if (element.id != task.id) {
        this.hide(element);
      }
    });
  }

  public hide(importTask: Task) {
    let task = this.getTask(importTask);
    if(task) {
      this.setVisible(task);
    }
  }

  public normalize(importTask: Task) {
    let task = this.getTask(importTask);
    if(task) {
      if(task.isMinimize) {
        this.setVisible(task);
      } else {
        this.setMaximize(task);
      }
    }
  }




  private setMinimize(task: Task) {
    task.dialogRef.removePanelClass('maximize');
    task.isMaximize = false;
  }

  private setMaximize(task: Task) {
    this.minimizeAll(task);
    if(!task.isMaximize) {
      task.dialogRef.addPanelClass('maximize');
    } else {
      task.dialogRef.removePanelClass('maximize');
    }
    task.isMaximize = !task.isMaximize;
  }

  private setVisible(task: Task) {
    if(!task.isMinimize) {
      task.dialogRef.addPanelClass('noVisible');
      task.dialogRef.removePanelClass('maximize');
    } else {
      task.dialogRef.removePanelClass('noVisible');
      task.dialogRef.removePanelClass('maximize');
    }
    task.isMinimize = !task.isMinimize;
  }

  private getTask(task: Task) : Task | undefined {
    return this.activeTasks.find(element => element.id == task.id);
  }
}
