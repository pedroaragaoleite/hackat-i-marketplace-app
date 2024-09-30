import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, Signal, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Data } from '../../interfaces/data';
import { map, Observable } from 'rxjs';

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

  private _activity = signal<Data | null>(null)


  constructor() { }

  get activity(): Signal<Data | null> {
    return this._activity;
  }

  getRandom() {
    console.log("run");

    return this.http.get<Data>(`api/random`, httpOptions)
      .pipe(
        map((response: Data) => {
          if (response) {
            console.log(response);
            this._activity.set(response)
          } else {
            console.log("Error generating activities");

          }
        })
      )
  }
}

