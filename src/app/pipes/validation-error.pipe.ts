import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

enum VALIDATION_ERROR_CODES {
  REQUIRED = 'required',
  EMAIL = 'email',
  MIN = 'min',
  MIN_LENGTH = 'minlength',
  NUMBER_CHARACTER = 'numberCharacter',
  SPECIAL_CHARACTER = 'specialCharacter',
  CAPITAL_CHARACTER = 'capitalCharacter',
  SMALL_CHARACTER = 'smallCharacter',
  PASSWORD_MATCH = 'passwordMatch',
  REQUIRED_TRUE = 'requiredTrue',
  BIO_LENGTH = 'bioLength',
  WEBSITE_LINK = 'websiteLink',
  LINKEDIN_LINK = 'linkedinLink',
  NO_ACTIVITY_SELECTED = 'noActivitySelected',
}

@Pipe({ name: 'displayValidationError' })
export class ValidationErrorPipe implements PipeTransform {
  transform(value: ValidationErrors | null): string {
    let validationMessages: string[] = [];
    if (!value || value[VALIDATION_ERROR_CODES.EMAIL]) {
      validationMessages.push('email is invalid');
    }
    if (!value || value[VALIDATION_ERROR_CODES.REQUIRED]) {
      validationMessages.push('this field is required');
    }
    if (!value || value[VALIDATION_ERROR_CODES.MIN_LENGTH]) {
      validationMessages.push('minimal length is 8');
    }
    if (!value || value[VALIDATION_ERROR_CODES.NUMBER_CHARACTER]) {
      validationMessages.push('missing a number character');
    }
    if (!value || value[VALIDATION_ERROR_CODES.SPECIAL_CHARACTER]) {
      validationMessages.push('missing a special character');
    }
    if (!value || value[VALIDATION_ERROR_CODES.CAPITAL_CHARACTER]) {
      validationMessages.push('missing a capital character');
    }
    if (!value || value[VALIDATION_ERROR_CODES.SMALL_CHARACTER]) {
      validationMessages.push('missing a small character');
    }
    if (!value || value[VALIDATION_ERROR_CODES.PASSWORD_MATCH]) {
      validationMessages.push('passwords are not the same');
    }
    if (!value || value[VALIDATION_ERROR_CODES.REQUIRED_TRUE]) {
      validationMessages.push('you need to accept the terms');
    }
    if (!value || value[VALIDATION_ERROR_CODES.BIO_LENGTH]) {
      validationMessages.push(
        'your bio needs to have at least 10 words and 2 sentences'
      );
    }
    if (!value || value[VALIDATION_ERROR_CODES.MIN]) {
      validationMessages.push('minimal number value is 1');
    }
    if (!value || value[VALIDATION_ERROR_CODES.WEBSITE_LINK]) {
      validationMessages.push(
        'this is not a valid website link (ie. https://link.com)'
      );
    }
    if (!value || value[VALIDATION_ERROR_CODES.LINKEDIN_LINK]) {
      validationMessages.push(
        'this is not a valid linkedin link (ie. https://linkedin.com/company)'
      );
    }
    if (!value || value[VALIDATION_ERROR_CODES.NO_ACTIVITY_SELECTED]) {
      validationMessages.push('choose at least one activity');
    }
    return validationMessages.toString();
  }
}
