import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BestMovieService {
  constructor() {}
  localDate =
    localStorage.getItem('bestMovie') == null
      ? -1
      : localStorage.getItem('bestMovie');
  movie: BehaviorSubject<number> = new BehaviorSubject<number>(
    this.localDate as number
  );
  getBestMovie(): Observable<string | null> {
    console.log(localStorage.getItem('bestMovie'));
    const bestMovie = of(localStorage.getItem('bestMovie'));
    return bestMovie;
  }

  setBestMovie(id: number) {
    localStorage.setItem('bestMovie', id.toString());
    this.movie.next(id);
  }
  clearData() {
    console.log(12);
    localStorage.removeItem('bestMovie');
    this.movie.next(-1);
  }
}
