import { TestBed } from '@angular/core/testing';

import { BeansApiService } from './beans-api.service';

describe('BeansApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BeansApiService = TestBed.get(BeansApiService);
    expect(service).toBeTruthy();
  });
});
