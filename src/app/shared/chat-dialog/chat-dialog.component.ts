import { Component } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrl: './chat-dialog.component.css'
})
export class ChatDialogComponent {

  constructor(public dialogRef: MatDialogRef<ChatDialogComponent>) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
