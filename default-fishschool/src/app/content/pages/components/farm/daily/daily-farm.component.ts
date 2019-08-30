import {ChangeDetectorRef, Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import * as moment from 'moment';
import {FishSchoolModel} from '../../../../../core/models/fishschool/fish-school.model';
import {FarmService} from '../../../../../core/services/farm/farm-schools.service';
import {FishSchoolsService} from '../../../../../core/services/fishschool/fish-schools.service';
import {Observable} from 'rxjs';
import {FishSchools} from '../../../../../core/models/fishschool/fish.schools.model';
import * as deepEqual from 'deep-equal';
import {ToastrManager} from 'ng6-toastr-notifications';
import {MatSort, MatTableDataSource} from '@angular/material';
import {FishSchoolsAuthorizationService} from '../../../../../core/services/fishschool/fish-schools.authorization.service';
import {ToastSupport} from '../../../../../core/models/fishschool/toast.support';

@Component({
	selector: 'm-daily-farm',
	templateUrl: './daily-farm.component.html',
	styleUrls: ['./daily-farm.component.scss']
})
export class DailyFarmComponent extends ToastSupport implements OnInit {

	displayedColumns: string[] = ['name', 'actualGivenFood', 'food', 'dead'];
	headers: string[];
	dataSource: MatTableDataSource<FishSchoolModel>;
	originalData: FishSchoolModel[] = [];
	@ViewChild(MatSort) sort: MatSort;

	constructor(private service: FarmService, private fsService: FishSchoolsService, private translate: TranslateService,
				private authorization: FishSchoolsAuthorizationService, public toastr: ToastrManager, private changeDetector: ChangeDetectorRef) {

		super(toastr);

		this.headers = [this.translate.instant('FISH_SCHOOL.FILTERS.SCHOOL_NAME'),
			this.translate.instant('FOOD.TABLE.DAILY_FEED'),
			this.translate.instant('FOOD.TABLE.FOOD_TYPE'),
			this.translate.instant('FOOD.TABLE.MORTALITY')];
	}

	async ngOnInit() {
		this.view();
	}

	async view() {
		await this.service.view({feedDate: moment(), days: 400, status: 'ACTIVE', schoolName: undefined}).toPromise()
			.then(response => {

			if (response.status === 'Success') {

				if (response.data.length === 0) {
					this.dataSource = new MatTableDataSource<FishSchoolModel>([]);
					this.showInfo({message: this.translate.instant('VALIDATION.NO_RECORDS'), type: 'info'});
				} else {

					// Deep copy
					this.loadData(response.data);
				}
			} else {
				this.showError({message: this.translate.instant('VALIDATION.LOAD_FS_FAILURE'), type: 'danger'});
			}
		}).catch(response => {
				if (response && response.error && response.error.status === 'Failure') {
				this.showError({message: response.error.code + ': ' + response.error.message, type: 'danger'});
			} else {
				this.showError({message: this.translate.instant('AUTH.VALIDATION.DAILY_FARM') + ' - '
						+ this.translate.instant('AUTH.VALIDATION.CONNECTION_FAILURE'), type: 'danger'});
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
								if (! deepEqual1) {
									const i = this.dataSource.data.indexOf(item);
									this.dataSource.data[i] = data[index];
								}
							}
						});

						this.loadData(this.dataSource.data);
						this.showSuccess({message: this.translate.instant('FISH_SCHOOL.RESULTS.FISH_SCHOOL_UPDATE_SUCCESS'), type: 'success'});
					}
				}).catch(response => {
					if (response.error !== 'undefined' && response.error.status && response.error.status === 'Failure') {
						this.showError({message: response.error.code + ': ' + response.error.message, type: 'danger'});
					} else {
						this.showError({message: this.translate.instant('AUTH.VALIDATION.UPDATE_FAILY_FARM') + ' - '
								+ this.translate.instant('AUTH.VALIDATION.CONNECTION_FAILURE'), type: 'danger'});
					}
				});
			} else {
				this.showInfo({message: this.translate.instant('VALIDATION.NO_CHANGES'), type: 'info'});
			}
		} else {
			this.showWarning({message: this.translate.instant('FISH_SCHOOL.UPDATE_WITHOUT_RECORDS'), type: 'warning'});
		}
	}

	validate(): boolean {
		if (this.dataSource && this.dataSource.data) {
			const dirty: FishSchoolModel[] = this.dataSource.data.filter((item, index) => {
				const deepEqual1 = deepEqual(item, this.originalData[index]);
				return !deepEqual1;
			});

			return dirty.length === 0;
		}

		return false;
	}

	applyFilter(filterValue: string) {
		if (this.dataSource) {
			this.dataSource.filter = filterValue.trim().toLowerCase();
		}
	}

	isFoodInvoiceReadWrite(prop: string): boolean {
		return this.authorization.isFoodInvoicesReadWrite('UPDATE', prop);
	}

	private loadData(data: FishSchoolModel[]) {
		this.originalData = JSON.parse(JSON.stringify(data));
		this.dataSource = new MatTableDataSource<FishSchoolModel>(data);

		this.dataSource.sortingDataAccessor = (item, property) => {
			switch (property) {
				case 'name':
					return '\'' + item.name + '\'';
				case 'food':
					return '\'' + item.food.name + '\'';
				default:
					return item[property];
			}
		};

		this.dataSource.sort = this.sort;
		if (!this.changeDetector['destroyed']) {
			this.changeDetector.detectChanges();
		}
	}
}

