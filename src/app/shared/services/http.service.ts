import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
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

	createData(customer: CustomerInterface): Observable<RequestCustomerInterface> {
		return this.http.post<RequestCustomerInterface>(`${url}.json`, customer)
			.pipe(tap(res => this.customers.push({ ...{ key: res.name }, ...customer })));
	}

	getData(): void {
		this.http.get<ResponseCustomerInterface>(`${url}.json`)
			.pipe(map((res: ResponseCustomerInterface) => {
				const arr: CustomerInterface[] = [];
				Object.keys(res).forEach(key => arr.push({ key, ...res[key] }));
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