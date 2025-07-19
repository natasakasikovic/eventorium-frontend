import {CompanyRegisterComponent} from './company-register.component';
import {ComponentFixture, fakeAsync, flush, TestBed} from '@angular/core/testing';
import {CompanyService} from '../company.service';
import {SharedService} from '../../shared/shared.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../infrastructure/material/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthService} from '../../auth/auth.service';
import {of} from 'rxjs';
import {citiesMock} from '../../../testing/mocks/city.mock';
import {invalidCreationTestCases, validCompanyFormMock} from '../../../testing/mocks/company-form.mock';
import {CompanyResponse} from '../model/company-response.model';
import {runInvalidFormTestCases} from '../../../testing/util/form-validation.utils';
import {mockValidRegistrationForm} from '../../../testing/mocks/registration-form.mock';

describe('CompanyRegisterComponent', () => {
  let component: CompanyRegisterComponent;
  let fixture: ComponentFixture<CompanyRegisterComponent>;
  let companyServiceSpy: jasmine.SpyObj<CompanyService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let sharedServiceSpy: jasmine.SpyObj<SharedService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    companyServiceSpy = jasmine.createSpyObj('CompanyService', ['createCompany', 'uploadImages']);
    authServiceSpy = jasmine.createSpyObj('AuthService', ['getUserId']);
    sharedServiceSpy = jasmine.createSpyObj('SharedService', ['getCities'])
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [CompanyRegisterComponent],
      providers: [
        { provide: CompanyService, useValue: companyServiceSpy },
        { provide: SharedService, useValue: sharedServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: ActivatedRoute, useValue: { params: of({ 'provider-id': 123 }) } },
      ],
      imports: [ReactiveFormsModule, MaterialModule, BrowserAnimationsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyRegisterComponent);
    component = fixture.componentInstance;

    sharedServiceSpy.getCities.and.returnValue(of(citiesMock));

    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values', () => {
    const formValue = component.companyForm.value;
    for (const key in formValue)
      expect(formValue[key]).toBe('');
  });

  it('should load params and cities on init', fakeAsync(() => {
    flush();

    expect(sharedServiceSpy.getCities).toHaveBeenCalled();
    expect(component.providerId).toBe(123);
  }));

  it('should enable submit button when form is valid', () => {
    const submitButton = fixture.nativeElement.querySelector('.submit-button');
    component.companyForm.patchValue(validCompanyFormMock);

    fixture.detectChanges();

    expect(submitButton.disabled).toBeFalsy();
  });

  it('should validate required fields', () => {
    runInvalidFormTestCases(
      component.companyForm,
      fixture,
      '.submit-button',
      mockValidRegistrationForm,
      invalidCreationTestCases
    );
  });

  it('should ignore invalid file types', () => {
    const invalidFile = new File([''], 'test.txt', { type: 'text/plain' });
    const validFile = new File(['dummy content'], 'image1.jpg', { type: 'image/jpeg' });
    const mockEvent = { target: { files: [invalidFile, validFile] } } as unknown as Event;

    component.onImageUpload(mockEvent);

    expect(component.images.length).toBe(1);
    expect(component.imagePreviews.length).toBe(1);
  });

  it('should set uploaded images in imagePreviews', () => {
    const files = [
      new File(['dummy content'], 'image1.jpg', { type: 'image/jpeg' }),
      new File(['dummy content'], 'image2.png', { type: 'image/png' }),
    ];
    const mockEvent = { target: { files: files } } as unknown as Event;

    component.onImageUpload(mockEvent);
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
    component.onImageUpload(mockEvent);

    mockEvent = { target: { files: [files[1]] } } as unknown as Event;
    component.onImageUpload(mockEvent);

    fixture.detectChanges();

    expect(component.images.length).toBe(2);
    expect(component.imagePreviews.length).toBe(2);
  });

  it('should call company creation when form is valid', fakeAsync(() => {
    const form = component.companyForm;
    const submitButton = fixture.nativeElement.querySelector('.submit-button');
    form.patchValue(validCompanyFormMock);
    component.images = [];
    fixture.detectChanges();

    companyServiceSpy.createCompany.and.returnValue(of(validCompanyFormMock as unknown as CompanyResponse));
    submitButton.click();
    flush();

    expect(companyServiceSpy.createCompany).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']); // homepage
  }));

  it('should call company creation and image upload when form is valid', fakeAsync(() => {
    const form = component.companyForm;
    const submitButton = fixture.nativeElement.querySelector('.submit-button');
    form.patchValue(validCompanyFormMock);
    component.images = [
      new File(['dummy content'], 'image1.jpg', { type: 'image/jpeg' }),
      new File(['dummy content'], 'image2.png', { type: 'image/png' })
    ]
    fixture.detectChanges();

    companyServiceSpy.createCompany.and.returnValue(of(validCompanyFormMock as unknown as CompanyResponse));
    companyServiceSpy.uploadImages.and.returnValue(of(void 0));

    submitButton.click();
    flush();

    expect(companyServiceSpy.createCompany).toHaveBeenCalled();
    expect(companyServiceSpy.uploadImages).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']); // homepage
  }))
});
