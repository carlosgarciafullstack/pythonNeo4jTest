import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserLogin } from '../models/interfaces/user-login.interface';
import { CONFIG } from '../config';
import { IResponse } from '../models/interfaces/response.interface';
import { INewUser } from '@core/models/interfaces/new-user.interface';
import { IUserConfig } from '@core/models/interfaces/user-config.interface';

@Injectable({
  providedIn: 'root'
})
export class SystemDataProvider {

  constructor(private http: HttpClient) { }

  public loadPrograms(): Observable<any> {
    return this.http.get<any>('assets/disk_C/system/defaultProgram.json');
  }

  public login(user: IUserLogin): Observable<IResponse> {
    return this.http.post<IResponse>(CONFIG.URL_API+'/login', user);
  }

  public getUserConfig(): Observable<IResponse> {
    return this.http.get<IResponse>(CONFIG.URL_API+'/userConfig');
  }
  
  public newUser(user: INewUser): Observable<IResponse> {
    return this.http.post<IResponse>(CONFIG.URL_API+'/newUser', user);
  }

  public saveUserConfig(userConfig: IUserConfig): Observable<IResponse> {
    return this.http.post<IResponse>(CONFIG.URL_API+'/userConfig', userConfig);
  } 
}
