import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CustomersListComponent } from './components/customers-list/customers-list.component';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';
import { CustomersHostComponent } from './components/customers-host/customers-host.component';
import { HttpClientModule } from '@angular/common/http'

@NgModule({
	declarations: [
		AppComponent,
		CustomersListComponent,
		CustomerDetailsComponent,
		CustomersHostComponent,],
	imports: [
		BrowserModule,
		HttpClientModule,
	],
	providers: [],
	bootstrap: [AppComponent],

})
export class AppModule { }
