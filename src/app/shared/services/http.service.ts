import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { DEFAULT_CUSTOMER } from '../data/mock.data';
import { CustomerInterface } from '../types/customer.interface';
import { RequestCustomerInterface } from '../types/request-customer.interface';
import { ResponseCustomerInterface } from '../types/response-customer.interface';

const url = 'https://ng-crud-----20231201-default-rtdb.firebaseio.com/customers';

@Injectable({
	providedIn: 'root'
})
export class HttpService {

	customers: CustomerInterface[] = [];

	constructor(private http: HttpClient) { }

	createData(customer: CustomerInterface): void {
		this.http.post<RequestCustomerInterface>(`${url}.json`, customer)
			.subscribe({
				next: (res: RequestCustomerInterface) => {
					customer.key = res.name;
					//TODO: push to customer[]
				},
				error: err => console.log(err)
			});
	}

	getData(): void {
		this.http.get<ResponseCustomerInterface>(`${url}.json`)
			.pipe(map((res: ResponseCustomerInterface) => {
				const arr: CustomerInterface[] = [];
				Object.keys(arr).forEach(key => arr.push({ key, ...res[key] }));
				return arr;
			}))
			.subscribe({
				next: (res: CustomerInterface[]) => this.customers = res,
				error: err => console.log(err)
			}
			);
	}

	updateData(): any { }

	deleteData(): void { }


}