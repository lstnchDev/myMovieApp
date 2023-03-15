import { BehaviorSubject } from 'rxjs';
import { BestMovieService } from 'src/services/best-movie.service';
import { GENRES } from './../data/genres';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Movie } from 'src/interfaces/movie';

/**
 * @title Dialog elements
 */
@Component({
  selector: 'dialog-popup-movie',
  templateUrl: './detail-popup-movie.html',
  styleUrls: ['./popup.component.scss'],
})
export class DialogElementsExample {
  genres: string[] = GENRES;
  movie: Movie[] = [];
  bestMovie: BehaviorSubject<number> = this.bestMovieService.movie;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Movie,
    private bestMovieService: BestMovieService
  ) {}
  setBestMovie(id: number): void {
    if (id == this.bestMovie.getValue()) this.bestMovieService.clearData();
    else this.bestMovieService.setBestMovie(id);
  }
}
