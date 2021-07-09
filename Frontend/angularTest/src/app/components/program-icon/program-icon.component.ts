import { Component, Inject, Input, OnInit } from '@angular/core';
import { TaskManagerService } from 'src/app/services/task-manager.service';
import { Task } from 'src/app/models/entities/task.entity';

@Component({
  selector: 'app-program-icon',
  templateUrl: './program-icon.component.html',
  styleUrls: ['./program-icon.component.scss']
})
export class ProgramIconComponent implements OnInit {

  @Input()
  public task!: Task;

  public colorIcon: string;
  
  constructor(
    public taskManager: TaskManagerService,
  ) {
    this.colorIcon = '';
  }

  ngOnInit(): void {
    this.colorIcon =  this.task.program.colorIcon;
  }

  public click() {
    this.taskManager.normalize(this.task.idTask);
  }

}
