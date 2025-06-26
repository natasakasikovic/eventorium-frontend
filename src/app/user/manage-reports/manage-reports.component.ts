import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { UserService } from '../user.service';
import { UserReportResponse } from '../model/user-report-response.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Status } from '../../category/model/status-enum-ts';
import { InfoDialogComponent } from '../../shared/info-dialog/info-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ERROR_MESSAGES } from '../../shared/constants/error-messages';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';
import { MESSAGES } from '../../shared/constants/messages';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-manage-reports',
  templateUrl: './manage-reports.component.html',
  styleUrl: './manage-reports.component.css'
})
export class ManageReportsComponent implements OnInit, AfterViewInit {


  dataSource: MatTableDataSource<UserReportResponse> = new MatTableDataSource();
  displayedColumns: string[] = ['timestamp', 'offender', 'reason', 'reporter',  'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: UserService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadReports()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadReports() {
    this.service.getReports().subscribe({
      next: ( reports : UserReportResponse[]) => this.dataSource.data = reports,
      error: (error) => this.handleError(error)
    })
  }

  openDialog(report: UserReportResponse): void {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: MESSAGES.suspensionConfirmation }
    });

    this.handleDialogClose(dialogRef, report)
  }

  private handleDialogClose(dialogRef: MatDialogRef<ConfirmationDialogComponent>, report: UserReportResponse): void {
    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.updateReportStatus(report, Status.ACCEPTED)
    });
  }

  declineReport(report: UserReportResponse) {
    this.updateReportStatus(report, Status.DECLINED);
  }

  private updateReportStatus(report: UserReportResponse, status: Status) {
    this.service.updateReportStatus(report.id, { status }).subscribe({
      next: () => this.dataSource.data = this.dataSource.data.filter(r => r.id !== report.id),
      error: (error) => this.handleError(error)
    });
  }

  showMessage(title: string, message: string) : void {
    this.dialog.open(InfoDialogComponent, {
      data: {
        title: title,
        message: message
      }
    })
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status > 500)
      this.showMessage(ERROR_MESSAGES.GENERAL_ERROR, ERROR_MESSAGES.SERVER_ERROR)
    else
      this.showMessage(ERROR_MESSAGES.GENERAL_ERROR, error.error.message)
  }
}
