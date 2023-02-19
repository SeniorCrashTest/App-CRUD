import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { CustomerInterface } from '../types/customer.interface';
import { RequestCustomerInterface } from '../types/request-customer.interface';
import { ResponseCustomerInterface } from '../types/response-customer.interface';

const url = 'https://ng-crud-application-default-rtdb.firebaseio.com/';

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
				error: catchError(this.errorHandler('GET'))
			}
		);
	}

	updateData(customer: CustomerInterface, i: number): Observable<CustomerInterface> {
		const {key, ...data} = customer;
		return	this.http.put<CustomerInterface>(`${url}/${key}.json`, data)
		.pipe(tap(res => this.customers[i] = customer))
	}

	deleteData(customer: CustomerInterface): void {
		this.http.delete(`${url}/${customer.key}.json`)
		.subscribe({
			next: () => this.customers.splice(this.customers.indexOf(customer), 1),
			error: catchError(this.errorHandler('DELETE'))
		})
	}

	private errorHandler<T>(operation: string, res?: T) {
		return (err: any): Observable<any> => {
			console.log(`${operation} failed`);
			return of(res)
		}
	}
} 