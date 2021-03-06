import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FsRequestModel} from '../fish-schools.component';
import {FishSchoolModel} from '../../../../../../core/models/fishschool/fish-school.model';
import {FishSchoolsAuthorizationService} from '../../../../../../core/services/fishschool/fish-schools.authorization.service';
import {TranslateService} from '@ngx-translate/core';
import {ToastrManager} from 'ng6-toastr-notifications';
import {FishSchoolsService} from '../../../../../../core/services/fishschool/fish-schools.service';
import {ToastSupport} from '../../../../../../core/models/fishschool/toast.support';
import {Observable} from 'rxjs';
import {FishSchools} from '../../../../../../core/models/fishschool/fish.schools.model';
import * as moment from 'moment';
import * as deepEqual from 'deep-equal';
import {MatSort} from '@angular/material';
import {FoodService} from '../../../../../../core/services/fishschool/food.service';
import {ReloadTableDataService} from '../../../../../../core/services/fishschool/reload-table-data.service';
import {ResponsiveDataTable} from '../../../../../../core/models/fishschool/table/ResponsiveDataTable';
import {FoodModel} from '../../../../../../core/models/food/food.model';

@Component({
	selector: 'm-fs-table',
	templateUrl: './fs.table.component.html',
	styleUrls: ['./fs.table.component.scss']
})
export class TableComponent extends ToastSupport implements OnInit {

	// All columns:
	// displayedColumns: string[] = ['id', 'companyId', 'name', 'status', 'creationDate', 'updatedDate', 'age', 'specie', 'quantity', 'dead',
	// 	'menualAvgWeight', 'averageWeight', 'foodWeight', 'totalGivenFood', 'actualGivenFood', 'percentageTsemach', 'deadLastUpdateDate',
	// 	'food', 'feedDate', 'sale', 'totalSale', 'fcr', 'salesFcr', 'totalWeight'];

	// If you choose to display other dates like: creationDate, updatedDate, deadLastUpdateDate make sure to uncomment in view()
	// the relevant cases
	// displayedColumns = The JSON names
	displayedColumns: string[] = ['feedDate', 'age', 'menualAvgWeight', 'averageWeight', 'quantity', 'totalWeight', 'totalGivenFood',
		'actualGivenFood', 'foodWeight', 'food', 'dead', 'fcr', 'sale', 'saleWeight'];

	headers: string[];
	dataSource: ResponsiveDataTable<FishSchoolModel>;
	originalData: FishSchoolModel[] = [];

	@Input() public model: FsRequestModel;
	@ViewChild(MatSort) sort: MatSort;

	@Output() dataReady = new EventEmitter<boolean>();
	foods: FoodModel[];
	isFishSchoolTableLoading = true;
	havingFishSchoolRecords = false;

    constructor(private service: FishSchoolsService, private foodService: FoodService, private translate: TranslateService,
				private authorization: FishSchoolsAuthorizationService, public toastr: ToastrManager,
				private reloadService: ReloadTableDataService, private changeDetector: ChangeDetectorRef) {
		super(toastr);

		this.headers = [this.translate.instant('FISH_SCHOOL.TABLE.SELECTED_DATE'),
			this.translate.instant('FISH_SCHOOL.TABLE.AGE'),
			this.translate.instant('FISH_SCHOOL.TABLE.MANUAL_WEIGHT'),
			this.translate.instant('FISH_SCHOOL.TABLE.AVERAGE_GRAMS'),
			this.translate.instant('FISH_SCHOOL.TABLE.NUMBER_OF_FISH'),
			this.translate.instant('FISH_SCHOOL.TABLE.TOTAL_KG'),
			this.translate.instant('FISH_SCHOOL.TABLE.TOTAL_FOOD'),
			this.translate.instant('FISH_SCHOOL.TABLE.GIVEN_FEED'),
			this.translate.instant('FISH_SCHOOL.TABLE.FEED_PLAN'),
			this.translate.instant('FISH_SCHOOL.TABLE.FOOD_TYPE'),
			this.translate.instant('FISH_SCHOOL.TABLE.MORTALITY'),
			this.translate.instant('FISH_SCHOOL.TABLE.FCR'),
			this.translate.instant('FISH_SCHOOL.TABLE.SOLD'),
			this.translate.instant('FISH_SCHOOL.TABLE.SOLD_WEIGHT')];

		this.loadFood();
	}

	async loadFood() {
		await this.foodService.names().toPromise().then(response => {
			this.foods = response.data;
			return response;
		}).catch(response => {
			if (response && response.error && response.error.status === 'Failure') {
				this.showError({message: response.error.code + ': ' + response.error.message, type: 'danger'});
			} else {
				this.showError({message: this.translate.instant('AUTH.VALIDATION.FOOD') + ' - '
						+ this.translate.instant('AUTH.VALIDATION.CONNECTION_FAILURE'), type: 'danger'});
			}
		});
	}

	ngOnInit() {
		this.view();

		this.reloadService.change.subscribe(data => {
			this.view();
		});
	}

	async view() {

		this.isFishSchoolTableLoading = true;
		await this.service.view(this.model).toPromise().then(response => {
			if (response.status === 'Success') {

				if (response.data.length === 0) {
					this.dataReady.emit(false);
					this.havingFishSchoolRecords = false;
					this.dataSource = new ResponsiveDataTable<FishSchoolModel>([], this.dataReady);
					this.showInfo({message: this.translate.instant('VALIDATION.NO_RECORDS'), type: 'info'});
				} else {
					this.loadData(response.data);
				}
			} else {
				this.showError({message: this.translate.instant('FISH_SCHOOL.VALIDATION.LOAD_FS_FAILURE'), type: 'danger'});
				this.dataReady.emit(false);
			}
		}).catch(response => {
			if (response && response.error && response.error.status === 'Failure') {
				this.showError({message: response.error.code + ': ' + response.error.message, type: 'danger'});
			} else {
				this.showError({message: this.translate.instant('AUTH.VALIDATION.FS') + ' - '
						+ this.translate.instant('AUTH.VALIDATION.CONNECTION_FAILURE'), type: 'danger'});
			}
			this.dataReady.emit(false);
		});

		this.isFishSchoolTableLoading = false;
		if (!this.changeDetector['destroyed']) {
			this.changeDetector.detectChanges();
		}
	}

	update() {

		if (this.dataSource) {
			const httpPost: Observable<FishSchools> = this.service.update(this.originalData, this.dataSource.data);

			if (httpPost !== null) {
				httpPost.toPromise().then(response => {
					if (response.status === 'Success') {

						// Response may contain partial data, merge it
						/*const data = response.data;
						this.dataSource.data.forEach((item, index) => {

							// We might get less data since not all records in table were updated
							if (data[index]) {
								const deepEqual1 = deepEqual(item.id, data[index].id);
								if (deepEqual1) {
									const i = this.dataSource.data.indexOf(item);
									this.dataSource.data[i] = data[index];
								}
							}
						});*/

						this.loadData(response.data);
						this.showSuccess({message: this.translate.instant('FISH_SCHOOL.RESULTS.FISH_SCHOOL_UPDATE_SUCCESS'), type: 'success'});
					}
				}).catch(response => {
					if (response.error && response.error.status && response.error.status === 'Failure') {
						this.showError({message: response.error.code + ': ' + response.error.message, type: 'danger'});
					} else {
						this.showError({message: this.translate.instant('AUTH.VALIDATION.UPDATE_FS') + ' - '
								+ this.translate.instant('AUTH.VALIDATION.CONNECTION_FAILURE'), type: 'danger'});
					}
				});
			}
		} else {
			this.showWarning({message: this.translate.instant('FISH_SCHOOL.UPDATE_WITHOUT_RECORDS'), type: 'warning'});
		}
	}

	validate(): boolean {
		if (! this.isFishSchoolTableLoading && this.dataSource && this.dataSource.data) {
			if (this.dataSource.data.length === this.originalData.length) {
				return false;
			}

			const dirty: FishSchoolModel[] = this.dataSource.data.filter((item, index) => {
				const deepEqual1 = deepEqual(item, this.originalData[index]);
				return !deepEqual1;
			});

			return dirty.length === 0;
		} else if (! this.isFishSchoolTableLoading) {
			return true;
		}

		return false;
	}

	isFishSchoolReadWrite(action: string, prop: string, school: FishSchoolModel): boolean {
    	if (school.status === 'SOLD') {
    		return false;
		}
		return this.authorization.isFishSchoolReadWrite(action, prop);
	}

	applyFilter(filterValue: string) {
		if (this.dataSource) {
			 this.dataSource.filterPredicate = (data, filter: string) => {
				 const jsonData = JSON.stringify(data).trim();
				 return jsonData.indexOf(filter) !== -1
					|| jsonData.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
			 };

			this.dataSource.filter = filterValue.trim().toLowerCase();
		}
	}

	onFoodSelect(row, e) {
		row.food = e.value;
	}

	getDefaultFood(row) {
		return this.foods.find(f => f.name === row.food.name);
	}

	private loadData(data: FishSchoolModel[]) {

		this.originalData = JSON.parse(JSON.stringify(data));
		this.dataSource = new ResponsiveDataTable<FishSchoolModel>(data, this.dataReady);
		if (!this.changeDetector['destroyed']) {
			this.changeDetector.detectChanges();
		}

		this.dataSource.sortingDataAccessor = (item, property) => {
			switch (property) {
				// case 'deadLastUpdateDate':
				// case 'updatedDate':
				// case 'creationDate':
				case 'food':
					return ((item.food) ? item.food.name : '');
				case 'feedDate':
					return moment(item.feedDate, 'DD/MM/YYYY');
				default:
					return item[property];
			}
		};

		this.dataSource.sort = this.sort;
		this.havingFishSchoolRecords = true;
	}
}
