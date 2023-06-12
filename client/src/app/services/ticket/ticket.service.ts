import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket } from '../../api/ticket';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  baseURL: string = '/api/v1/ticket';
  constructor(private http: HttpClient) {}

  createTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>(this.baseURL, ticket);
  }
}
