import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../models/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class SystemDataProvider {

  constructor(private http: HttpClient) { }

  public loadPrograms(): Observable<any> {
    return this.http.get<any>('assets/disk_C/system/defaultProgram.json');
  }

  public login(user: IUser): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
//      'Authorization': this.basic 
    });
    let options = { headers: headers };

    return this.http.post<IUser>('http://127.0.0.1:5000/login', user, options);
  }
}
