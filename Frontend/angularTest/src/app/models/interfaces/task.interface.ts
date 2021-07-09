import { MatDialogRef } from "@angular/material/dialog";
import { WindowComponent } from "src/app/components/window/window.component";
import { IProgramLauncher } from "./program-launcher.interface";

export interface ITask {
    idTask: number;
    program: IProgramLauncher;
    
    dialogRef: MatDialogRef<WindowComponent>;
    isMaximize: boolean;
    isMinimize: boolean;
}