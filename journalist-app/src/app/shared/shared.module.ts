import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { ClipboardModule } from '@angular/cdk/clipboard';

// Custom components
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

const ANGULAR_MATERIAL_MODULES = [
  MatButtonModule,
  MatToolbarModule,
  MatCardModule,
  MatChipsModule,
  MatIconModule,
  MatInputModule,
  MatFormFieldModule,
  MatSelectModule,
  MatDialogModule,
  MatMenuModule,
  MatDatepickerModule,
  MatSnackBarModule,
  DragDropModule,
  ClipboardModule,
];

@NgModule({
  declarations: [FileUploadComponent, ConfirmDialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ANGULAR_MATERIAL_MODULES,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    ANGULAR_MATERIAL_MODULES,
    FileUploadComponent,
    ConfirmDialogComponent,
  ],
})
export class SharedModule {}
