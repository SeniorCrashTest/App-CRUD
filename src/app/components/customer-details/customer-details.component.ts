import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
	selector: 'crud-customer-details',
	templateUrl: './customer-details.component.html',
	styleUrls: ['./customer-details.component.css'],
})
export class CustomerDetailsComponent implements OnInit {

	constructor(private httpService: HttpService) { }

	ngOnInit(): void {
		// this.httpService.createData();
	}

}
