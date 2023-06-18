import { Component, Inject, OnInit } from '@angular/core';
import { Project } from '../../api/project';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Category } from '../../api/category';
import { CategoryService } from '../../services/category/category.service';

@Component({
  selector: 'app-categories-modal',
  templateUrl: './categories-modal.component.html',
  styleUrls: ['./categories-modal.component.css'],
})
export class CategoriesModalComponent implements OnInit {
  form: UntypedFormGroup;
  category: Category = {};
  editMode: boolean;
  project: Project = {};
  projectId: number;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { categoryId: number; projectId: number },
    public dialogRef: MatDialogRef<CategoriesModalComponent>,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.editMode = this.data.categoryId != null;
    if (this.editMode) {
      this.categoryService
        .getCategory(this.data.categoryId)
        .subscribe((category: Category) => {
          this.category = category;
          this.buildForm();
        });
    }
    this.buildForm();
  }
  private buildForm() {
    this.form = this.formBuilder.group({
      name: [this.category.name || '', [Validators.required]],
    });
  }

  saveCategory() {
    this.category.name = this.form.get('name').value;
    if (!this.editMode) {
      this.category.project = { id: this.data.projectId };
    }
    (this.editMode
      ? this.categoryService.updateCategory(this.category)
      : this.categoryService.createCategory(this.data.projectId, this.category)
    ).subscribe(() => this.dialogRef.close(true));
  }

  deleteCategory() {
    this.categoryService.deleteCategory(this.category).subscribe(() => {
      this.dialogRef.close(true);
    });
  }
}
