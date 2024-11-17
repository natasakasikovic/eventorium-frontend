import {Component, Input} from '@angular/core';
import {Service} from '../../service/model/service.model';

@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrl: './service-card.component.css'
})
export class ServiceCardComponent {
  @Input() service: Service;
  @Input() showActions: boolean;
}
