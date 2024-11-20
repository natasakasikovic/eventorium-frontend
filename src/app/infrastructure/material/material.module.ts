import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from '@angular/material/card';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatDivider} from '@angular/material/divider';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import { MatSelectModule } from "@angular/material/select";
import { ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIcon,
    FormsModule,
    MatDialogModule,
    MatSidenavModule,
    MatIconModule,
    MatDivider,
    MatNativeDateModule,
    MatDatepickerToggle,
    MatDatepickerInput,
    MatDatepicker,
    MatCheckbox,
    MatRadioButton,
    MatRadioGroup,
    MatSelectModule,
    ReactiveFormsModule,
    MatGridListModule
  ],
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatLabel,
    MatCardModule,
    MatIcon,
    FormsModule,
    MatDialogModule,
    MatSidenavModule,
    MatIconModule,
    MatDivider,
    MatNativeDateModule,
    MatDatepickerToggle,
    MatDatepickerInput,
    MatDatepicker,
    MatCheckbox,
    MatRadioButton,
    MatRadioGroup,
    MatSelectModule,
    ReactiveFormsModule,
    MatGridListModule
  ]
})
export class MaterialModule { }
