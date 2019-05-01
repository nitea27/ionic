import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { CustomComponentsModule } from '../../components/custom-components.module';
import { PipesModule } from '../../pipes/pipes.module';
import { CategoriesPage } from './categories.page';
import { ProductPage } from './product.page';
import { ProductResolver } from './product.resolver';
import { ProductsPage } from './products.page';

@NgModule({
	imports: [IonicModule, PipesModule, CustomComponentsModule],
	declarations: [CategoriesPage, ProductsPage, ProductPage],
	entryComponents: [CategoriesPage, ProductsPage, ProductPage],
	providers: [ProductResolver]
})
export class MenuModule {

}