export class Program {
    idTask: number;
    idProgram: number;
    title: string;
    iconName: string;
    programRoute: string;
    colorIcon: string;

    constructor (idProgram = 0, title = '', iconName = '') {
        this.idTask = 0;
        this.idProgram = idProgram;
        this.title = title;
        this.iconName = iconName;
        this.programRoute = '';
        this.colorIcon = '#'+(0x1000000 + Math.random()*0xffffff).toString(16).substr(1,6);
    }
    
}