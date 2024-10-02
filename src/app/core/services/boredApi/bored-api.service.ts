import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, Signal, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Data } from '../../interfaces/data';
import { catchError, tap, throwError } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};



@Injectable({
  providedIn: 'root'
})
export class BoredApiService {

  private http = inject(HttpClient);

  private _activity = signal<Data | null>(null);
  private _activities = signal<Data[] | null>(null);


  constructor() { }

  get activity(): Signal<Data | null> {
    return this._activity;
  }

  get filterActivity(): Signal<Data[] | null> {
    return this._activities;
  }


  getRandom() {
    return this.http.get<Data>(`api/random`, httpOptions)
      .pipe(
        tap((response: Data) => {
          if (response) {
            this._activity.set(response)
          }
        }),
        catchError(error => {
          console.error("Error fetching random activity", error);
          this._activity.set(null);
          return throwError(error)
        })
      )
  }

  getActivity(type: string) {
    return this.http.get<Data>(`api/filter?type=${type}`, httpOptions)
      .pipe(
        tap((response: any) => {
          if (response) {
            this._activities.set(response)
          }
        }),
        catchError(error => {
          console.error("Error fetching activities", error);
          this._activities.set(null);
          return throwError(error)
        })
      )
  }

  resetAllActivities() {
    this._activity.set(null);
    this._activities.set(null);
  }
}

