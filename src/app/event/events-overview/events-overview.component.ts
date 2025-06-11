import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { PageEvent } from '@angular/material/paginator';
import { PagedResponse } from '../../shared/model/paged-response.model';
import { EventSummary } from '../model/event-summary.model';
import { EventsFilterDialogComponent } from '../events-filter-dialog/events-filter-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EventFilter } from '../model/event-filter.model';
import { InfoDialogComponent } from '../../shared/info-dialog/info-dialog.component';
import { ERROR_MESSAGES } from '../../shared/constants/error-messages';

@Component({
  selector: 'app-events-overview',
  templateUrl: './events-overview.component.html',
  styleUrl: './events-overview.component.css'
})
export class EventsOverviewComponent implements OnInit {

  pageProperties = {
    pageIndex: 0,
    pageSize: 10,
    totalCount: 0
  }

  events: EventSummary[];
  keyword: string;
  activeFilter: EventFilter;

  constructor(private service: EventService, private dialog: MatDialog) { }
 
  ngOnInit(): void {
    this.getPagedEvents();
  }
  
  private getPagedEvents() {
    this.service.getAll(this.pageProperties)
    .subscribe({
      next: (response: PagedResponse<EventSummary>) => {
        this.events = response.content;
        this.pageProperties.totalCount = response.totalElements;
      } 
    })  
  }

  onPageChanged(pageEvent : PageEvent): void {
    this.pageProperties.pageIndex = pageEvent.pageIndex;
    this.pageProperties.pageSize = pageEvent.pageSize;

    if (this.keyword)
      this.onSearch(this.keyword)
    else if (this.activeFilter)
      this.filterEvents(this.activeFilter)
    else  
      this.getPagedEvents();
  }
    
  openDialog(): void {
    let dialog = this.dialog.open(EventsFilterDialogComponent, {
      height: '500px',
      width: '600px',
    });

    this.handleDialogClose(dialog);
  }
  
  private handleDialogClose(dialogRef: MatDialogRef<EventsFilterDialogComponent>): void {
    dialogRef.afterClosed().subscribe((filter: EventFilter) => {
      this.filterEvents(filter);
    });
  }

  private preprocessFilter(filter: EventFilter){
    this.resetPageIndex(null, filter);
    this.activeFilter = filter;
    this.keyword = null;
  }

  filterEvents(filter: EventFilter) {
    this.preprocessFilter(filter);
    this.service.filterEvents(filter, this.pageProperties).subscribe({
      next: (response: PagedResponse<EventSummary>) => {
        this.events = response.content
        this.pageProperties.totalCount = response.totalElements
      },
      error: (err) => {
        if (err.status == 400)
          this.showMessage(ERROR_MESSAGES.GENERAL_ERROR, err.error.message) // TODO: see if on backend will  be @Valid annotation
        else 
          this.showMessage(ERROR_MESSAGES.GENERAL_ERROR, ERROR_MESSAGES.SERVER_ERROR)
      }
    })
  }

  onSearch(keyword: string): void {
    this.resetPageIndex(keyword, null)
    this.keyword = keyword
    this.service.searchEvents(keyword, this.pageProperties)
      .subscribe({
        next: (response: PagedResponse<EventSummary>) => {
          this.events = response.content 
          this.pageProperties.totalCount = response.totalElements
        }
      })
  }
  
  private resetPageIndex(keyword: string | null, filter: EventFilter | null): void {
    if ((keyword && this.keyword != keyword) || (filter && this.activeFilter !== filter) && this.pageProperties.pageIndex != 0)
      this.pageProperties.pageIndex = 0
  }

  showMessage(title: string, message: string) : void {
    this.dialog.open(InfoDialogComponent, {
      data: {
        title: title,
        message: message
      }
    })
  }
}
