package com.tickit.app.project;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/project/{projectId}/status")
public class StatusResource {
    @NonNull
    private final StatusService statusService;

    @Autowired
    public StatusResource(@NonNull StatusService statusService) {
        this.statusService = statusService;
    }

    @PostMapping
    public Status createStatus(@PathVariable("projectId") Long projectId, @RequestBody final Status status) {
        return statusService.createStatus(projectId, status);
    }

    @PutMapping("{statusId}")
    public Status updateStatus(@PathVariable final Long statusId, @RequestBody final Status status) {
        status.setId(statusId);
        return statusService.updateStatus(status);
    }

    @DeleteMapping("{statusId}")
    public boolean deleteStatus(@PathVariable final Long statusId) {
        return statusService.deleteStatus(statusId);
    }
}
