package com.tickit.app.ticket;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@Getter
@Setter
public class ProjectTicketWrapper {

    Map<String, List<Ticket>> statusTicketMap;

    public ProjectTicketWrapper(Map<String, List<Ticket>> statusTicketMap) {
        this.statusTicketMap = statusTicketMap;
    }
}