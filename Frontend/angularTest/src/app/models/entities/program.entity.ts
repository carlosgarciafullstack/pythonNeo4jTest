export class Program {
    idTask: number;
    idProgram: number;
    title: string;
    iconName: string;

    constructor (idProgram = 0, title = '', iconName = '') {
        this.idTask = 0;
        this.idProgram = idProgram;
        this.title = title;
        this.iconName = iconName;
    }
    
}