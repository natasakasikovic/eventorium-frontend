import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {CommentService} from '../comment.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {Status} from '../../category/model/status-enum-ts';
import {ToastrService} from 'ngx-toastr';
import {Comment} from '../model/comment.model';

@Component({
  selector: 'app-manage-reviews',
  templateUrl: './manage-comments.component.html',
  styleUrl: './manage-comments.component.css'
})
export class ManageCommentsComponent implements OnInit, AfterViewInit {
  comments: MatTableDataSource<Comment> = new MatTableDataSource();
  displayedColumns: string[] = ['creationDate', 'user', 'commentable', 'comment', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private commentService: CommentService,
    private toasterService: ToastrService
  ) {}

  ngOnInit(): void {
    this.commentService.getPendingComments().subscribe({
      next: (comments: Comment[]) => {
        this.comments.data = comments;
      }
    })
  }

  ngAfterViewInit(): void {
    this.comments.paginator = this.paginator;
  }

  acceptComment(comment: Comment): void {
    this.commentService.updateComment(comment.id, Status.ACCEPTED).subscribe({
      next: (comment: Comment) => {
        this.comments.data = this.comments.data.filter(r => r.id !== comment.id);
        this.toasterService.success("Comment has been accepted successfully", "Success");
      }
    });
  }

  declineComment(comment: Comment): void {
    this.commentService.updateComment(comment.id, Status.DECLINED).subscribe({
      next: (comment: Comment) => {
        this.comments.data = this.comments.data.filter(r => r.id !== comment.id);
        this.toasterService.success("Review has been declined successfully", "Success");
      }
    });
  }
}
