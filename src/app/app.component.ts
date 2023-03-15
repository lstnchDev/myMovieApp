import { BehaviorSubject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { GENRES } from './../data/genres';
import { Movie } from './../interfaces/movie';
import { Component } from '@angular/core';
import { MovieService } from 'src/services/movies.service';
import { default as MOVIES } from '../assets/data.json';
import { BestMovieService } from 'src/services/best-movie.service';
import { DialogElementsExample } from './popup.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  movies: Movie[] = [];
  allMovies: Movie[] = MOVIES;
  genres: string[] = GENRES;
  bestMovie: BehaviorSubject<number> = this.bestMovieService.movie;
  searchText: string = '';
  searchGenre: number = 0;

  constructor(
    private moviesService: MovieService,
    private bestMovieService: BestMovieService,
    public dialog: MatDialog
  ) {
    this.bestMovie = this.bestMovieService.movie;
  }

  ngOnInit(): void {
    this.getMovies();
  }
  getMovies(): void {
    this.moviesService
      .getMovies()
      .subscribe((movies) => (this.movies = movies));
  }

  setBestMovie(event: MouseEvent, id: number): void {
    event.stopPropagation();
    console.log(this.bestMovie.getValue());

    if (id == this.bestMovie.getValue()) this.bestMovieService.clearData();
    else this.bestMovieService.setBestMovie(id);
  }

  getDetailInfo(id: number) {
    this.dialog.open(DialogElementsExample, {
      data: this.movies[id],
    });
  }
  onSetGenre(value: number) {
    this.searchGenre = value;
    if (Number.isNaN(value)) this.getMovies();
    else {
      this.moviesService
        .getFilterGenre(value, this.searchText)
        .subscribe((moviesFilter) => (this.movies = moviesFilter));
    }
  }
  onTitleSearch() {
    if (this.searchText.length < 1) this.getMovies();
    else {
      this.moviesService
        .getFilterTitle(this.searchText, this.searchGenre)
        .subscribe((moviesFilter) => (this.movies = moviesFilter));
    }
  }
}
