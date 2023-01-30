import { keyframes } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';
import { CustomerInterface } from 'src/app/shared/types/customer.interface';

@Component({
	selector: 'crud-customers-list',
	templateUrl: './customers-list.component.html',
	styleUrls: ['./customers-list.component.css'],
})
export class CustomersListComponent implements OnInit {

	isEditPos!: number;

	private tempCustomer!: CustomerInterface

	constructor(public httpService: HttpService) { }

	ngOnInit(): void {
		this.httpService.getData();

		this.tempCustomer = this.resetCustomer()
	}

	editCustomer(i: number): void {
		this.isEditPos = i
	}

	cancelCustomer(): void { }

	saveCustomer(): void { }

	deleteCustomer(): void { }

	setValue(key: string, original: string, value: string): void {
		const  valueTrim = value.trim()

		if (original !== value && valueTrim !== this.tempCustomer[key as keyof CustomerInterface]) {
			this.tempCustomer[key as keyof CustomerInterface] = valueTrim;
			console.log(this.tempCustomer)
		}
	}

	private resetCustomer = (): CustomerInterface => ({key: null , name: '', email:'', mobile: '', location: ''})

}
