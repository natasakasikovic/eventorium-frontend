import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../event.service';
import { EventRatingsStatistics } from '../model/event-rating-statistics.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ERROR_MESSAGES } from '../../shared/constants/error-messages';
import { InfoDialogComponent } from '../../shared/info-dialog/info-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import CanvasJS from 'canvasjs';

@Component({
  selector: 'app-event-rating-statistics',
  templateUrl: './event-rating-statistics.component.html',
  styleUrl: './event-rating-statistics.component.css'
})
export class EventRatingStatisticsComponent implements OnInit {
  id: number;
  stats: EventRatingsStatistics = null;

  chartOptions: CanvasJS.ChartOptions = null;

  constructor(
    private route: ActivatedRoute,
    private service: EventService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.service.getEventStatistics(this.id).subscribe({
      next: (stats: EventRatingsStatistics) => {
        this.stats = stats;
        this.chartOptions = {
          animationEnabled: true,
          title: { text: stats.eventName },
          axisX: { title: "Rating", interval: 1 },
          axisY: { title: "Count", interval: stats.totalRatings },
          data: [{
            type: "column",
            dataPoints: Object.entries(stats.ratingsCount).map(([label, y]) => ({ label, y }))
          }]
        };
      },
      error: (error: HttpErrorResponse) => this.handleError(error)
    });
  }

  handleError(error: HttpErrorResponse): void {
    if (error.status < 500)
      this.showMessage(ERROR_MESSAGES.GENERAL_ERROR, error.error.message)
    else
      this.showMessage(ERROR_MESSAGES.GENERAL_ERROR , ERROR_MESSAGES.SERVER_ERROR)      
  }

  showMessage(title: string, message: string) : void {
    this.dialog.open(InfoDialogComponent, {
      data: { title: title, message: message }
    })
  }

}
