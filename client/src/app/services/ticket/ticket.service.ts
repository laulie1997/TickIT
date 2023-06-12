import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  baseURL: string = '/api/v1/ticket/';
  constructor() {}
}
