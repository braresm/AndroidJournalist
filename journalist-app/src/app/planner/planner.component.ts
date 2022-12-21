import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import {
  catchError,
  filter,
  map,
  Observable,
  Subject,
  takeUntil,
  tap,
  throwError,
} from 'rxjs';
import { AddPlannerItemComponent } from './components/add-planner-item/add-planner-item.component';
import { MatDialog } from '@angular/material/dialog';
import { PlannerService } from './services/planner.service';
import { PlannerItem } from './interfaces/planner-item';
import { SnackbarService } from '../shared/services/snackbar.service';
import { PlannerItemStatus } from './enums/planner-item-status';

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.scss'],
})
export class PlannerComponent implements OnInit {
  private destroyed$ = new Subject<void>();

  $plannerItems$!: Observable<PlannerItem[]>;

  inProductionItems: PlannerItem[] = [];
  takeItems: PlannerItem[] = [];
  toCallItems: PlannerItem[] = [];
  investigateItems: PlannerItem[] = [];

  private readonly plannerItemStatuses = [
    PlannerItemStatus.IN_PRODUCTION,
    PlannerItemStatus.TAKE,
    PlannerItemStatus.TO_CALL,
    PlannerItemStatus.INVESTIGATE,
  ];

  constructor(
    private dialog: MatDialog,
    private snackbarService: SnackbarService,
    private plannerService: PlannerService
  ) {}

  ngOnInit(): void {
    this.$plannerItems$ = this.plannerService.getPlannerItems();

    this.$plannerItems$
      .pipe(
        map((items) => this.filterPlannerItems(items)),
        takeUntil(this.destroyed$)
      )
      .subscribe();
  }

  private filterPlannerItems(items: PlannerItem[]) {
    this.inProductionItems = [];
    this.takeItems = [];
    this.toCallItems = [];
    this.investigateItems = [];

    items.forEach((item) => {
      if (item.status === PlannerItemStatus.IN_PRODUCTION) {
        this.inProductionItems.push(item);
      }
      if (item.status === PlannerItemStatus.TAKE) {
        this.takeItems.push(item);
      }
      if (item.status === PlannerItemStatus.TO_CALL) {
        this.toCallItems.push(item);
      }
      if (item.status === PlannerItemStatus.INVESTIGATE) {
        this.investigateItems.push(item);
      }
    });
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }

  onAddPlannerItem(plannerItem: PlannerItem | null = null): void {
    const addPlannerDialogRef = this.dialog.open(AddPlannerItemComponent, {
      width: '600px',
      data: {
        plannerItem: plannerItem,
      },
    });

    addPlannerDialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap((data) => {
          if (data.isEdit) {
            const plannerItem: PlannerItem = {
              id: data.id,
              title: data.title,
              type: data.type,
              status: data.status,
              author: data.author,
              category: data.category,
              contactPerson: data.contactPerson,
              date: data.date,
              location: data.location,
              createdDate: data.createdDate,
            };

            this.plannerService.update(plannerItem);
            this.snackbarService.showSuccess(
              'Planner item updated successfully'
            );
          } else {
            const plannerItem: PlannerItem = {
              title: data.title,
              type: data.type,
              status: PlannerItemStatus.IN_PRODUCTION,
              author: data.author,
              category: data.category,
              contactPerson: data.contactPerson,
              date: data.date,
              location: data.location,
              createdDate: null,
            };
            this.plannerService.create(plannerItem);
            this.snackbarService.showSuccess(
              'Planner item created successfully'
            );
          }
        }),
        takeUntil(this.destroyed$),
        catchError((err) => {
          this.snackbarService.showError(
            'Error occurred while saving planner item'
          );
          return throwError(() => err);
        })
      )
      .subscribe();
  }

  drop(event: CdkDragDrop<PlannerItem[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      // update planner item status in database
      const dragItem = event.container.data[event.currentIndex];
      const targetColumnId = event.container.element.nativeElement.id;
      const statusIdx: number = parseInt(targetColumnId.split('#')[1]);
      const nextStatus = this.plannerItemStatuses[statusIdx];
      dragItem.status = nextStatus || dragItem.status;
      this.plannerService.update(dragItem);
      this.snackbarService.showSuccess(
        `Planner ${dragItem.title} was moved to ${nextStatus}`
      );
    }
  }

  onEditPlannerItem(plannerItem: PlannerItem): void {
    this.onAddPlannerItem(plannerItem);
  }
  onDeletePlannerItem(plannerItem: PlannerItem): void {
    if (plannerItem.id) {
      this.plannerService.delete(plannerItem.id);
    }
  }
}
