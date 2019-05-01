import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { Config } from '../config';

@Pipe({
	name: 'money'
})
export class MoneyPipe implements PipeTransform {
	private currencyPipe: CurrencyPipe;

	constructor() {
		this.currencyPipe = new CurrencyPipe(Config.currency.locale);
	}

	transform(value: number): string {
		return this.currencyPipe.transform(value, Config.currency.code, Config.currency.display, '1.2-2');
	}
}
