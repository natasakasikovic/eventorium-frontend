import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { EventService } from '../event.service';
import { MatPaginator } from '@angular/material/paginator';
import { Event } from '../model/event.model';

@Component({
  selector: 'app-events-overview',
  templateUrl: './events-overview.component.html',
  styleUrl: './events-overview.component.css'
})
export class EventsOverviewComponent implements OnInit, AfterViewInit {

  showFilter: boolean; // TODO: implement event filter pop up
  events: Event[];

  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(
    private eventService: EventService,
    private changeDetector: ChangeDetectorRef ) { }

  ngOnInit(): void { }

  closeFilter(): void {
    this.showFilter = false;
  }
    
  openFilter(): void {
    this.showFilter = true;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.events = this.eventService.getPage(this.paginator.pageSize, this.paginator.pageIndex); }, 0);
  }

  getTotalEventCount(): number {
    return this.eventService.totalCountEvents();
  }

  onPageChanged(): void {
    this.events = this.eventService.getPage(this.paginator.pageSize, this.paginator.pageIndex);
  }

  onSearch(keyword: string): void {
    this.events = this.eventService.searchEvents(keyword);
    this.changeDetector.detectChanges();
  }
}
