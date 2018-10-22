import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatSort} from '@angular/material';
import {FishSchoolsService} from '../../../../core/services/fish-schools.service';
import {FishSchoolModel} from '../../../../core/models/fish-school.model';
import {FishSchoolsResponse} from '../../../../core/models/fish.schools.model';
import {SpinnerButtonOptions} from '../../../partials/content/general/spinner-button/button-options.interface';
import * as moment from 'moment';
import {TranslateService} from '@ngx-translate/core';
import {Moment} from 'moment';
import {NgForm} from '@angular/forms';
import {FsNames} from '../../../../core/models/fish-school.names.model';

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

	public model: FsModel = {schoolName: '', status: 'ACTIVE', startDate: moment('2017-07-26'), days: 10};

	@ViewChild(MatSort) sort: MatSort;
	show: boolean = false;
	alerts: Array<FsAlert> = [];
	fishSchoolNames: string[];

	@ViewChild('f') f: NgForm;
	errors: any = [];
	panelOpenState: boolean = true;

	constructor(private service: FishSchoolsService, private translate: TranslateService) {
	}

	ngOnInit() {
		this.service.names().then(response => {
			this.fishSchoolNames = response.data;
			return response;
		});
	}

	applyFilter(filterValue: string) {
		if (this.dataSource) {
			this.dataSource.filter = filterValue.trim().toLowerCase();
		}
	}

	submit() {

		this.alerts = [];
		this.show = false;
		this.dataSource = new MatTableDataSource<FishSchoolModel>();

		this.service.view(this.model).then(response => {
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
					type: 'danger'
				});
			}
		})
		.catch(response => {
			console.log('Failure...' + response);
			if (response !== 'undefined' && response.status === 'Failure') {
				this.sendAlert({
					message: response.message,
					type: 'danger'
				});
			} else {
				this.sendAlert({
					message: this.translate.instant('FISH_SCHOOL.VALIDATION.LOAD_FAILURE'),
					type: 'danger'
				});
			}
		});

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
	status: string;
	startDate: Moment;
	days: number;
}
