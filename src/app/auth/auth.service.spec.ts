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

  it('should return validation errors on bad request', () => {
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
    req.flush({ message: 'Server error' }, { status: 500, statusText: 'Server Error' });
  });

  it('should send POST request with FormData and return text response', () => {
    const userId = 1;
    const mockFile = new File(['dummy content'], 'profile.jpg', { type: 'image/jpeg' });
    const expectedResponse = 'Photo uploaded successfully';

    service.uploadProfilePhoto(userId, mockFile).subscribe(response => {
      expect(response).toBe(expectedResponse);
      expect(req.request.url).toBe(`${environment.apiHost}/auth/${userId}/profile-photo`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body instanceof FormData).toBeTrue();

      const formData = req.request.body as FormData;
      expect(formData.has('profilePhoto')).toBeTrue();
    });

    const req = httpController.expectOne(`${environment.apiHost}/auth/${userId}/profile-photo`);
    req.flush(expectedResponse);
  });

  it('should return error when upload fails with 500', () => {
    const userId = 1;
    const mockFile = new File(['dummy content'], 'profile.jpg', { type: 'image/jpeg' });

    service.uploadProfilePhoto(userId, mockFile).subscribe({
      next: () => fail('Expected 500 server error'),
      error: (err) => {
        expect(err.status).toBe(500);
        expect(req.request.url).toBe(`${environment.apiHost}/auth/${userId}/profile-photo`);
        expect(req.request.method).toBe('POST');
      }
    });

    const req = httpController.expectOne(`${environment.apiHost}/auth/${userId}/profile-photo`);
    req.flush({ message: 'Server error' }, { status: 500, statusText: 'Server Error' });
  });

});
