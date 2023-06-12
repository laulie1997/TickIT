import { Ticket } from './ticket';

export interface ProjectTicketWrapper {
  statusTicketMap?: Map<string, Ticket[]>;
}
