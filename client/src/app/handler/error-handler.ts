import { ErrorHandler, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../services/error/error.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private errorService: ErrorService) {
  }

  handleError(error: any): void {
    this.errorService.showErrorMessage('Es ist ein Fehler aufgetreten');
    if (error instanceof HttpErrorResponse) {
      if (error.status === 404) {
        this.errorService.showErrorMessage(
          'Die Seite konnte nicht gefunden werden'
        );
      } else if (error.status === 500) {
        this.errorService.showErrorMessage('Interner Server Fehler');
      } else if (error.status === 401) {
        this.errorService.showErrorMessage(
          'Bitte authentifizieren Sie sich, um diese Aktion auszuführen');
      } else if (error.status === 403) {
        this.errorService.showErrorMessage(
          'Sie sind nicht berechtigt diese Aktion auszuführen');
      } else if (error instanceof TypeError) {
        console.log('Type Error:', error);
      } else {
        this.errorService.showErrorMessage(
          'Es ist ein unbekannter Fehler aufgetreten'
        );
      }
    }
  }
}


