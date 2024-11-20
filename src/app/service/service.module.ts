import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageableServicesComponent } from './manageable-services/manageable-services.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatIconButton} from '@angular/material/button';
import {SharedModule} from '../shared/shared.module';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIcon} from '@angular/material/icon';
import {RouterLink} from '@angular/router';
import {MaterialModule} from '../infrastructure/material/material.module';
import { CreateServiceComponent } from './create-service/create-service.component';
import { EditServiceComponent } from './edit-service/edit-service.component';
import { ServiceDetailsComponent } from './service-details/service-details.component';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatCheckbox} from '@angular/material/checkbox';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {ReactiveFormsModule} from '@angular/forms';
import { TopFiveServicesComponent } from './top-five-services/top-five-services.component';
import {MatSlider, MatSliderRangeThumb, MatSliderThumb} from "@angular/material/slider";
import {MatGridList, MatGridTile} from '@angular/material/grid-list';
import {MatListOption, MatSelectionList} from '@angular/material/list';
import {MatAccordion, MatExpansionPanel, MatExpansionPanelTitle} from "@angular/material/expansion";
import {MatOption, MatSelect} from '@angular/material/select';



@NgModule({
  declarations: [
    ManageableServicesComponent,
    CreateServiceComponent,
    EditServiceComponent,
    ServiceDetailsComponent,
    TopFiveServicesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    RouterLink,
    ReactiveFormsModule,
    MatGridList,
    MatGridTile,
    MatListOption,
    MatSelectionList,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatSelect,
    MatOption,
  ],
  exports: [
    TopFiveServicesComponent
  ]
})
export class ServiceModule { }
