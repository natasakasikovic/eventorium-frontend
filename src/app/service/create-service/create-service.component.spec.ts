import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {CreateServiceComponent} from './create-service.component';
import {ServiceService} from '../service.service';
import {EventTypeService} from '../../event-type/event-type.service';
import {CategoryService} from '../../category/category.service';
import {Router} from '@angular/router';
import {of} from 'rxjs';
import {categoriesMock} from '../../../testing/mocks/category.mock';
import {eventTypesMock} from '../../../testing/mocks/event-type.mock';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {MaterialModule} from '../../infrastructure/material/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Service} from '../model/service.model';
import {By} from '@angular/platform-browser';
import {invalidCreateServiceFormTestCases, mockValidServiceForm} from '../../../testing/mocks/service-form.mock';
import {runInvalidFormTestCases} from '../../../testing/util/form-validation.utils';

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

    categoryServiceSpy.getAll.and.returnValue(of(categoriesMock));
    eventTypeServiceSpy.getAll.and.returnValue(of(eventTypesMock));

    fixture.detectChanges();
  });

  it('should create component', () => {
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
      category: '',
      visible: null,
      available: null,
      reservationDeadline: '',
      cancellationDeadline: '',
      minDuration: 6,
      maxDuration: 12
    });
  });

  it('should load categories and event types on init', fakeAsync(() => {
    tick();

    expect(eventTypeServiceSpy.getAll).toHaveBeenCalled();
    expect(categoryServiceSpy.getAll).toHaveBeenCalled();
    expect(component.categories).toEqual(categoriesMock);
    expect(component.eventTypes).toEqual(eventTypesMock);
  }));

  it('should enable Create button when the form is valid', () => {
    const createButton = fixture.nativeElement.querySelector('.create-button');
    form.patchValue(mockValidServiceForm);

    fixture.detectChanges();

    expect(createButton.disabled).toBeFalsy();
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
    form.controls['category'].setValue(categoriesMock[0]);

    fixture.detectChanges();

    const suggestionNameField = fixture.debugElement.query(By.css('input[formControlName="suggestedCategoryName"]'));
    const suggestionDescField = fixture.debugElement.query(By.css('textarea[formControlName="suggestedCategoryDescription"]'));
    expect(suggestionNameField).toBeNull();
    expect(suggestionDescField).toBeNull();
  });

  it('should disable Create button when the form is invalid', () => {
    runInvalidFormTestCases(
      form,
      fixture,
      ".create-button",
      mockValidServiceForm,
      invalidCreateServiceFormTestCases
    )
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

  it('should set uploaded images one by one in imagePreviews', () => {
    const files = [
      new File(['dummy content'], 'image1.jpg', { type: 'image/jpeg' }),
      new File(['dummy content'], 'image2.png', { type: 'image/png' }),
    ];

    let mockEvent = { target: { files: [files[0]] } } as unknown as Event;
    component.onFilesSelected(mockEvent);

    mockEvent = { target: { files: [files[1]] } } as unknown as Event;
    component.onFilesSelected(mockEvent);

    fixture.detectChanges();

    expect(component.images.length).toBe(2);
    expect(component.imagePreviews.length).toBe(2);
  });

  it('should not create empty category suggestion', () => {
    const createButton = fixture.nativeElement.querySelector('.create-button');
    form.patchValue(mockValidServiceForm);
    form.controls['category'].setValue(null);

    fixture.detectChanges();

    expect(form.invalid).toBeTruthy();
    expect(createButton.disabled).toBeTruthy();
  });

  it('should call service creation when form is valid', fakeAsync(() => {
    const createButton = fixture.nativeElement.querySelector('.create-button');
    form.patchValue(mockValidServiceForm);
    fixture.detectChanges();

    serviceServiceSpy.create.and.returnValue(of(mockValidServiceForm as unknown as Service));
    createButton.click();
    tick();

    expect(serviceServiceSpy.create).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['manageable-services']);
  }));

});
