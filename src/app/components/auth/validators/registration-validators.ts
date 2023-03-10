import { AbstractControl, ValidationErrors } from '@angular/forms';

export namespace RegistrationValidators {
  export function numberCharacter(
    control: AbstractControl
  ): ValidationErrors | null {
    const regex: RegExp = /\d+/g;
    if (control.value.match(regex)) {
      return null;
    }
    return { numberCharacter: true };
  }

  export function specialCharacter(
    control: AbstractControl
  ): ValidationErrors | null {
    const regex: RegExp = /.*[!@#\$%\^\&*\(\)]+.*$/;
    if (control.value.match(regex)) {
      return null;
    }
    return { specialCharacter: true };
  }

  export function capitalCharacter(
    control: AbstractControl
  ): ValidationErrors | null {
    const regex: RegExp = /.*[A-Z]+.*$/;
    if (control.value.match(regex)) {
      return null;
    }
    return { capitalCharacter: true };
  }

  export function smallCharacter(
    control: AbstractControl
  ): ValidationErrors | null {
    const regex: RegExp = /.*[a-z]+.*$/;
    if (control.value.match(regex)) {
      return null;
    }
    return { smallCharacter: true };
  }

  export function passwordMatch(
    control: AbstractControl
  ): ValidationErrors | null {
    const password: string = control.get('password')?.value;
    const repeatPassword: string = control.get('confirmPassword')?.value;

    if (!password || !repeatPassword) {
      return null;
    }

    if (repeatPassword !== password) {
      return { passwordMatch: true };
    }

    return null;
  }
}
