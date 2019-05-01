import { Injectable } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ControlBase } from './control-base';

@Injectable()
export class DynamicControlsService {
	constructor() {
	}

	toFormGroup(formGroup: FormGroup, controls: ControlBase<any>[], model: any) {
		formGroup = formGroup || new FormGroup({});

		controls.forEach(control => {
			let validators: ValidatorFn[] = control.validators || [];
			if (control.required) {
				validators.push(Validators.required);
			}
			let formControl = new FormControl(control.value || model[control.key] || '', validators);
			formGroup.addControl(control.key, formControl);
		});

		return formGroup;
	}
}