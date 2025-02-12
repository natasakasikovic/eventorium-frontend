import { Component, OnInit } from '@angular/core';
import { PageProperties } from '../../shared/model/page-properties.model';
import { EventSummary } from '../model/event-summary.model';
import { PageEvent } from '@angular/material/paginator';
import { EventService } from '../event.service';
import { PagedResponse } from '../../shared/model/paged-response.model';
import { EventFilter } from '../model/event-filter.model';

@Component({
  selector: 'app-manageable-events',
  templateUrl: './manageable-events.component.html',
  styleUrl: './manageable-events.component.css'
})
export class ManageableEventsComponent implements OnInit {
  events: EventSummary[];

  constructor(
    private service: EventService
  ) {}

  ngOnInit(): void {
      this.getEventsPaged();
  }

  pageProperties: PageProperties = {
    pageIndex: 0,
    pageSize: 10,
    totalCount: 0
  }
  keyword: string = "";

  onPageChanged(pageEvent: PageEvent): void {
    this.pageProperties.pageIndex = pageEvent.pageIndex;
    this.pageProperties.pageSize = pageEvent.pageSize;
    this.getEventsPaged();
  }

  private getEventsPaged(): void {
    this.service.getOrganizerEvents(this.pageProperties).subscribe({
      next: (response: PagedResponse<EventSummary>) => {
        this.events = response.content;
        this.pageProperties.totalCount = response.totalElements;
      }
    })
  }

  onSearch(keyword: string): void {
    this.resetPageIndex(keyword, null);
    this.keyword = keyword;
    this.service.searchOrganizerEvents(keyword, this.pageProperties).subscribe({
      next: (response: PagedResponse<EventSummary>) => {
        this.events = response.content;
        this.pageProperties.totalCount = response.totalElements;
      }
    })
  }

  private resetPageIndex(keyword: string | null, filter: EventFilter | null): void {
    if ((keyword && this.keyword != keyword) && this.pageProperties.pageIndex != 0)
      this.pageProperties.pageIndex = 0;
  }

}
