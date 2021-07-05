import { Injectable } from "@angular/core";
import { MainProgram } from "../models/entities/main-program.entity";

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  public mainPrograms: MainProgram[];

  constructor() {
    this.mainPrograms = [];
    
  }
}