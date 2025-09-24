import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Message {
  type:string,
  message:string
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly MESSAGES_API_URL = 'http://34.49.156.65';

  constructor(private http: HttpClient) {}

  getLastMessage(): Observable<Message> {
    return this.http.get<Message>(`${this.MESSAGES_API_URL}/last`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('MESSAGES API Error:', error);
    return throwError(() => new Error(`MESSAGES APO Error: ${error.message}`));
  }
}
