import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatSort} from '@angular/material';
import {FishSchoolsService} from '../../../../core/services/fishschool/fish-schools.service';
import {FishSchoolModel} from '../../../../core/models/fishschool/fish-school.model';
import {FishSchools} from '../../../../core/models/fishschool/fish.schools.model';
import * as moment from 'moment';
import {TranslateService} from '@ngx-translate/core';
import {Moment} from 'moment';
import {NgForm, Validators} from '@angular/forms';
import {AuthenticationService} from '../../../../core/auth/authentication.service';
import {Observable} from 'rxjs';
import * as deepEqual from 'deep-equal';
import {FishSchoolsAuthorizationService} from '../../../../core/services/fishschool/fish-schools.authorization.service';
import {FoodService} from '../../../../core/services/fishschool/food.service';

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

	// If you choose to diplay other dates like: creationDate, updatedDate, deadLastUpdateDate make sure to uncomment in view()
	// the relevant cases
	// displayedColumns = The JSON names
	displayedColumns: string[] = ['feedDate', 'age', 'menualAvgWeight', 'averageWeight', 'quantity', 'totalWeight', 'totalGivenFood',
		'actualGivenFood', 'foodWeight', 'foodTypeName', 'dead', 'fcr'];

	headers: string[];
	dataSource: MatTableDataSource<FishSchoolModel>;
	data: FishSchools;

	public model: FsModel = {schoolName: '270517 102', status: 'ACTIVE', startDate: moment('2017-06-16'), days: 10};

	@ViewChild(MatSort) sort: MatSort;
	alerts: Array<FsAlert> = [];
	fishSchoolNames: string[];

	@ViewChild('f') f: NgForm;
	panelOpenState: boolean = true;
	roles: string;
	originalData: FishSchoolModel[] = [];
	maxDate: Date = new Date();
	foodNames: string[];

	constructor(private service: FishSchoolsService, private foodService: FoodService, private authService: AuthenticationService,
				private translate: TranslateService, private authorization: FishSchoolsAuthorizationService) {

		this.headers = [this.translate.instant('FISH_SCHOOL.TABLE.SELECTED_DATE'),
			this.translate.instant('FISH_SCHOOL.TABLE.AGE'),
			this.translate.instant('FISH_SCHOOL.TABLE.MANUAL_WEIGHT'),
			this.translate.instant('FISH_SCHOOL.TABLE.AVERAGE_GRAMS'),
			this.translate.instant('FISH_SCHOOL.TABLE.NUMBER_OF_FISH'),
			this.translate.instant('FISH_SCHOOL.TABLE.TOTAL_KG'),
			this.translate.instant('FISH_SCHOOL.TABLE.FEED_PLAN'),
			this.translate.instant('FISH_SCHOOL.TABLE.GIVEN_FEED'),
			this.translate.instant('FISH_SCHOOL.TABLE.TOTAL_FOOD'),
			this.translate.instant('FISH_SCHOOL.TABLE.FOOD_TYPE'),
			this.translate.instant('FISH_SCHOOL.TABLE.MORTALITY'),
			this.translate.instant('GENERAL.F_C_R')];
	}

	async ngOnInit() {
		await this.service.names().toPromise().then(response => {
			this.fishSchoolNames = response.data;
			return response;
		}).catch(error => {
			this.alertNoConnaction();
		});

		this.authService.getUserRoles().subscribe(role => {
			this.roles = role;
		});

		this.foodService.names().toPromise().then(response => {
			this.foodNames = response.data;
			return response;
		});
	}

	applyFilter(filterValue: string) {
		if (this.dataSource) {
			this.dataSource.filter = filterValue.trim().toLowerCase();
		}
	}

	view() {

		this.alerts = [];

		this.service.view(this.model).toPromise().then(response => {

			if (response.status === 'Success') {

				if (response.data.length === 0) {
					this.dataSource = new MatTableDataSource<FishSchoolModel>([]);
					this.sendAlert({
						message: this.translate.instant('FISH_SCHOOL.NO_RECORDS'),
						type: 'info'
					});
				} else {

					// Deep copy
					this.loadData(response.data);
				}
			} else {
				this.sendAlert({
					message: this.translate.instant('FISH_SCHOOL.VALIDATION.LOAD_FAILURE'),
					type: 'danger'
				});
			}
		}).catch(response => {
			if (response !== 'undefined' && response.status === 'Failure') {
				this.sendAlert({
					message: response.message,
					type: 'danger'
				});
			} else {
				this.alertNoConnaction();
			}
		});
	}

	update() {

		if (this.dataSource) {
			const httpPost: Observable<FishSchools> = this.service.update(this.originalData, this.dataSource.data);

			if (httpPost !== null) {
				httpPost.toPromise().then(response => {
					if (response.status === 'Success') {

						// Response may contain partial data, merge it
						const data = response.data;
						this.dataSource.data.forEach((item, index) => {

							// We might get less data since not all records in table were updated
							if (data[index]) {
								const deepEqual1 = deepEqual(item.id, data[index].id);
								const i = this.dataSource.data.indexOf(item);
								this.dataSource.data[i] = data[index];
							}
						});

						this.loadData(this.dataSource.data);
						this.sendAlert({
							message: this.translate.instant('FISH_SCHOOL.RESULTS.FISH_SCHOOL_UPDATE_SUCCESS'),
							type: 'success'
						});
					}
				}).catch(response => {
					if (response.error !== 'undefined' && response.error.status === 'Failure') {
						this.sendAlert({
							message: response.message,
							type: 'danger'
						});
					} else {
						this.alertNoConnaction();
					}
				});
			} else {
				this.sendAlert({
					message: this.translate.instant('FISH_SCHOOL.NO_CHANGES'),
					type: 'info'
				});
			}
		} else {
			this.sendAlert({
				message: this.translate.instant('FISH_SCHOOL.UPDATE_WITHOUT_RECORDS'),
				type: 'warning'
			});
		}
	}

	closeAlert(alert: FsAlert) {
		const index: number = this.alerts.indexOf(alert);
		this.alerts.splice(index, 1);
	}

	isReadWite(prop: string): boolean {
		return this.authorization.isReadWrite('FishSchool', 'UPDATE', prop);
	}

	private loadData(data: FishSchoolModel[]) {

		this.originalData = JSON.parse(JSON.stringify(data));
		this.dataSource = new MatTableDataSource<FishSchoolModel>(data);

		this.dataSource.sortingDataAccessor = (item, property) => {
			switch (property) {
				// case 'deadLastUpdateDate':
				// case 'updatedDate':
				// case 'creationDate':
				case 'feedDate':
					return moment(item.feedDate, 'DD/MM/YYYY');
				default:
					return item[property];
			}
		};

		this.dataSource.sort = this.sort;
		this.panelOpenState = false;
	}

	private alertNoConnaction() {

		// Keep same message as in Login
		this.sendAlert({
			message: this.translate.instant('AUTH.VALIDATION.CONNECTION_FAILURE'),
			type: 'danger'
		});
	}

	private sendAlert(alert: FsAlert) {
		if (this.alerts.length > 2) {
			this.alerts.splice(0, 1);
		}

		this.alerts.push(alert);
		setTimeout(() => {
			this.closeAlert(alert);
		}, 5000);

		window.scrollTo(0, 0);
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
