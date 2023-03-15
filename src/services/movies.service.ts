import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Movie } from 'src/interfaces/movie';
import { default as MOVIES } from '../assets/data.json';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor() {}

  getMovies(): Observable<Movie[]> {
    const movies = of(MOVIES);
    return movies;
  }
  getFilterGenre(genreId: number, searchText: string): Observable<Movie[]> {
    const movies = of(
      MOVIES.filter(
        (movie) =>
          movie.genre.includes(genreId) &&
          movie.name.toLowerCase().includes(searchText.toLowerCase())
      )
    );
    return movies;
  }
  getFilterTitle(str: string, genreId: number): Observable<Movie[]> {
    if (genreId === 0) {
      return of(
        MOVIES.filter((movie) =>
          movie.name.toLowerCase().includes(str.toLowerCase())
        )
      );
    } else {
      return of(
        MOVIES.filter(
          (movie) =>
            movie.name.toLowerCase().includes(str.toLowerCase()) &&
            movie.genre.includes(genreId)
        )
      );
    }
  }
}
