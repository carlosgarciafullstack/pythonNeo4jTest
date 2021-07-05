export class MainProgram {
    idProgram: number;
    title: string;
    iconName: string;

    constructor (idProgram = 0, title = '', iconName = '') {
        this.idProgram = idProgram;
        this.title = title;
        this.iconName = iconName;
    }
    
}