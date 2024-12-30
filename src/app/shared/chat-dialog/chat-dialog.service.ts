import { Injectable } from '@angular/core';
import {ChatDialogComponent} from './chat-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class ChatDialogService {
  constructor(
    private dialog: MatDialog
  ) {}

  openChatDialog(recipientId: number): void {
    this.dialog.open(ChatDialogComponent, {
      width: 'auto',
      height: 'auto',
      panelClass: 'chat-dialog-panel',
      data: {
        recipientId: recipientId
      }
    });
  }
}
