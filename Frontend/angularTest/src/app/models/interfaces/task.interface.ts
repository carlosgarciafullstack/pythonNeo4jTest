import { MatDialogRef } from "@angular/material/dialog";
import { WindowComponent } from "src/app/components/window/window.component";

export interface ITask {
    idTask: number;
    idProgram: number;
    title: string;
    iconName: string;
    dialogRef: MatDialogRef<WindowComponent>;
    isMaximize: boolean;
    isMinimize: boolean;
}