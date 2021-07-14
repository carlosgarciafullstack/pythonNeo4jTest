import { Injectable } from "@angular/core";
import { ProgramLauncher } from "../models/entities/program-launcher.entity";
import { SystemDataProvider } from "../providers/system-data.provider";

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  //List of programs that can be executed in the system at the moment.
  public availablePrograms: ProgramLauncher[];
  //List of system programs that are currently activated.
  public activedSystemPrograms: ProgramLauncher[];
  //List of system programs that are currently activated.
  public activedSystemStatusPrograms: ProgramLauncher[];
  //List of user programs available on the init menu.
  public activedInitPrograms: ProgramLauncher[];
  //List of user programs available on the desktop.
  public activedDesktopPrograms: ProgramLauncher[];

  public isLoaded : boolean;

  constructor(
    private systemProvider: SystemDataProvider
    ) {
    this.availablePrograms = [];
    this.activedSystemPrograms = [];
    this.activedSystemStatusPrograms = [new ProgramLauncher(20, '', 'volume_up', '','S')];
    this.activedInitPrograms = [];
    this.activedDesktopPrograms = [];
    this.isLoaded = false;
    this.loadAvailablePrograms();
  }

  private loadAvailablePrograms() {
    console.log('LOADING ON');
    let subscription = this.systemProvider.loadPrograms().subscribe(
      (response) => {
        this.activedInitPrograms = response.programs;
        this.activedDesktopPrograms = response.programs;
        this.isLoaded = true;
        console.log('loadProgramData request successful', response);
      },
      (error) => {
        console.error('loadProgramData request fail', error);
      },
      () => {
        console.log('LOADING OFF');
        subscription.unsubscribe();
      }
    );
  }

}