import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';
import { CustomerInterface } from 'src/app/shared/types/customer.interface';

@Component({
	selector: 'crud-customers-list',
	templateUrl: './customers-list.component.html',
	styleUrls: ['./customers-list.component.css'],
})
export class CustomersListComponent implements OnInit {

	isEditPos!: number | null;

	private tempCustomer!: CustomerInterface

	constructor(public httpService: HttpService) { }

	ngOnInit(): void {
		this.httpService.getData();

		this.resetEditStatus()
	}

	editCustomer(i: number): void {
		this.isEditPos = i;
	}

	cancelCustomer(): void {
		this.resetEditStatus()
	}

	saveCustomer(customer: CustomerInterface, i: number): void {
		const mergedCustomer = this.mergeCustomerProps(customer, this.tempCustomer)

		this.httpService.updateData(mergedCustomer, i).subscribe({
			next: () => {
				this.resetEditStatus()
			}
		})
	}

	deleteCustomer(customer: CustomerInterface): void {
		this.httpService.deleteData(customer)
	}

	setValue(key: string, original: string, value: string): void {
		const  valueTrim = value.trim()

		if (original !== value && valueTrim !== this.tempCustomer[key as keyof CustomerInterface]) {
			this.tempCustomer[key as keyof CustomerInterface] = valueTrim;
		}
	}

	private resetCustomer = (): CustomerInterface => ({key: null, name: '', email: '', mobile: '', location: ''});

	private resetEditStatus(): void {
		this.tempCustomer = this.resetCustomer()
		this.isEditPos = null; 
	}
	private mergeCustomerProps(original: CustomerInterface, temp: CustomerInterface): CustomerInterface {
    const result = { ...original };
    Object.keys(temp).forEach(key => {
      if (temp[key as keyof CustomerInterface]) {
        result[key as keyof CustomerInterface] = temp[key as keyof CustomerInterface] ?? '';
      }
    });
    return result;
}

}