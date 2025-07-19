import {AuthService} from './auth.service';
import {TestBed} from '@angular/core/testing';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {provideHttpClient} from '@angular/common/http';
import {AuthRequest} from './model/auth-request.model';
import {mockValidAuthRequest} from '../../testing/mocks/auth-request.mock';
import {AuthResponse} from './model/auth-response.model';
import {environment} from '../../env/environment';

describe('AuthService', () => {
  let service: AuthService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  })

  it('should send POST request and return registered user', () => {
    const request: AuthRequest = mockValidAuthRequest;
    const mockResponse: AuthResponse = null;

    service.registerUser(request).subscribe(response => {
      expect(response).toEqual(mockResponse);
      expect(req.request.url).toBe(`${environment.apiHost}/auth/registration`);
      expect(req.request.body).toEqual(request);
    });

    const req = httpController.expectOne(`${environment.apiHost}/auth/registration`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(request);

    req.flush(mockResponse);
  });

  it('should return validation errors on bad request (400)', () => {
    const request = mockValidAuthRequest;
    service.registerUser(request).subscribe({
      next: () => fail('Expected validation error'),
      error: (err) => {
        expect(err.status).toBe(400);
        expect(err.error.message).toContain('Validation');
        expect(req.request.url).toBe(`${environment.apiHost}/auth/registration`);
        expect(req.request.body).toEqual(request);
      }
    });

    const req = httpController.expectOne(`${environment.apiHost}/auth/registration`);
    req.flush({ message: 'Validation failed' }, { status: 400, statusText: 'Bad Request' });
  });

  it('should handle 500 server error gracefully', () => {
    const request = mockValidAuthRequest;
    service.registerUser(request).subscribe({
      next: () => fail('Expected error 500, but got success'),
      error: (err) => {
        expect(err.status).toBe(500);
        expect(req.request.url).toBe(`${environment.apiHost}/auth/registration`);
        expect(req.request.body).toEqual(request);
      }
    });

    const req = httpController.expectOne(`${environment.apiHost}/auth/registration`);
    req.flush({ message: 'Internal server error' }, { status: 500, statusText: 'Server Error' });
  });
});
