import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskManagerProvider {

  private activeTasks: Task[];
  constructor() {
    this.activeTasks = [];
  }

}
