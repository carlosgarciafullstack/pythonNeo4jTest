import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Program } from 'src/app/models/entities/program.entity';
import { TaskManagerService } from 'src/app/services/task-manager.service';

@Component({
  selector: 'app-init-menu-items',
  templateUrl: './init-menu-items.component.html',
  styleUrls: ['./init-menu-items.component.scss']
})
export class InitMenuItemsComponent implements OnInit {

  @Input() programs: Program[];
  
  constructor(
    public taskManager: TaskManagerService, 
    public dialog: MatDialog
  ) {
    this.programs = [];
  }

  ngOnInit(): void {}

  public click(event: any, program: Program) {
    if(event.detail == 1) {
      this.taskManager.open(program);
    }
  }

}
