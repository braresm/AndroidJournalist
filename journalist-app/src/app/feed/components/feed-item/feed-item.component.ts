import { Component, Input, OnInit } from '@angular/core';
import { Feed } from '../../interfaces/feed';

@Component({
  selector: 'app-feed-item',
  templateUrl: './feed-item.component.html',
  styleUrls: ['./feed-item.component.scss'],
})
export class FeedItemComponent implements OnInit {
  @Input() value: Feed | undefined;

  constructor() {}

  ngOnInit(): void {}
}
