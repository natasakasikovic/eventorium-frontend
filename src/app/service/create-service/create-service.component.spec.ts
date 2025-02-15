import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {CreateServiceComponent} from './create-service.component';
import {ServiceService} from '../service.service';
import {EventTypeService} from '../../event-type/event-type.service';
import {CategoryService} from '../../category/category.service';
import {Router} from '@angular/router';
import {of} from 'rxjs';
import {mockCategories} from '../../../testing/mocks/mock-categories';
import {mockEventTypes} from '../../../testing/mocks/mock-event-types';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {MaterialModule} from '../../infrastructure/material/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Service} from '../model/service.model';
import {By} from '@angular/platform-browser';
import {mockValidService} from '../../../testing/mocks/mock-services';

describe('CreateServiceComponent', () => {
  let component: CreateServiceComponent;
  let fixture: ComponentFixture<CreateServiceComponent>;
  let serviceServiceSpy: jasmine.SpyObj<ServiceService>;
  let eventTypeServiceSpy: jasmine.SpyObj<EventTypeService>;
  let categoryServiceSpy: jasmine.SpyObj<CategoryService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let toasterSpy: jasmine.SpyObj<ToastrService>;
  let form: FormGroup;

  beforeEach(async () => {
    serviceServiceSpy = jasmine.createSpyObj('ServiceService', ['create', 'uploadFiles']);
    categoryServiceSpy = jasmine.createSpyObj('CategoryService', ['getAll']);
    eventTypeServiceSpy = jasmine.createSpyObj('EventTypeService', ['getAll']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    toasterSpy = jasmine.createSpyObj('ToastrService', ['success', 'error', 'info']);

    await TestBed.configureTestingModule({
      declarations: [CreateServiceComponent],
      providers: [
        { provide: CategoryService, useValue: categoryServiceSpy },
        { provide: EventTypeService, useValue: eventTypeServiceSpy },
        { provide: ServiceService, useValue: serviceServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ToastrService, useValue: toasterSpy }
      ],
      imports: [ReactiveFormsModule, MaterialModule, BrowserAnimationsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateServiceComponent);
    component = fixture.componentInstance;
    form = component.createServiceForm;

    categoryServiceSpy.getAll.and.returnValue(of(mockCategories));
    eventTypeServiceSpy.getAll.and.returnValue(of(mockEventTypes));

    fixture.detectChanges();
  });

  it('should create and initialize form with default values', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with default values', () => {
    expect(component.createServiceForm.value).toEqual({
      name: '',
      price: '',
      discount: '',
      description: '',
      specialties: '',
      eventTypes: [],
      type: '',
      suggestedCategoryName: null,
      suggestedCategoryDescription: null,
      category: null,
      visible: false,
      available: false,
      reservationDeadline: '',
      cancellationDeadline: '',
      minDuration: 6,
      maxDuration: 12
    });
  });

  it('should load categories and event types on init', fakeAsync(() => {
    component.ngOnInit();
    tick();

    expect(eventTypeServiceSpy.getAll).toHaveBeenCalled();
    expect(categoryServiceSpy.getAll).toHaveBeenCalled();
    expect(component.categories).toEqual(mockCategories);
    expect(component.eventTypes).toEqual(mockEventTypes);
  }));

  it('should enable Create button when the form is valid', () => {
    const createButton = fixture.nativeElement.querySelector('.create-button');
    form.patchValue(mockValidService);

    fixture.detectChanges();

    expect(createButton.disabled).toBeFalse();
  });

  it('should enable category suggestion fields when "Suggest a Category" is selected', () => {
    form.get('category').setValue(null);

    fixture.detectChanges();

    const suggestionNameField = fixture.debugElement.query(By.css('input[formControlName="suggestedCategoryName"]'));
    const suggestionDescField = fixture.debugElement.query(By.css('textarea[formControlName="suggestedCategoryDescription"]'));
    expect(suggestionNameField).toBeTruthy();
    expect(suggestionDescField).toBeTruthy();
  });

  it('should disable category suggestion fields when a category is selected', () => {
    form.controls['category'].setValue(mockCategories[0]);

    fixture.detectChanges();

    const suggestionNameField = fixture.debugElement.query(By.css('input[formControlName="suggestedCategoryName"]'));
    const suggestionDescField = fixture.debugElement.query(By.css('textarea[formControlName="suggestedCategoryDescription"]'));
    expect(suggestionNameField).toBeNull();
    expect(suggestionDescField).toBeNull();
  });

  it('should disable Create button when the form is invalid', () => {
    const discountControl = component.createServiceForm.controls['discount'];
    const priceControl = component.createServiceForm.controls['price'];
    const createButton = fixture.nativeElement.querySelector('.create-button');
    discountControl.setValue(101);
    priceControl.setValue(-1);

    fixture.detectChanges();

    expect(discountControl.valid).toBeFalse();
    expect(priceControl.valid).toBeFalse();
    expect(createButton.disabled).toBeTrue();
  });

  it('should ignore invalid file types', () => {
    const invalidFile = new File([''], 'test.txt', { type: 'text/plain' });
    const validFile = new File(['dummy content'], 'image1.jpg', { type: 'image/jpeg' });
    const mockEvent = { target: { files: [invalidFile, validFile] } } as unknown as Event;

    component.onFilesSelected(mockEvent);

    expect(component.images.length).toBe(1);
    expect(component.imagePreviews.length).toBe(1);
  });

  it('should set uploaded images in imagePreviews', () => {
    const files = [
      new File(['dummy content'], 'image1.jpg', { type: 'image/jpeg' }),
      new File(['dummy content'], 'image2.png', { type: 'image/png' }),
    ];
    const mockEvent = { target: { files: files } } as unknown as Event;

    component.onFilesSelected(mockEvent);
    fixture.detectChanges();

    expect(component.images.length).toBe(2);
    expect(component.imagePreviews.length).toBe(2);
  });

  it('should not create empty category suggestion', () => {
    const createButton = fixture.nativeElement.querySelector('.create-button');
    form.patchValue(mockValidService);
    form.controls['category'].setValue(null);

    fixture.detectChanges();

    expect(form.invalid).toBeTrue();
    expect(createButton.disabled).toBeTrue();
  });

  it('should call service creation when form is valid', fakeAsync(() => {
    const createButton = fixture.nativeElement.querySelector('.create-button');
    form.patchValue(mockValidService);
    fixture.detectChanges();

    serviceServiceSpy.create.and.returnValue(of(mockValidService as unknown as Service));
    createButton.click();
    tick();

    expect(serviceServiceSpy.create).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['manageable-services']);
  }));

});
