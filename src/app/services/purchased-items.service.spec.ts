import { TestBed } from '@angular/core/testing';

import { PurchasedItemsService } from './purchased-items.service';

describe('PurchasedItemsService', () => {
  let service: PurchasedItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PurchasedItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
