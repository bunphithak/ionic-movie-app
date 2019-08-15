import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

// Typescript custom enum for search types (optional)
export enum SearchType {
  all = '',
  movie = 'movie',
  series = 'series',
  episode = 'episode'
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(private http: HttpClient) { }


  searchData(title: string, type: SearchType): Observable<any> {
    return this.http.get(`${environment.url}?s=${encodeURI(title)}&type=${type}&apikey=${environment.apiKey}`).pipe(
      // tslint:disable-next-line:no-string-literal
      map(results => results['Search'])
    );
  }


  getDetails(id) {
    return this.http.get(`${environment.url}?i=${id}&plot=full&apikey=${environment.apiKey}`);
  }
}
