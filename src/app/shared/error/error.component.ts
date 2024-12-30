import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent implements OnInit {
  errorCode: string | null = null;
  errorMessage: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.errorCode = params['code'] || 'Unknown';
      this.errorMessage = params['message'] || 'An unexpected error occurred.';
    });
  }
}
