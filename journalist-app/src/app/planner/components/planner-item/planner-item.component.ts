import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Clipboard } from '@angular/cdk/clipboard';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { PlannerItem } from '../../interfaces/planner-item';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-planner-item',
  templateUrl: './planner-item.component.html',
  styleUrls: ['./planner-item.component.scss'],
})
export class PlannerItemComponent implements OnInit {
  @Input() item!: PlannerItem;

  @Output() editPlannerItem = new EventEmitter<void>();
  @Output() deletePlannerItem = new EventEmitter<void>();

  constructor(
    private dialog: MatDialog,
    private clipboard: Clipboard,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {}

  ngOnDestroy() {}

  onCopy(): void {
    this.clipboard.copy(this.item.title);
    this.snackbarService.showInfo('Text was copied to clipboard');
  }

  onEdit(): void {
    this.editPlannerItem.emit();
  }

  onDelete(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '600px',
    });
    dialogRef.componentInstance.title = 'Confirm delete planner item';
    dialogRef.componentInstance.text =
      'Are you sure you want to delete this item?';

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.deletePlannerItem.emit();
      }
    });
  }
}
