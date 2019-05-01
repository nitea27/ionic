import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LocalDatePipe } from './local-date.pipe';
import { MoneyPipe } from './money.pipe';
import { StringToDatePipe } from './string-to-date.pipe';
import { TrimHtmlPipe } from './trim-html.pipe';
import { TruncatePipe } from './truncate.pipe';

@NgModule({
	declarations: [
		TruncatePipe,
		TrimHtmlPipe,
		LocalDatePipe,
		StringToDatePipe,
		MoneyPipe
	],
	exports: [
		TruncatePipe,
		TrimHtmlPipe,
		LocalDatePipe,
		StringToDatePipe,
		MoneyPipe,
		CommonModule
	],
	providers: [MoneyPipe]
})
export class PipesModule {

}