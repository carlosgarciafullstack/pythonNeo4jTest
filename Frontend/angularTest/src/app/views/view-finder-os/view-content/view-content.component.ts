import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SystemDataProvider } from 'src/app/providers/system-data.provider';
import { Program } from 'src/app/models/entities/program.entity';

@Component({
  selector: 'app-view-content',
  templateUrl: './view-content.component.html',
  styleUrls: ['./view-content.component.scss']
})
export class ViewContentComponent implements OnInit, OnDestroy {

  public programs: Program[];

  private systemProviderSubscription: Subscription;

  constructor(
    private systemProvider: SystemDataProvider,
  ) { 
    this.programs = [];
    this.systemProviderSubscription = new Subscription();
  }

  ngOnInit(): void {
    this.loadProgramData();
  }

  public loadProgramData() {
    this.systemProviderSubscription =  this.systemProvider.loadPrograms().subscribe(
      (response) => {
        this.programs = response.programs;
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
