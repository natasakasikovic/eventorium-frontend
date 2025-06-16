import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { entityResolver } from './entity.resolver';

describe('entityResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => entityResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
