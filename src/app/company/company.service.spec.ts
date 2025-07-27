import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {provideHttpClient} from '@angular/common/http';
import {CompanyService} from './company.service';
import {environment} from '../../env/environment';
import {CompanyRequest} from './model/company-request.model';
import {CompanyResponse} from './model/company-response.model';
import {validCompanyRequestMock} from '../../testing/mocks/company.mock';

describe('CompanyService', () => {
  let service: CompanyService;
  let httpController: HttpTestingController;
  const endpoint = `${environment.apiHost}/companies`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CompanyService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(CompanyService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send POST request and return created company', () => {
    const request: CompanyRequest = validCompanyRequestMock;
    const mockResponse: CompanyResponse = {id: 1, name: 'test'};

    service.createCompany(request).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpController.expectOne(endpoint);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(request);

    req.flush(mockResponse);
  });

  it('should return validation errors on bad request', () => {
    const request = validCompanyRequestMock;

    service.createCompany(request).subscribe({
      next: () => fail('Expected validation error'),
      error: (err) => {
        expect(err.status).toBe(400);
        expect(err.error.message).toContain('Validation');
      }
    });

    const req = httpController.expectOne(endpoint);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(request);

    req.flush({ message: 'Validation failed' }, { status: 400, statusText: 'Bad Request' });
  });

  it('should handle 500 server error gracefully', () => {
    const request = validCompanyRequestMock;

    service.createCompany(request).subscribe({
      next: () => fail('Expected error 500, but got success'),
      error: (err) => {
        expect(err.status).toBe(500);
      }
    });

    const req = httpController.expectOne(endpoint);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(request);

    req.flush({ message: 'Server error' }, { status: 500, statusText: 'Server Error' });
  });

  it('should send POST request to upload images', () => {
    const companyId = 1;
    const mockFile1 = new File(['dummy content 1'], 'image1.png', { type: 'image/png' });
    const mockFile2 = new File(['dummy content 2'], 'image2.jpg', { type: 'image/jpeg' });
    const images: File[] = [mockFile1, mockFile2];

    service.uploadImages(companyId, images).subscribe(response => {
      expect(typeof response).toBe('string');
    });

    const req = httpController.expectOne(`${environment.apiHost}/companies/${companyId}/images`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body instanceof FormData).toBeTrue();

    const formData = req.request.body as FormData;
    const entries = Array.from(formData.getAll('images'));

    expect(entries.length).toBe(2);
    expect(entries[0]).toEqual(mockFile1);
    expect(entries[1]).toEqual(mockFile2);


    req.flush('', { status: 200, statusText: 'OK' });
  });

  it('should handle error when image upload fails', () => {
    const companyId = 1;
    const mockFile = new File(['dummy content'], 'image.png', { type: 'image/png' });

    service.uploadImages(companyId, [mockFile]).subscribe({
      next: () => fail('Expected error, but got success'),
      error: (err) => {
        expect(err.status).toBe(500);
        expect(err.statusText).toBe('Server Error');
      }
    });

    const req = httpController.expectOne(`${environment.apiHost}/companies/${companyId}/images`);
    expect(req.request.method).toBe('POST');

    req.flush({ message: 'Server error' }, { status: 500, statusText: 'Server Error' });
  });

});
