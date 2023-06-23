import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor(private snackBar: MatSnackBar) {}
  showErrorMessage(message: string): void {
    this.snackBar.open(message, 'Schließen', {
      duration: 3000,
      panelClass: 'error-toast',
    });
  }
}
