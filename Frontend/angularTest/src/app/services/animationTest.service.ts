import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AnimationTestService {
    public isPlay: boolean;

    constructor() { 
        this.isPlay = false;
    }
}