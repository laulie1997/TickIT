package com.tickit.app.project;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/project")
public class ProjectResource {
    @NonNull
    private final ProjectService projectService;

    @Autowired
    public ProjectResource(@NonNull final ProjectService projectService) {
        this.projectService = projectService;
    }

    @PostMapping
    public Project createProject(@RequestBody final Project project) {
        return projectService.createProject(project);
    }

    @GetMapping("{projectId}")
    public Project getProject(@PathVariable Long projectId) {
        return projectService.getProject(projectId);
    }

    @PutMapping("{projectId}")
    public Project updateProject(@PathVariable Long projectId, @RequestBody final Project project) {
        project.setId(projectId);
        return projectService.updateProject(project);
    }

    @DeleteMapping("{projectId}")
    public boolean deleteProject(@PathVariable Long projectId) {
        return projectService.deleteProject(projectId);
    }
}
