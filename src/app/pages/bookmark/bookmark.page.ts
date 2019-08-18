import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.page.html',
  styleUrls: ['./bookmark.page.scss'],
})
export class BookmarkPage implements OnInit {
  public getBookmarkListItem: any[];
  constructor() { }

  ngOnInit() {
    this.getBookmarkList();
  }

  getBookmarkList() {
    this.getBookmarkListItem = JSON.parse(localStorage.getItem('bookmark'));
  }

  trackId(index, item) {
    return item ? item.imdbID : undefined;
  }
}
