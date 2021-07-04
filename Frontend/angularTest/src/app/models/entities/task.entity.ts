import { ITask } from "../interfaces/task.interface";

export class Task implements ITask{

    id: number;
    title: string;
    iconName: string;
    dialogRef: any;
    isMaximize: boolean;
    isMinimize: boolean;

    constructor (id = 1, title = "Home", iconName = "home" ) {
        this.id = id;
        this.title = title;
        this.iconName = iconName;
        this.dialogRef = undefined;
        this.isMaximize = false;
        this.isMinimize = false;
    }
    
}