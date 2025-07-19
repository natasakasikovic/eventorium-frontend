import {TestBed} from '@angular/core/testing';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {ServiceService} from './service.service';
import {validServiceMock} from '../../testing/mocks/service.mock';
import {provideHttpClient} from '@angular/common/http';
import {environment} from '../../env/environment';
import {CreateService} from './model/create-service.model';
import {Service} from './model/service.model';

describe('ServiceService', () => {
  let service: ServiceService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ServiceService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(ServiceService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send POST request and return created service', () => {
    const createPayload: CreateService = validServiceMock;
    const mockResponse: Service = null;

    service.create(createPayload).subscribe(response => {
      expect(response).toEqual(mockResponse);
      expect(req.request.url).toBe(`${environment.apiHost}/services`);
      expect(req.request.body).toEqual(createPayload);
    });

    const req = httpController.expectOne(`${environment.apiHost}/services`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(createPayload);

    req.flush(mockResponse);
  });

  it('should handle 500 server error gracefully', () => {
    const payload = validServiceMock;
    service.create(payload).subscribe({
      next: () => fail('Expected error, but got success'),
      error: (err) => {
        expect(err.status).toBe(500);
        expect(req.request.url).toBe(`${environment.apiHost}/services`);
        expect(req.request.body).toEqual(payload);
      }
    });

    const req = httpController.expectOne(`${environment.apiHost}/services`);
    req.flush({ message: 'Internal error' }, { status: 500, statusText: 'Server Error' });
  });

  it('should return validation errors on bad input (400)', () => {
    const payload = validServiceMock;
    service.create(payload).subscribe({
      next: () => fail('Expected validation error'),
      error: (err) => {
        expect(err.status).toBe(400);
        expect(err.error.message).toContain('Validation');
        expect(req.request.url).toBe(`${environment.apiHost}/services`);
        expect(req.request.body).toEqual(payload);
      }
    });

    const req = httpController.expectOne(`${environment.apiHost}/services`);
    req.flush({ message: 'Validation failed' }, { status: 400, statusText: 'Bad Request' });
  });

  it('should return 401 Unauthorized when user is not authenticated', () => {
    const payload: CreateService = validServiceMock;

    service.create(payload).subscribe({
      next: () => fail('Expected 401 Unauthorized error'),
      error: (err) => {
        expect(err.status).toBe(401);
        expect(err.statusText).toBe('Unauthorized');
        expect(req.request.url).toBe(`${environment.apiHost}/services`);
        expect(req.request.body).toEqual(payload);
      }
    });

    const req = httpController.expectOne(`${environment.apiHost}/services`);
    req.flush({ message: 'Unauthorized' }, { status: 401, statusText: 'Unauthorized' });
  });

  it('should return 403 Forbidden when user lacks provider role', () => {
    const payload: CreateService = validServiceMock;

    service.create(payload).subscribe({
      next: () => fail('Expected 403 Forbidden error'),
      error: (err) => {
        expect(err.status).toBe(403);
        expect(err.statusText).toBe('Forbidden');
        expect(req.request.url).toBe(`${environment.apiHost}/services`);
        expect(req.request.body).toEqual(payload);
      }
    });

    const req = httpController.expectOne(`${environment.apiHost}/services`);
    req.flush({ message: 'Forbidden' }, { status: 403, statusText: 'Forbidden' });
  });
});
