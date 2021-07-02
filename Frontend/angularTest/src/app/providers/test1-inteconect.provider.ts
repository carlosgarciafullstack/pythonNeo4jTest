import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class Test1InteconectProvider {

  constructor(private http: HttpClient) { }

  public test1GetData(): Observable<any> {
    return this.http.get<any>('http://127.0.0.1:5000/test1GetData');
      
  }
}
