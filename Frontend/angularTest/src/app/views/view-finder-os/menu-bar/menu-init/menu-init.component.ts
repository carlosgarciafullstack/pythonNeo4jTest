import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { WindowComponent } from 'src/app/components/window/window.component';
import { Program } from 'src/app/models/entities/program.entity';
import { SystemDataProvider } from 'src/app/providers/system-data.provider';
import { TaskManagerService } from 'src/app/services/task-manager.service';

@Component({
  selector: 'app-menu-init',
  templateUrl: './menu-init.component.html',
  styleUrls: ['./menu-init.component.scss']
})
export class MenuInitComponent implements OnInit, OnDestroy {
  
  public programs: Program[];
  public fillColor: string;
  public isLoaded: boolean;

  private systemProviderSubscription: Subscription;

  constructor(
    private systemProvider: SystemDataProvider,
  ) { 
    this.programs = [];
    this.fillColor = '#fff';
    this.systemProviderSubscription = new Subscription();
    this.isLoaded = false;
  }

  ngOnInit(): void {
    this.loadProgramData();
  }

  public loadProgramData() {
    this.systemProviderSubscription =  this.systemProvider.loadPrograms().subscribe(
      (response) => {
        this.programs = response.programs;
        this.isLoaded = true;
        console.log('loadProgramData request successful', response);
      },
      (error) => {
        console.error('loadProgramData request fail', error);
      }
    );
  }

  ngOnDestroy(): void {
    this.systemProviderSubscription.unsubscribe();
  }
}
