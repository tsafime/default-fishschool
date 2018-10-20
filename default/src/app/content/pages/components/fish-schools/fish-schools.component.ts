import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatSort} from '@angular/material';
import {FishSchoolsService} from '../../../../core/services/fish-schools.service';
import {FishSchoolModel} from '../../../../core/models/fish-school.model';
import {FishSchoolsResponse} from '../../../../core/models/fish.schools.model';
import {SpinnerButtonOptions} from '../../../partials/content/general/spinner-button/button-options.interface';
import * as moment from 'moment';
import {TranslateService} from '@ngx-translate/core';
import {Moment} from 'moment';

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

	public model: FsModel = {schoolName: '270517 102', startDate: moment(), days: 10};

	@ViewChild(MatSort) sort: MatSort;
	show: boolean = false;
	alerts: Array<FsAlert> = [];

	constructor(private service: FishSchoolsService, private translate: TranslateService) {
	}

	ngOnInit() {
	}

	applyFilter(filterValue: string) {
		if (this.dataSource) {
			this.dataSource.filter = filterValue.trim().toLowerCase();
		}
	}

	async submit() {

		this.alerts = [];
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
				} else if (response.message) {
					this.sendAlert({
						message: this.translate.instant('FISH_SCHOOL.NO_RECORDS'),
						type: 'info'
					});
				} else {
					// Keep same message as in Login
					this.sendAlert({
						message: this.translate.instant('AUTH.VALIDATION.CONNECTION_FAILURE'),
						type: 'error'
					});
				}
			},
			response => {
				console.log('Failure...' + response);
				if (response !== 'undefined' && response.status === 'Failure') {
					this.sendAlert({
						message: response.message,
						type: 'error'
					});
				} else {
					this.sendAlert({
						message: this.translate.instant('FISH_SCHOOL.VALIDATION.LOAD_FAILURE'),
						type: 'error'
					});
				}
			},
			() => {
				console.log('Done processing HTTP to view FishShcools');
			});

		this.spinner.active = false;
		console.log('view() finished');
	}

	closeAlert(alert: FsAlert) {
		const index: number = this.alerts.indexOf(alert);
		this.alerts.splice(index, 1);
	}

	private sendAlert(alert: FsAlert) {
		if (this.alerts.length > 2) {
			this.alerts.splice(0, 1);
		}

		this.alerts.push(alert);
		console.log('Alerts length: ' + this.alerts.length);
		console.log('Alerts: ' + this.alerts[0].message);
	}
}

export interface FsAlert {
	type: string;
	message: string;
}

export interface FsModel {
	schoolName: string;
	startDate: Moment;
	days: number;
}
