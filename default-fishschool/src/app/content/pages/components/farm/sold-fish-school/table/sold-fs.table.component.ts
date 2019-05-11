import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {SoldFsRequestModel} from '../sold-fish-school.component';
import {FishSchoolModel} from '../../../../../../core/models/fishschool/fish-school.model';
import {FishSchoolsAuthorizationService} from '../../../../../../core/services/fishschool/fish-schools.authorization.service';
import {TranslateService} from '@ngx-translate/core';
import {ToastrManager} from 'ng6-toastr-notifications';
import {FishSchoolsService} from '../../../../../../core/services/fishschool/fish-schools.service';
import {ToastSupport} from '../../../../../../core/models/fishschool/toast.support';
import * as moment from 'moment';
import * as deepEqual from 'deep-equal';
import {MatSort} from '@angular/material';
import {FoodService} from '../../../../../../core/services/fishschool/food.service';
import {ReloadTableDataService} from '../../../../../../core/services/fishschool/reload-table-data.service';
import {ResponsiveDataTable} from '../../../../../../core/models/fishschool/table/ResponsiveDataTable';
import {FoodModel} from '../../../../../../core/models/food/food.model';

@Component({
	selector: 'm-sold-fs-table',
	templateUrl: './sold-fs.table.component.html',
	styleUrls: ['./sold-fs.table.component.scss']
})
export class SoldTableComponent extends ToastSupport implements OnInit {

	displayedColumns: string[] = ['feedDate', 'soldFish', 'averageWeight', 'sale', 'totalSale', 'totalWeight', 'fcr', 'totalGivenFood'];

	headers: string[];
	dataSource: ResponsiveDataTable<FishSchoolModel>;
	originalData: FishSchoolModel[] = [];

	@Input() public model: SoldFsRequestModel;
	@ViewChild(MatSort) sort: MatSort;

	@Output() dataReady = new EventEmitter<boolean>();
	foods: FoodModel[];
	isFishSchoolTableLoading = true;
	havingFishSchoolRecords = false;

    constructor(private service: FishSchoolsService, private foodService: FoodService, private translate: TranslateService,
				private authorization: FishSchoolsAuthorizationService, public toastr: ToastrManager,
				private reloadService: ReloadTableDataService, private changeDetector: ChangeDetectorRef) {
		super(toastr);

		this.headers = [this.translate.instant('FISH_SCHOOL.SOLD.FEED_DATE'),
			this.translate.instant('FISH_SCHOOL.SOLD.SOLD_FISH'),
			this.translate.instant('FISH_SCHOOL.SOLD.AVERAGE_WEIGHT'),
			this.translate.instant('FISH_SCHOOL.SOLD.SALE'),
			this.translate.instant('FISH_SCHOOL.SOLD.TOTAL_SALE'),
			this.translate.instant('FISH_SCHOOL.SOLD.TOTAL_WEIGHT'),
			this.translate.instant('FISH_SCHOOL.SOLD.FCR'),
			this.translate.instant('FISH_SCHOOL.SOLD.TOTAL_GIVEN_FOOD')];

		this.foodService.names().toPromise().then(response => {
			this.foods = response.data;
			return response;
		}).catch(response => {
			if (response && response.error && response.error.status === 'Failure') {
				this.showError({message: response.error.code + ': ' + response.error.message, type: 'danger'});
			} else {
				this.showError({message: this.translate.instant('AUTH.VALIDATION.CONNECTION_FAILURE'), type: 'danger'});
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
		await this.service.sold(this.model).toPromise().then(response => {

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
			}
		}).catch(response => {
			if (response && response.error && response.error.status === 'Failure') {
				this.showError({message: response.error.code + ': ' + response.error.message, type: 'danger'});
			} else {
				this.showError({message: this.translate.instant('AUTH.VALIDATION.CONNECTION_FAILURE'), type: 'danger'});
			}
		});

		this.isFishSchoolTableLoading = false;
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

	getTotal(row, prop) {
		if (this.dataSource && this.dataSource.data) {
			const reduce = this.dataSource.data.map(t => t[prop]).reduce((acc, value) => {
					const accNan = isNaN(acc);
					const valueNan = isNaN(value);
					if (accNan && !valueNan) {
						return value;
					}
					if (!accNan && valueNan) {
						return acc;
					}
					return acc + value;
				},
				0);

			return reduce;
		}

		return 0;
	}

	getAvgTotal(row, prop) {
		if (this.dataSource && this.dataSource.data) {
			const reduce = this.dataSource.data.map(t => t[prop]).reduce((acc, value) => {
					const accNan = isNaN(acc);
					const valueNan = isNaN(value);
					if (accNan && !valueNan) {
						return value;
					}
					if (!accNan && valueNan) {
						return acc;
					}
					return acc + value;
				},
				0);

			return reduce / this.dataSource.data.length;
		}

		return 0;
	}

	private loadData(data: FishSchoolModel[]) {

		this.originalData = JSON.parse(JSON.stringify(data));
		this.dataSource = new ResponsiveDataTable<FishSchoolModel>(data, this.dataReady);
		this.changeDetector.detectChanges();

		this.dataSource.sortingDataAccessor = (item, property) => {
			switch (property) {
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
