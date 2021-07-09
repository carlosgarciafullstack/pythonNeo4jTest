import { MatDialogRef } from "@angular/material/dialog";
import { WindowComponent } from "src/app/components/window/window.component";
import { IProgramLauncher } from "../interfaces/program-launcher.interface";
import { ITask } from "../interfaces/task.interface";
import { ProgramLauncher } from "./program-launcher.entity";

export class Task implements ITask {

    public idTask: number;
    public program: ProgramLauncher;
    public dialogRef: MatDialogRef<WindowComponent>;
    public isMaximize: boolean;
    public isMinimize: boolean;

    constructor (idTask: number, program: ProgramLauncher, dialogRef: MatDialogRef<WindowComponent>) {
        this.idTask = idTask;
        this.program = program;
        
        this.dialogRef = dialogRef;
        this.isMaximize = false;
        this.isMinimize = false;
    }
}