import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskManagerProvider } from 'src/app/providers/task-manager.provider';
import { WindowComponent } from '../window/window.component';

@Component({
  selector: 'app-program-icon',
  templateUrl: './program-icon.component.html',
  styleUrls: ['./program-icon.component.scss']
})
export class ProgramIconComponent implements OnInit {

  @Input() icon = 'home';
  
  constructor(
    public taskManager: TaskManagerProvider, 
    //public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  public click(data: any) {
    
  }

  /*
  public openDialog() {
    this.dialog.open(WindowComponent, {
      data: {
        animal: 'panda'
      },
      panelClass: 'dialogC',
      disableClose: true
    });
  }
  */
  
  

}
