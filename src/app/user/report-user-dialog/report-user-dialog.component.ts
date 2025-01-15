import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserReport } from '../model/user-report.model';

@Component({
  selector: 'app-report-user-dialog',
  templateUrl: './report-user-dialog.component.html',
  styleUrl: './report-user-dialog.component.css'
})
export class ReportUserDialogComponent {

  report : UserReport = { reason: '' };
  reason = new FormControl('', [Validators.required, Validators.minLength(5)]);

  constructor( public dialogRef: MatDialogRef<ReportUserDialogComponent> ) { }

  submitReport() {
    if (this.reason.valid){
      this.report.reason = this.reason.value
      this.dialogRef.close(this.report);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}