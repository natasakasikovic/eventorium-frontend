import { Component, OnInit, ViewChild } from '@angular/core';
import { EventService } from '../event.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Event } from '../model/event.model';
import { PagedResponse } from '../../shared/model/paged-response.model';
import { EventSummary } from '../model/event-summary.model';

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

  showFilter: boolean; // TODO: implement event filter pop up
  events: EventSummary[];

  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private service: EventService) { }
 
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
    this.getPagedEvents();
  }

  closeFilter(): void {
    this.showFilter = false;
  }
    
  openFilter(): void {
    this.showFilter = true;
  }

  onSearch(keyword: string): void {
    this.service.searchEvents(keyword, this.pageProperties)
      .subscribe({
        next: (response: PagedResponse<EventSummary>) => {
          this.events = response.content 
          this.pageProperties.totalCount = response.totalElements
        }
      })
  }
}
