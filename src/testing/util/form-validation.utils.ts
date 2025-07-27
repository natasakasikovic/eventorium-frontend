import { ComponentFixture } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';

export interface InvalidTestCase {
  field: string;
  invalidValue: any;
  expectedError: string;
}

/**
 * Validates a list of invalid test cases for a reactive form.
 */
export function runInvalidFormTestCases(
  form: FormGroup,
  fixture: ComponentFixture<any>,
  submitButtonSelector: string,
  validFormData: any,
  testCases: InvalidTestCase[]
): void {
  const submitButton: HTMLButtonElement = fixture.nativeElement.querySelector(submitButtonSelector);

  testCases.forEach(({ field, invalidValue, expectedError }) => {
    form.patchValue(validFormData);
    form.controls[field].setValue(invalidValue);

    fixture.detectChanges();

    const control = form.controls[field];
    expect(control.invalid).withContext(`${field} should be invalid`).toBeTrue();
    expect(control.hasError(expectedError)).withContext(`${field} should have '${expectedError}' error`).toBeTrue();
    expect(form.invalid).withContext(`Form should be invalid when ${field} is invalid`).toBeTrue();
    expect(submitButton.disabled).withContext(`Submit button should be disabled for invalid ${field}`).toBeTrue();
  });
}
