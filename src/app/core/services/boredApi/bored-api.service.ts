import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, Signal, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Data } from '../../interfaces/data';
import { catchError, map, Observable, throwError } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
  withCredentials: true,
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
        map((response: Data) => {
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
        map((response: any) => {
          console.log(response);

          if (response) {
            this._activities.set(response)
          }
        }),
        catchError(error => {
          console.error("Error fetching random activity", error);
          this._activities.set(null);
          return throwError(error)
        })
      )
  }

  changeActivityToNull() {
    return this._activity.set(null);
  }

  changeActivitiesToNull() {
    return this._activities.set(null);
  }
}

