import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommentService } from '../comment.service';
import { ReviewType } from '../model/review-type.enum';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import type { Comment } from '../model/comment.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comments-dialog',
  templateUrl: './comments-dialog.component.html',
  styleUrl: './comments-dialog.component.css'
})
export class CommentsDialogComponent implements OnInit {
  
  comments: Comment[] = [];
  isLoading = true;

  constructor(public dialogRef: MatDialogRef<CommentsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { objectId: number,  reviewType: ReviewType },
    private router: Router,
    private service: CommentService) {}

  ngOnInit(): void {
    this.loadComments();
  }

  loadComments() {
    this.service.getAcceptedCommentsForTarget(this.data.reviewType, this.data.objectId).subscribe({
      next: (data) => {     
        this.comments = data;
        this.isLoading = false;
      },
      error: () => this.isLoading = false });
    }

  goToProfile(userId: number): void {
    this.dialogRef.close();
    this.router.navigate(['/user-profile', userId]);
  }
}