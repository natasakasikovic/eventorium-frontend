import { Injectable } from '@angular/core';
import {ChatDialogComponent} from './chat-dialog.component';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ChatMessage} from "../../web-socket/model/chat-message.model";
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatDialogService {
  dialogRef: MatDialogRef<ChatDialogComponent>

  constructor(
    private dialog: MatDialog
  ) {}


  openChatDialog(recipientId: number): void {
    this.dialogRef = this.dialog.open(ChatDialogComponent, {
      width: 'auto',
      height: 'auto',
      panelClass: 'chat-dialog-panel',
      data: {
        recipientId: recipientId,
      }
    });

    this.dialogRef.afterClosed().subscribe(() => {
      this.dialogRef = null;
    });
  }

  sendMessage(message: ChatMessage): void {
    this.dialogRef.componentInstance.addMessage(message);
  }

  isOpened(): boolean {
    return this.dialogRef != null;
  }

}
