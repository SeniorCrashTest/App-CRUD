import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
	selector: 'crud-customer-details',
	templateUrl: './customer-details.component.html',
	styleUrls: ['./customer-details.component.css'],
})
export class CustomerDetailsComponent implements OnInit {

	form!: FormGroup

	constructor(private httpService: HttpService, private fb: FormBuilder) { }

	ngOnInit(): void {
		this.initializeForm()
	}

	private initializeForm(): void {
		this.form = this.fb.group({
			name: ['', [Validators.required]],
			Email: ['', [Validators.required, Validators.email]],
			mobile: ['', [Validators.required, Validators.minLength(8)]],
			Location: ['', [Validators.required,]],
		})
	}


	onSubmit(): void { }
}
