import {Component, OnInit} from '@angular/core';
import {Category} from "../../api/category";
import {CategoryService} from "../../services/category/category.service";
import {CategoriesModalComponent} from "../categories-modal/categories-modal.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit{
  categories: Category[] = [];
  constructor(private categoryService: CategoryService,
              private dialog: MatDialog,) {
  }

  ngOnInit(): void {
  }

  fetchCategories(projectId: any) {
    this.categoryService
      .getCategories(projectId)
      .subscribe((categories: Category[]) => {
        this.categories = categories;
        console.log(this.categories);
      });
  }

  openEditCategoryModal(): void {
    const dialogRef = this.dialog.open(CategoriesModalComponent, {
      width: '500px',
      data: {},
    });
  }
}
