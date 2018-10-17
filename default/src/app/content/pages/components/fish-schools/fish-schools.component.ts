import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatSort} from '@angular/material';
import {FishSchoolsService} from '../../../../core/services/fish-schools.service';
import {FishSchoolModel} from '../../../../core/models/fish-school.model';
import {FishSchoolsResponse} from '../../../../core/models/fish.schools.model';
import {SpinnerButtonOptions} from '../../../partials/content/general/spinner-button/button-options.interface';
import * as moment from 'moment';

@Component({
	selector: 'm-fish-schools',
	templateUrl: './fish-schools.component.html',
	styleUrls: ['./fish-schools.component.scss']
})
export class FishSchoolsComponent implements OnInit {

	// All columns:
	// displayedColumns: string[] = ['id', 'companyId', 'name', 'status', 'creationDate', 'updatedDate', 'age', 'specie', 'quantity', 'dead',
	// 	'menualAvgWeight', 'averageWeight', 'foodWeight', 'totalGivenFood', 'actualGivenFood', 'percentageTsemach', 'deadLastUpdateDate',
	// 	'foodTypeName', 'feedDate', 'sale', 'totalSale', 'fcr', 'salesFcr', 'totalWeight'];
	displayedColumns: string[] = ['feedDate', 'age', 'averageWeight', 'quantity', 'totalWeight', 'totalGivenFood', 'actualGivenFood',
		'foodWeight', 'foodTypeName', 'dead', 'fcr'];
	headers: string[] = ['Selected Date', 'Age', 'Avg. G', '# Fish', 'Total KG', 'Feed Plan', 'Given Feed', 'Total Food', 'Food Type',
		'Mortality', 'F.C.R.'];
	dataSource: MatTableDataSource<FishSchoolModel>;
	data: FishSchoolsResponse;
	spinner: SpinnerButtonOptions = {
		active: false,
		spinnerSize: 18,
		raised: true,
		buttonColor: 'primary',
		spinnerColor: 'accent',
		fullWidth: false
	};

	public model: any = { schoolName: '270517 102', startDate: moment(),  days: 10 };

	@ViewChild(MatSort) sort: MatSort;
	show: boolean = false;

	constructor(private service: FishSchoolsService) {
	}

	ngOnInit() {
	}

	applyFilter(filterValue: string) {
		if (this.dataSource) {
			this.dataSource.filter = filterValue.trim().toLowerCase();
		}
	}

	submit() {
		this.spinner.active = true;
		this.show = false;

		// if (this.validate(this.f)) {
			this.service.view(this.model).subscribe(response => {
					console.log('Successfully loaded: ' + response.data.length + ' records');
					this.dataSource = new MatTableDataSource<FishSchoolModel>(response.data);
					this.dataSource.sort = this.sort;

					if (response.data.length > 0) {
						console.log('Set show = true');
						this.show = true;
					}
					// this.dataSource.filter =
					// this.authNoticeService.setNotice(response.message, 'success');
				},
				response => {
					console.log('Failure...' + response);
					// if (response !== 'undefined' && response.status === 'Failure') {
					// 	this.authNoticeService.setNotice(response.message, 'error');
					// } else {
					// 	this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.INVALID_LOGIN'), 'error');
					// }
				});

			// this.service.view();
			// const data = this.service.data;
			/*
            Example repsonse:
            {"status":"Success","code":"MSG_02","message":"List of entities loaded successfully","size":9,
            "data":[{"name":"270517 102","status":"ACTIVE","age":2,"specie":"Barakuda","quantity":1000,"dead":10,"averageWeight":0.11,
            "foodWeight":6.655E-4,"totalGivenFood":122.0,"percentageTsemach":5.0,"foodTypeName":"Food Type","feedDate":"30/10/2016",
            "fcr":1110.09,"salesFcr":122.0,"totalWeight":0.11}]}
             */

			// TODO: Check data status: Success and notify if failure
		// }

		this.spinner.active = false;
	}
}

