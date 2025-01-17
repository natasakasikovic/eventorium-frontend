import {Component, Inject, Input} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Event} from '../../event/model/event.model';

@Component({
  selector: 'app-event-selection',
  templateUrl: './event-selection.component.html',
  styleUrl: './event-selection.component.css'
})
export class EventSelectionComponent {
  selectEventForm: FormGroup = new FormGroup({
    plannedAmount: new FormControl(0, [Validators.required, Validators.min(0)]),
    event: new FormControl('', Validators.required)
  });

  constructor(
    private dialogRef: MatDialogRef<EventSelectionComponent>,
    @Inject(MAT_DIALOG_DATA) public draftedEvents: Event[]
  ) {
  }

  onCancel(): void {
    this.dialogRef.close([null, null]);
  }

  onConfirm(): void {
    this.dialogRef.close({
      plannedAmount: this.selectEventForm.value.plannedAmount,
      event: this.selectEventForm.value.event
    });
  }

}
