import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { AddFeedComponent } from './components/add-feed/add-feed.component';
import { Feed } from './interfaces/feed';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  private feedsSubject = new BehaviorSubject<Feed[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private noDataSubject = new BehaviorSubject<boolean>(false);
  feeds$ = this.feedsSubject.asObservable();
  loading$ = this.loadingSubject.asObservable();
  noData$ = this.noDataSubject.asObservable();

  keywords = new FormControl('');
  alert = new FormControl('');

  filterFeedsForm = new FormGroup({
    keywords: this.keywords,
    alert: this.alert,
  });

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  onFilterFeeds(): void {}

  onAddFeedItem(): void {
    const addFeedDialogRef = this.dialog.open(AddFeedComponent);

    addFeedDialogRef.afterClosed().subscribe((result) => {});
  }
}
