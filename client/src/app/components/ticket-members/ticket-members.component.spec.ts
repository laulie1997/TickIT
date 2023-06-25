import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketMembersComponent } from './ticket-members.component';

describe('TicketMembersComponent', () => {
  let component: TicketMembersComponent;
  let fixture: ComponentFixture<TicketMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketMembersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
