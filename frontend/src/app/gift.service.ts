import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Gift, Page } from './gift';


@Injectable({
  providedIn: 'root'
})
export class GiftService {

  private giftsUrl = 'api/v1/gifts';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient) { }


  getGifts(pageNumber:number=0, pageSize:number=10): Observable<Page<Gift>> {
    return this.http.get<Page<Gift>>(
      this.giftsUrl,
      {
        params: new HttpParams()
            .set('page', pageNumber.toString())
            .set('size', pageSize.toString())
      }
    ).pipe(
      catchError(this.handleError<Page<Gift>>('getGifts', new Page<Gift>()))
    );
  }

  getGift(id: number): Observable<Gift> {
    const url = `${this.giftsUrl}/${id}`;
    return this.http.get<Gift>(url).pipe(
      catchError(this.handleError<Gift>('getGift', {id: 0, name: "", recipient: ""}))
    );
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    // this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
}
