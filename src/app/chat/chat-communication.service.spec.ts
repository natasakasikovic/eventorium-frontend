import { TestBed } from '@angular/core/testing';

import { ChatCommunicationService } from './chat-communication.service';

describe('ChatCommunicationService', () => {
  let service: ChatCommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatCommunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
