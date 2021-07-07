import { MatDialogRef } from "@angular/material/dialog";
import { WindowComponent } from "src/app/components/window/window.component";
import { ITask } from "../interfaces/task.interface";
import { Program } from "./program.entity";

export class Task implements ITask {

    idTask: number;
    idProgram: number;
    title: string;
    iconName: string;
    colorIcon: string;
    dialogRef: MatDialogRef<WindowComponent>;
    isMaximize: boolean;
    isMinimize: boolean;

    constructor (program: Program, dialogRef: MatDialogRef<WindowComponent>) {
        this.idProgram = program.idProgram;
        this.title = program.title;
        this.iconName = program.iconName;
        this.idTask = program.idTask;
        this.colorIcon = program.colorIcon;
        
        this.dialogRef = dialogRef;
        this.isMaximize = false;
        this.isMinimize = false;
    }
    
}