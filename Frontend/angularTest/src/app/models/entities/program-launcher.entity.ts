import { IProgramLauncher } from "../interfaces/program-launcher.interface";

export class ProgramLauncher implements IProgramLauncher {

    public idProgram: number;
    public title: string;
    public iconName: string;
    public type: string;
    public programRoute: string;
    public colorIcon: string;
    
    constructor (idProgram = 0, title = '', iconName = '', programRoute = '', type = 'N') {
        this.idProgram = idProgram;
        this.title = title;
        this.iconName = iconName;
        this.programRoute = programRoute;
        this.colorIcon = '#'+(0x1000000 + Math.random()*0xffffff).toString(16).substr(1,6);
        this.type = type;
    }
    
    
}