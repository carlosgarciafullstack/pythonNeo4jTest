import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Task } from 'src/app/models/entities/task.entity';
import { WindowComponent } from '../components/window/window.component';
import { MainProgram } from '../models/entities/main-program.entity';
import { Program } from '../models/entities/program.entity';

@Injectable({
  providedIn: 'root'
})
export class TaskManagerService {

  private idTaskCurrent: number;
  public activeTasks: Task[];
  public mainPrograms: MainProgram[];
  

  constructor(public dialog: MatDialog) {
    this.activeTasks = [];
    this.mainPrograms = [{
      idProgram: 20,
      title: '',
      iconName: 'home'
    }];
    this.idTaskCurrent = 0;
  }

  /*
  ************************
  *** Public functions ***
  ************************
  */

  // Programs basic actions
  public open(program: Program) {
    
    program.idTask = this.idTaskCurrent;

    let dialogRef = this.dialog.open(WindowComponent, {
      data: program,
      panelClass: 'dialogProgram',
      disableClose: true
    });
    
    let task = new Task(program, dialogRef);
    this.activeTasks.push(task);
    this.idTaskCurrent++;
  }

  public close(task: Program) {
    const index = this.activeTasks.findIndex(element => element.idTask == task.idTask);
    if (index > -1) {
      this.activeTasks.splice(index, 1);
    }
  }

  // Programs secondary actions
  public maximize(importTask: Program) {
    let task = this.getTask(importTask);
    if(task) {
      this.setAltMaximize(task);
    }
  }

  public minimize(importTask: Program) {
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
      if(element.idTask != task.idTask) {
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

  public primary(importTask: Program) {
    let task = this.getTask(importTask);
    if(task) {
      this.setPrimary(task);
    }
  }


  /*
  *************************
  *** Private functions ***
  *************************
  */
  private setPrimary(task: Task) {
    this.activeTasks.forEach(element => {
      if(element.idTask == task.idTask) {
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

  private getTask(task: Program) : Task | undefined {
    return this.activeTasks.find(element => element.idTask == task.idTask);
  }
}
