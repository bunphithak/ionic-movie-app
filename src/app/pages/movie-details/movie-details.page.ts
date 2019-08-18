import { MovieService } from './../../services/movie.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {

  public information = null;
  public checkBookmark = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService,
    private storage: Storage
  ) { }

  ngOnInit() {
    // Get the ID that was passed with the URL
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    // Get the information from the API
    this.movieService.getDetails(id).subscribe(result => {
      this.information = result;
    });
    if (id) {
      this.checkBookmarkList(id);
    }
  }

  openWebsite() {
    window.open(this.information.Website, '_blank');
  }

  changeBookmark(dataBookmark) {
    let getBookmark = JSON.parse(localStorage.getItem('bookmark'));
    if (!getBookmark && dataBookmark) {
      localStorage.setItem('bookmark', JSON.stringify(new Array(dataBookmark)));
    } else {
      const checkData = getBookmark.some(valSome => valSome.imdbID === dataBookmark.imdbID);
      if (!checkData) {
        getBookmark.push(dataBookmark);
      } else {
        const removeBookmark = getBookmark.filter(rmVal => rmVal.imdbID !== dataBookmark.imdbID);
        getBookmark = removeBookmark;
      }

      localStorage.setItem('bookmark', JSON.stringify(getBookmark));
    }
    this.checkBookmarkList(dataBookmark.imdbID);
  }

  checkBookmarkList(dataBookmarkID) {
    const getBookmark = JSON.parse(localStorage.getItem('bookmark'));
    if (getBookmark && getBookmark.length > 0) {
      this.checkBookmark = getBookmark.some(valSome => valSome.imdbID === dataBookmarkID);
    }
  }
}
