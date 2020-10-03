import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  public loginStatus = new Subject();

  constructor(private readonly httpClient: HttpClient) { }

  public getProducts(url: string): any {
    return this.httpClient.get(url);
  }

}
