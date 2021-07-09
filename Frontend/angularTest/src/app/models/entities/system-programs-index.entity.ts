import { ProgramLauncher } from "./program-launcher.entity";

export class SystemProgramsIndex {

  private systemProgramsIndex: any;

  constructor(programs: ProgramLauncher[]) {
    if (programs != undefined) {
      programs.forEach(program => {

        if (program.type == 'S') {
          this.systemProgramsIndex[program.idProgram] = program;
        }
      });
    }
  }

  public getProgram(index: number) {
    return this.systemProgramsIndex[index];
  }

}