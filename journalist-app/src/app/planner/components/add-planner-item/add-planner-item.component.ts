import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PlannerItem } from '../../interfaces/planner-item';

@Component({
  selector: 'app-add-planner-item',
  templateUrl: './add-planner-item.component.html',
  styleUrls: ['./add-planner-item.component.scss'],
})
export class AddPlannerItemComponent implements OnInit {
  type = new FormControl('', [Validators.required]);
  title = new FormControl('', [Validators.required]);
  date = new FormControl(new Date(), [Validators.required]);
  author = new FormControl('', [Validators.required]);
  location = new FormControl('', [Validators.required]);
  contactPerson = new FormControl('', [Validators.required]);
  category = new FormControl('', [Validators.required]);

  addPlannerForm = new FormGroup({
    type: this.type,
    title: this.title,
    date: this.date,
    author: this.author,
    location: this.location,
    contactPerson: this.contactPerson,
    category: this.category,
  });

  private isEdit: boolean = false;

  constructor(
    private readonly dialogRef: MatDialogRef<AddPlannerItemComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly data: { plannerItem: PlannerItem }
  ) {}

  ngOnInit(): void {
    if (this.data.plannerItem) {
      this.isEdit = true;
      this.setFormData(this.data.plannerItem);
    }
  }

  onAddPlannerItem(): void {
    this.dialogRef.close({
      ...this.data.plannerItem,
      ...this.addPlannerForm.value,
      ...{ isEdit: this.isEdit },
    });
  }

  private setFormData(plannerItem: PlannerItem): void {
    this.addPlannerForm.get('type')?.setValue(plannerItem.type);
    this.addPlannerForm.get('title')?.setValue(plannerItem.title);
    this.addPlannerForm
      .get('date')
      ?.setValue(new Date(plannerItem.date.seconds * 1000));
    this.addPlannerForm.get('author')?.setValue(plannerItem.author);
    this.addPlannerForm.get('location')?.setValue(plannerItem.location);
    this.addPlannerForm
      .get('contactPerson')
      ?.setValue(plannerItem.contactPerson);
    this.addPlannerForm.get('category')?.setValue(plannerItem.category);
  }
}
