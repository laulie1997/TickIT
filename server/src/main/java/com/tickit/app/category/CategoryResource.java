package com.tickit.app.category;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/project/{projectId}/category")
public class CategoryResource {
    @NonNull
    private final CategoryService categoryService;

    @Autowired
    public CategoryResource(@NonNull final CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public CategoryWrapper getCategories(@PathVariable final Long projectId) {
        return new CategoryWrapper(categoryService.getCategoriesOfProject(projectId));
    }

    @PostMapping
    public Category createCategory(@PathVariable final Long projectId, @RequestBody final Category category) {
        return categoryService.createCategory(projectId, category);
    }

    @DeleteMapping("{categoryId}")
    public boolean deleteCategory(@PathVariable final Long categoryId) {
        return categoryService.deleteCategory(categoryId);
    }

    @PutMapping("{categoryId}")
    public Category updateCategory(@PathVariable final Long categoryId, @RequestBody final Category category) {
        category.setId(categoryId);
        return categoryService.updateCategory(category);
    }
}
