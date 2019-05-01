import { ValidatorFn } from '@angular/forms';

export class ControlBase<T> {
	value: T;
	key: string;
	label: string;
	required: boolean;
	order: number;
	controlType: string;
	validators: ValidatorFn[];

	constructor(options: {
		value?: T,
		key?: string,
		label?: string,
		required?: boolean,
		order?: number,
		controlType?: string,
		validators?: ValidatorFn[];
	} = {}) {
		this.value = options.value;
		this.key = options.key || '';
		this.label = options.label || '';
		this.required = !!options.required;
		this.order = options.order === undefined ? 1 : options.order;
		this.controlType = options.controlType || '';
		this.validators = options.validators || [];
	}
}