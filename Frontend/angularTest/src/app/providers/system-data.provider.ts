import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SystemDataProvider {

  constructor(private http: HttpClient) { }

  public loadPrograms(): Observable<any> {
    return this.http.get<any>('assets/disk_C/system/defaultProgram.json');
  }
}
