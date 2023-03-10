import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

enum ValidationErrorCodes {
  REQUIRED = 'required',
  EMAIL = 'email',
  MIN_LENGTH = 'minlength',
  NUMBER_CHARACTER = 'numberCharacter',
  SPECIAL_CHARACTER = 'specialCharacter',
  CAPITAL_CHARACTER = 'capitalCharacter',
  SMALL_CHARACTER = 'smallCharacter',
  PASSWORD_MATCH = 'passwordMatch',
  REQUIRED_TRUE = 'requiredTrue',
  BIO_LENGTH = 'bioLength',
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
    if (!value || value[ValidationErrorCodes.MIN_LENGTH]) {
      validationMessages.push('minimal length is 8');
    }
    if (!value || value[ValidationErrorCodes.NUMBER_CHARACTER]) {
      validationMessages.push('missing a number character');
    }
    if (!value || value[ValidationErrorCodes.SPECIAL_CHARACTER]) {
      validationMessages.push('missing a special character');
    }
    if (!value || value[ValidationErrorCodes.CAPITAL_CHARACTER]) {
      validationMessages.push('missing a capital character');
    }
    if (!value || value[ValidationErrorCodes.SMALL_CHARACTER]) {
      validationMessages.push('missing a small character');
    }
    if (!value || value[ValidationErrorCodes.PASSWORD_MATCH]) {
      validationMessages.push('passwords are not the same');
    }
    if (!value || value[ValidationErrorCodes.REQUIRED_TRUE]) {
      validationMessages.push('you need to accept the terms');
    }
    if (!value || value[ValidationErrorCodes.BIO_LENGTH]) {
      validationMessages.push(
        'your bio needs to have at least 10 words and 2 sentences'
      );
    }
    return validationMessages.toString();
  }
}
