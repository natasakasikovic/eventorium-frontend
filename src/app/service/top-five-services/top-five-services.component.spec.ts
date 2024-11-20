import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopFiveServicesComponent } from './top-five-services.component';

describe('TopFiveServicesComponent', () => {
  let component: TopFiveServicesComponent;
  let fixture: ComponentFixture<TopFiveServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopFiveServicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopFiveServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
