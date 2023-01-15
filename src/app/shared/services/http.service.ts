import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DEFAULT_CUSTOMER } from '../data/mock.data';
import { CustomerInterface } from '../types/customer.interface';

const url = 'https://ng-crud-----20231201-default-rtdb.firebaseio.com/blabla';

@Injectable({
	providedIn: 'root'
})
export class HttpService {

	constructor(private http: HttpClient) { }

	createData(): any {
		const customer: CustomerInterface = DEFAULT_CUSTOMER
		this.http.post('${url}.json', customer).subscribe(res => {
			console.log(res);
		});
	}

	getData(): any { }

	updateData(): any { }

	deleteData(): void { }


}