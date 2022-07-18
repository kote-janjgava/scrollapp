import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

import { User } from './user-interface';
import { Response } from './response.interface';
@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly apiUrl: string =
    'http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user';

  constructor(private http: HttpClient) {}

  //fetch all users
  getUsers(size: number = 20, page: number = 0): Observable<any> {
    return this.http
      .get<any>(`${this.apiUrl}/${page}/${size}`)
      .pipe(delay(500));
  }

  //fetch user with id
  getUser(id: number = 1): Observable<any> {
    return this.http.get<any>(
      `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}`
    );
  }
}
