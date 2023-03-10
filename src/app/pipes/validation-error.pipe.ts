import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

enum ValidationErrorCodes {
  REQUIRED = 'required',
  EMAIL = 'email',
}

@Pipe({ name: 'displayValidationError' })
export class ValidationErrorPipe implements PipeTransform {
  transform(value: ValidationErrors | null): string {
    let validationMessages: string[] = [];
    if (!value || value[ValidationErrorCodes.EMAIL]) {
      validationMessages.push('email is invalid');
    }
    if (!value || value[ValidationErrorCodes.REQUIRED]) {
      validationMessages.push('this field is required');
    }
    return validationMessages.toString();
  }
}
