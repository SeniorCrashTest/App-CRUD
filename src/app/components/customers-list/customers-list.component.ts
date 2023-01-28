import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
	selector: 'crud-customers-list',
	templateUrl: './customers-list.component.html',
	styleUrls: ['./customers-list.component.css'],
})
export class CustomersListComponent implements OnInit {

	isEditPos!: number

	constructor(public httpService: HttpService) { }

	ngOnInit(): void {
		this.httpService.getData();
	}

	editCustomer(i: number): void {
		this.isEditPos = i
	}

	cancelCustomer(): void { }

	saveCustomer(): void { }

	deleteCustomer(): void { }

	setValue(key: string, original: string, value: string): void {

	}

}
