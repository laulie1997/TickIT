import { ErrorHandler, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../services/error/error.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private errorService: ErrorService) {}
  handleError(error: any): void {
    this.errorService.showErrorMessage('An error occurred');
    if (error instanceof HttpErrorResponse) {
      if (error.status === 404) {
        this.errorService.showErrorMessage('Resource not found');
      } else if (error.status === 500) {
        this.errorService.showErrorMessage('Internal Server Error');
      }
    } else if (error instanceof TypeError) {
      this.errorService.showErrorMessage('Type Error');
    } else {
      this.errorService.showErrorMessage('Unknown Error');
    }
  }
}
