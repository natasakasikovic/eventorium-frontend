import { Component, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
import { MapService } from '../map.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-event-map',
  templateUrl: './event-map.component.html',
  styleUrls: ['./event-map.component.css']
})
export class EventMapComponent implements AfterViewInit {
  @ViewChild('mapContainer') mapContainer!: ElementRef<HTMLDivElement>;
  
  @Input() address!: string;
  @Input() city!: string;

  locationNotFound = false;
  private map!: L.Map;

  constructor(private mapService: MapService) {} 

  ngAfterViewInit(): void {
    if (this.mapContainer && this.address) {
      this.initMap();
    }
  }

  private initMap(): void {
    this.map = L.map(this.mapContainer.nativeElement, { zoom: 13 });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    });
    tiles.addTo(this.map);

    this.searchLocation();
  }

  private searchLocation(): void {
    this.mapService.search(`${this.address}, ${this.city}`).subscribe({
      next: (result) => this.handleSearchResult(result),
      error: () => this.locationNotFound = true
    });
  }

  private handleSearchResult(result: any[]): void {
    if (result.length === 0) {
      this.locationNotFound = true;
      return;
    }

    this.locationNotFound = false;
    const { lat, lon } = result[0];

    this.map.setView([lat, lon], 15);
    this.addMarker(lat, lon);
  }

  private addMarker(lat: number, lon: number): void {
    let icon: L.Icon = L.icon({ iconUrl: 'marker-icon.png' });
    L.marker([lat, lon])
      .addTo(this.map)
      .bindPopup(`${this.address}, ${this.city}`)
      .openPopup()
      .setIcon(icon);
  }

  scrollToMap(): void {
    this.mapContainer.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
