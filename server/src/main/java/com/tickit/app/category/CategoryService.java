package com.tickit.app.category;

import com.tickit.app.project.ProjectService;
import com.tickit.app.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service to manage {@link Category} entity.
 */
@Service
public class CategoryService {
    @NonNull
    private final CategoryRepository categoryRepository;
    @NonNull
    private final ProjectService projectService;

    @Autowired
    public CategoryService(
            @NonNull final CategoryRepository categoryRepository,
            @NonNull ProjectService projectService) {
        this.categoryRepository = categoryRepository;
        this.projectService = projectService;
    }

    /**
     * Retrieves the category with the given id
     *
     * @param id of the category to be fetched
     * @return {@link Category}^
     * @throws CategoryNotFoundException if no category with the given id was found
     */
    @NonNull
    public Category getCategory(@NonNull final Long id) {
        return categoryRepository.findById(id).orElseThrow(() -> new CategoryNotFoundException(id));
    }

    /**
     * Creates the given category
     *
     * @param category to be created
     * @return saved category
     */
    @NonNull
    public Category createCategory(@NonNull final Long projectId, @NonNull final Category category) {
        category.setProject(projectService.getProject(projectId));
        return categoryRepository.save(category);
    }

    /**
     * Updates the given category
     *
     * @param category to be updated
     * @return saved category
     */
    @NonNull
    public Category updateCategory(@NonNull final Category category) {
        final var dbCategory = getCategory(category.getId());
        dbCategory.setName(category.getName());
        dbCategory.setColor(category.getColor());
        return categoryRepository.save(dbCategory);
    }

    /**
     * Deletes the category with the given id
     *
     * @param id category id
     * @return {@code true} if the deletion was successful
     */
    public boolean deleteCategory(@NonNull final Long id) {
        categoryRepository.deleteById(id);
        return true;
    }

    /**
     * Retrieves the categories which belong to the given project
     *
     * @param projectId project whose categories shall be fetched
     * @return list of categories
     */
    public List<Category> getCategoriesOfProject(@NonNull final Long projectId) {
        return categoryRepository.getCategoriesOfProject(projectId);
    }
}
