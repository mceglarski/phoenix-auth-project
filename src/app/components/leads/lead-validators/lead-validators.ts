import { AbstractControl, ValidationErrors } from '@angular/forms';

export namespace LeadValidators {
  export function websiteLink(
    control: AbstractControl
  ): ValidationErrors | null {
    const regex: RegExp =
      /^(https?:\/\/)([\da-z.-]+)\.([a-z.]{2,6})([\/\w.-]*)*\/?$/;
    if (control.value.match(regex)) {
      return null;
    }
    return { websiteLink: true };
  }
  export function linkedinLink(
    control: AbstractControl
  ): ValidationErrors | null {
    const regex: RegExp =
      /^(https?:\/\/)(www\.)?linkedin\.com\/[\w-]+(\/[\w-]+)*\/?$/;
    if (control.value.match(regex)) {
      return null;
    }
    return { linkedinLink: true };
  }
}
