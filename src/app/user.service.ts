import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userId: string = '';
  
  constructor(private httpClient: HttpClient) {}

  public subscribeToUser(userId: string): Observable<boolean> {
    return this.httpClient.post<boolean>("http://localhost:8080/api/users/subscribe/" + userId, null);
  }

  public unsubscribeToUser(userId: string): Observable<boolean> {
    return this.httpClient.post<boolean>("http://localhost:8080/api/users/unsubscribe/" + userId, null);

  }

  public registerUser() {
    this.httpClient.get("http://localhost:8080/api/users/register", {responseType: "text"})
    .subscribe(data => {
      this.userId = data;
    });
  }

  public getUserId(): string {
    return this.userId;
  }
}
