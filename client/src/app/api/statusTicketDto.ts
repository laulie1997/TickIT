import { Status } from './status';
import { Ticket } from './ticket';

export interface StatusTicketDto {
  status: Status;
  tickets: Array<Ticket>;
}
