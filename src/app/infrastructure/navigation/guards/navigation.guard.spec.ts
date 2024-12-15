import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { eventAgendaGuard } from './navigation.guard';

describe('eventAgendaGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
      TestBed.runInInjectionContext(() => eventAgendaGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
