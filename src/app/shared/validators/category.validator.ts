import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

export function categoryValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const form = control as FormGroup;
    const category = form.get('category')?.value;
    const suggestedName = form.get('suggestedCategoryName')?.value;
    const suggestedDescription = form.get('suggestedCategoryDescription')?.value;

    if (!category) {
      const errors: ValidationErrors = {};

      if (!suggestedName || suggestedName.trim() === '') {
        errors['suggestedCategoryNameRequired'] = true;
      }

      if (!suggestedDescription || suggestedDescription.trim() === '') {
        errors['suggestedCategoryDescriptionRequired'] = true;
      }

      return Object.keys(errors).length ? errors : null;
    }

    return null;
  };
}
