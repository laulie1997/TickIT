package com.tickit.app.project;

import com.tickit.app.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

/**
 * Service for managing {@link Project} entities
 */
@Service
public class ProjectService {
    @NonNull
    private final ProjectRepository projectRepository;

    @Autowired
    public ProjectService(@NonNull final ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    /**
     * Retrieves the project with the given id
     *
     * @param id of the project to be fetched
     * @return {@link Project
     * @throws if no project with the given id was found
     */
    @NonNull
    public Project getProject(@NonNull final Long id) {
        return projectRepository.findById(id).orElseThrow(() -> new RuntimeException("Project with id " + id + " does not exist"));
    }

    /**
     * Initializes default statuses and saves the given project
     *
     * @param project to be created
     * @return saved project
     */
    @NonNull
    public Project createProject(@NonNull final Project project) {
        // TODO initialize project with default statuses
        return projectRepository.save(project);
    }

    /**
     * Updates the given project
     *
     * @param project to be updated
     * @return saved project
     */
    @NonNull
    public Project updateProject(@NonNull final Project project) {
        if (!projectRepository.existsById(project.getId())) {
            throw new RuntimeException("Project with id " + project.getId() + " does not exist.");
        }
        return projectRepository.save(project);
    }

    /**
     * Deletes the project with the given id
     *
     * @param id project id
     * @return {@code true} if deletion was successful
     */
    public boolean deleteProject(@NonNull final Long id) {
        projectRepository.deleteById(id);
        return true;
    }
}
