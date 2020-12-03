import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Beans } from './list-beans.component';

@Injectable({
  providedIn: 'root'
})
export class BeansApiService {

  constructor(
    private http: HttpClient
  ) { }

  public getAllBeans(): Observable<any> {
    return this.http.get('/beans');
  }

  public getBean(name: string) {
    return this.http.get(`/beans/${name}`);
  }

  public createBean(bean: any) {
    return this.http.post('/beans', bean);
  }

  public updateBean(id: number, bean: any) {
    return this.http.put(`/beans/${id}`, bean);
  }

  public deleteBean(id: number) {
    return this.http.delete(`/beans/${id}`);
  }

  public getImage(name: string) {
    return this.http.get(`/img/${name}`);
  }
}
