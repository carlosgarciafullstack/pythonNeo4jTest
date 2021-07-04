import { Component, Inject, Input, OnInit } from '@angular/core';
import { TaskManagerService } from 'src/app/services/task-manager.service';
import { Task } from 'src/app/models/entities/task.entity';

@Component({
  selector: 'app-program-icon',
  templateUrl: './program-icon.component.html',
  styleUrls: ['./program-icon.component.scss']
})
export class ProgramIconComponent implements OnInit {

  @Input() program: Task;
  
  constructor(
    public taskManager: TaskManagerService,
  ) {
    this.program = new Task();
  }

  ngOnInit(): void {}

  public click() {
    this.taskManager.normalize(this.program);
  }

}
