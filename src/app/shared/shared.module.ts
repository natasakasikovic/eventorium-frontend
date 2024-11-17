import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '../infrastructure/material/material.module';
import { ServiceCardComponent } from './service-card/service-card.component';
import {RouterLink} from '@angular/router';



@NgModule({
    declarations: [
        ServiceCardComponent
    ],
    exports: [
        ServiceCardComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        RouterLink
    ]
})
export class SharedModule { }
