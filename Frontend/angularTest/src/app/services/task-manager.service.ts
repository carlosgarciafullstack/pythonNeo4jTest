import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Task } from 'src/app/models/entities/task.entity';
import { WindowComponent } from '../components/window/window.component';
import { ProgramLauncher } from '../models/entities/program-launcher.entity';
import { SystemService } from './system.service';

@Injectable({
  providedIn: 'root'
})
export class TaskManagerService {

  private idTaskCurrent: number;
  public activeTasks: Task[];
  
  constructor(
    public dialog: MatDialog, 
    public systemService: SystemService
  ) {
    this.activeTasks = [];
    this.idTaskCurrent = 0;
  }

  /*
  ************************
  *** Public functions ***
  ************************
  */

  // Programs basic actions

  // Open basic program, add to active task
  public open(program: ProgramLauncher) {
    let dialogRef = this.dialog.open(WindowComponent, {
      data: program,
      panelClass: 'dialogProgram',
      disableClose: true
    });
    dialogRef.componentInstance.idTask = this.idTaskCurrent;


    let task = new Task(this.idTaskCurrent, program, dialogRef);
    this.activeTasks.push(task);
    this.idTaskCurrent++;
  }

  // Open basic program, add to active task
  public openSystemProgram(program: ProgramLauncher) {
    let dialogRef = this.dialog.open(WindowComponent, {
      data: program,
      panelClass: 'dialogSystemProgram',
      disableClose: true,
      hasBackdrop: false
    });
    dialogRef.componentInstance.idTask = this.idTaskCurrent;


    let task = new Task(this.idTaskCurrent, program, dialogRef);
    this.activeTasks.push(task);
    this.idTaskCurrent++;
  }

  public close(idTask: number) {
    const index = this.activeTasks.findIndex(element => element.idTask == idTask);
    if (index > -1) {
      this.activeTasks.splice(index, 1);
    }
  }

  // Programs secondary actions
  public maximize(idTask: number) {
    let task = this.getTask(idTask);
    if(task) {
      this.setAltMaximize(task);
    }
  }

  public minimize(idTask: number) {
    let task = this.getTask(idTask);
    if(task) {
      this.setAltMinimize(task);
    }
  }

  public minimizeAll() {
    this.activeTasks.forEach(element => {
      this.setMinimize(element);
    });
  }

  public normalizeAll(idTask: number) {
    this.activeTasks.forEach(element => {
      if(element.idTask != idTask) {
        this.setNormalize(element);
      }
    });
  }

  public normalize(idTask: number) {
    let task = this.getTask(idTask);
    if(task) {
      if(task.isMinimize) {
        this.setAltMinimize(task);
      } else {
        this.setAltMaximize(task);
      }
    }
  }

  public primary(idTask: number) {
    let task = this.getTask(idTask);
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
      this.normalizeAll(task.idTask);
      task.dialogRef.addPanelClass('maximize');
    } else {
      task.dialogRef.removePanelClass('maximize');
    }
    task.isMaximize = !task.isMaximize;
    window.dispatchEvent(new Event('resize2'));
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
    window.dispatchEvent(new Event('resize2'));
  }

  private getTask(idTask: number) : Task | undefined {
    return this.activeTasks.find(element => element.idTask == idTask);
  }
}
