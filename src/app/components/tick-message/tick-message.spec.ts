import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TickMessage } from './tick-message';

describe('TickMessage', () => {
  let component: TickMessage;
  let fixture: ComponentFixture<TickMessage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TickMessage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TickMessage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
