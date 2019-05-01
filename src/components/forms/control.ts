import { ValidatorFn } from '@angular/forms';

export class ControlDescriptor {
	name: string;
	type: string;
	required?: boolean;
	title: string;
	value?: any;
	options?: any;
	validators?: ValidatorFn[];
}
