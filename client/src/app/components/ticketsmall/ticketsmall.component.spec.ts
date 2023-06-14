import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsmallComponent } from './ticketsmall.component';

describe('TicketsmallComponent', () => {
  let component: TicketsmallComponent;
  let fixture: ComponentFixture<TicketsmallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TicketsmallComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TicketsmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
