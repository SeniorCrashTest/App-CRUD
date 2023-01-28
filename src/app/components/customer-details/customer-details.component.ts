import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DEFAULT_CUSTOMER } from 'src/app/shared/data/mock.data';
import { HttpService } from 'src/app/shared/services/http.service';
import { CustomerInterface } from 'src/app/shared/types/customer.interface';
import { RequestCustomerInterface } from 'src/app/shared/types/request-customer.interface';

@Component({
	selector: 'crud-customer-details',
	templateUrl: './customer-details.component.html',
	styleUrls: ['./customer-details.component.css'],
})
export class CustomerDetailsComponent implements OnInit {

	form!: FormGroup
	// controls!: { [key: string]: AbstractControl }

	constructor(private httpService: HttpService, private fb: FormBuilder) { }

	ngOnInit(): void {
		this.initializeForm()
	}

	onSubmit(): void {
		this.httpService.createData(this.form.value).subscribe({
			next: (res: RequestCustomerInterface) => {
				this.form.reset();
			}
		});
	}

	private initializeForm(): void {
		this.form = this.fb.group({
			name: ['', [Validators.required]],
			email: ['', [Validators.required, Validators.email]],
			mobile: ['', [Validators.required, Validators.minLength(8)]],
			location: ['', [Validators.required,]],
		})

		// this.controls = this.form.controls

		const customer = DEFAULT_CUSTOMER;
		Object.keys(this.form.controls).forEach(
			key => this.form.controls[key].setValue(customer?.[key as keyof CustomerInterface])
		);
	}
}