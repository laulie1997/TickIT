package com.tickit.app.repository;

import com.tickit.app.project.Project;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Jpa repository for {@link Project} entity
 */
public interface ProjectRepository extends JpaRepository<Project, Long> {
}
