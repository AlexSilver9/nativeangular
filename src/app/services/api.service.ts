import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {EMPTY, interval, Observable, share, startWith, switchMap, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface ApiMessage {
  type:string,
  message:string
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly MESSAGES_API_URL = 'http://34.49.156.65';

  constructor(private http: HttpClient) {}

  getLastMessage(): Observable<ApiMessage> {
    return this.http.get<ApiMessage>(`${this.MESSAGES_API_URL}/last`)
      .pipe(catchError(this.handleError));
  }

  getLastMessagePeriodically(intervalMs: number = 1000): Observable<ApiMessage> {
    return interval(intervalMs).pipe(
      startWith(0), // Emit immediately, then every interval
      switchMap(() => this.getLastMessage()),
      share() // Share the subscription among multiple subscribers
    );
  }

  getLastMessagePolling(intervalMs: number = 1000): Observable<ApiMessage> {
    return interval(intervalMs).pipe(
      startWith(0),
      switchMap( () =>
        this.getLastMessage().pipe(
          catchError(error => {
            console.warn("Polling failed, continuing ...", error);
            return EMPTY; // Continue polling even if one request fails
          })
        )
      ),
      share()
    );
  }

  // Beispiele für andere pipe-Operatoren
  /*getMessagesWithTransformation(): Observable<string[]> {
    return this.http.get<ApiMessage[]>(`${this.MESSAGES_API_URL}/all`).pipe(
      map(tick-message => tick-message.map(m => m.tick-message)),        // Transformiert Daten
      filter(tick-message => tick-message.length > 0),              // Filtert leere Arrays
      tap(tick-message => console.log('ApiMessage:', tick-message)),  // Side-Effect (Logging)
      retry(3),                                             // Wiederholt bei Fehler 3x
      timeout(5000),                                        // Timeout nach 5 Sekunden
      catchError(this.handleError)                          // Fehlerbehandlung
    );
  }*/

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('MESSAGES API Error:', error);
    return throwError(() => new Error(`MESSAGES API Error: ${error.message}`));
  }
}
