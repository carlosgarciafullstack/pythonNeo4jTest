import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Task } from 'src/app/models/entities/task.entity';
import { WindowComponent } from '../components/window/window.component';

@Injectable({
  providedIn: 'root'
})
export class TaskManagerService {

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
      this.setAltMaximize(task);
    }
  }

  public minimize(importTask: Task) {
    let task = this.getTask(importTask);
    if(task) {
      this.setAltMinimize(task);
    }
  }


  public minimizeAll() {
    this.activeTasks.forEach(element => {
      this.setMinimize(element);
    });
  }

  public normalizeAll(task: Task) {
    this.activeTasks.forEach(element => {
      if(element.id != task.id) {
        this.setNormalize(element);
      }
    });
  }

  public normalize(importTask: Task) {
    let task = this.getTask(importTask);
    if(task) {
      if(task.isMinimize) {
        this.setAltMinimize(task);
      } else {
        this.setAltMaximize(task);
      }
    }
  }

  public primary(importTask: Task) {
    let task = this.getTask(importTask);
    if(task) {
      this.setPrimary(task);
    }
  }



  private setPrimary(task: Task) {
    this.activeTasks.forEach(element => {
      if(element.id == task.id) {
        element.dialogRef.addPanelClass('primary-window');
      } else {
        element.dialogRef.removePanelClass('primary-window');
      }
    });
  }

  private setAltMaximize(task: Task) {
    if(!task.isMaximize) {
      this.normalizeAll(task);
      task.dialogRef.addPanelClass('maximize');
    } else {
      task.dialogRef.removePanelClass('maximize');
    }
    task.isMaximize = !task.isMaximize;
  }

  private setAltMinimize(task: Task) {
    if(!task.isMinimize) {
      task.dialogRef.addPanelClass('noVisible');
      task.dialogRef.removePanelClass('maximize');
    } else {
      task.dialogRef.removePanelClass('noVisible');
      task.dialogRef.removePanelClass('maximize');
    }
    task.isMinimize = !task.isMinimize;
  }

  private setMinimize(task: Task) {
    task.dialogRef.addPanelClass('noVisible');
    task.isMinimize = true;
  }

  private setNormalize(task: Task) {
    task.dialogRef.removePanelClass('maximize');
    task.isMaximize = false;
  }

  private getTask(task: Task) : Task | undefined {
    return this.activeTasks.find(element => element.id == task.id);
  }
}
