import { ErrorHandler, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    console.error('An error occurred:', error);
    if (error instanceof HttpErrorResponse) {
      if (error.status === 404) {
        console.error('Resource not found:', error.url);
      } else if (error.status === 500) {
        console.error('Internal Server Error:', error.message);
      }
    } else if (error instanceof TypeError) {
      console.error('Type Error:', error.message);
    } else {
      console.error('Unknown Error:', error);
    }
  }
}
