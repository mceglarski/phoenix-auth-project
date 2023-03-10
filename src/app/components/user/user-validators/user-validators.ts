import { AbstractControl, ValidationErrors } from '@angular/forms';

export namespace UserValidators {
  export function bioLength(control: AbstractControl): ValidationErrors | null {
    const regex: RegExp = /^(?=(?:\S+\s+){9}\S+)(?=(?:[^.!?]+[.!?]){2})/;
    if (control.value.match(regex)) {
      return null;
    }
    return { bioLength: true };
  }
}
