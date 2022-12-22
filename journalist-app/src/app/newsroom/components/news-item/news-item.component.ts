import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { Newsroom } from '../../interfaces/newsroom';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss'],
})
export class NewsItemComponent implements OnInit {
  @Input() item!: Newsroom;

  @Output() deleteNews = new EventEmitter<void>();

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  onDelete(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '600px',
    });
    dialogRef.componentInstance.title = 'Confirm delete news';
    dialogRef.componentInstance.text =
      'Are you sure you want to delete this news?';

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.deleteNews.emit();
      }
    });
  }
}
