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

    const req = httpController.expectOne(`${environment.apiHost}/companies`);
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

    const req = httpController.expectOne(`${environment.apiHost}/companies`);
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

    const req = httpController.expectOne(`${environment.apiHost}/companies`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(request);

    req.flush({ message: 'Server error' }, { status: 500, statusText: 'Server Error' });
  });
});
