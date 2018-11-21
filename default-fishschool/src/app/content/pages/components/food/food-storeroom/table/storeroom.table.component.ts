import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FoodStoreRequestModel} from '../food-storeroom.component';
import {ReloadTableDataService} from '../../../../../../core/services/fishschool/reload-table-data.service';
import {ResponsiveDataTable} from '../../../../../../core/models/fishschool/table/ResponsiveDataTable';
import {FoodStoreroomModel} from '../../../../../../core/models/food/storeroom/food.storeroom.model';
import {MatSort} from '@angular/material';
import {ToastrManager} from 'ng6-toastr-notifications';
import {TranslateService} from '@ngx-translate/core';
import {FishSchoolsAuthorizationService} from '../../../../../../core/services/fishschool/fish-schools.authorization.service';
import {ToastSupport} from '../../../../../../core/models/fishschool/toast.support';
import {FoodStoreroomService} from '../../../../../../core/services/fishschool/food.storeroom.service';
import * as moment from 'moment';
import {FoodService} from '../../../../../../core/services/fishschool/food.service';
import {FoodModel} from '../../../../../../core/models/food/food.model';

@Component({
	selector: 'm-storeroom-table',
	templateUrl: './storeroom.table..component.html',
	styleUrls: ['./storeroom.table.component.scss']
})
export class StoreroomTableComponent extends ToastSupport implements OnInit {

	@Output() dataReady = new EventEmitter<boolean>();
	@Input() public model: FoodStoreRequestModel;

	displayedColumns: string[] = ['name', 'quantity', 'receipt', 'foodDate'];

	headers: string[];
	dataSource: ResponsiveDataTable<FoodStoreroomModel>;
	originalData: FoodStoreroomModel[] = [];
	@ViewChild(MatSort) sort: MatSort;
	foods: FoodModel[];
	foodNames: string[] = [];

	constructor(private service: FoodStoreroomService, private translate: TranslateService,
				private authorization: FishSchoolsAuthorizationService, public toastr: ToastrManager,
				private reloadService: ReloadTableDataService, private foodService: FoodService) {
		super(toastr);

		this.headers = [this.translate.instant('FOOD_STOREROOM.TABLE.NAME'),
			this.translate.instant('FOOD_STOREROOM.TABLE.QUANTITY'),
			this.translate.instant('FOOD_STOREROOM.TABLE.ACTION_TYPE'),
			this.translate.instant('FOOD_STOREROOM.TABLE.RECEIPT'),
			this.translate.instant('FOOD_STOREROOM.TABLE.FOOD_DATE')];
	}

	async ngOnInit() {
		await this.foodService.names().toPromise().then(response => {
			this.foods = response.data;

			for (const food of this.foods) {
				this.displayedColumns.push(food.name);
				this.foodNames.push(food.name);
			}

			return response;
		});

		this.reloadService.change.subscribe(data => {
			this.view();
		});

		await this.view();
	}

	async view() {

		await this.service.view(this.model).toPromise().then(response => {

			if (response.status === 'Success') {

				if (response.data.length === 0) {
					this.showInfo({message: this.translate.instant('VALIDATION.NO_RECORDS'), type: 'info'});
				} else {
					this.loadData(response.data);
				}
			} else {
				this.showError({message: this.translate.instant('FISH_SCHOOL.VALIDATION.LOAD_FOOS_STOREROOM_FAILURE'), type: 'danger'});
			}
		}).catch(response => {
			if (response !== 'undefined' && response.status === 'Failure') {
				this.showError({message: response.error.code + ': ' + response.error.message, type: 'danger'});
			} else {
				this.showError({message: this.translate.instant('AUTH.VALIDATION.CONNECTION_FAILURE'), type: 'danger'});
			}
		});
	}

	update() {
		console.log('Update() called... - temporary message');
		/*if (this.dataSource) {
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
						this.showSuccess({message: this.translate.instant('FISH_SCHOOL.RESULTS.FISH_SCHOOL_UPDATE_SUCCESS'), type: 'success'});
					}
				}).catch(response => {
					if (response.error !== 'undefined' && response.error.status === 'Failure') {
						this.showError({message: response.error.code + ': ' + response.error.message, type: 'danger'});
					} else {
						this.showError({message: this.translate.instant('AUTH.VALIDATION.CONNECTION_FAILURE'), type: 'danger'});
					}
				});
			} else {
				this.showInfo({message: this.translate.instant('VALIDATION.NO_CHANGES'), type: 'info'});
			}
		} else {
			this.showWarning({message: this.translate.instant('FISH_SCHOOL.UPDATE_WITHOUT_RECORDS'), type: 'warning'});
		}*/
	}

	getFoodColumns() {
		return this.foodNames;
	}

	compareObjects(o1: any, o2: any): boolean {
		return o1.name === o2.name && o1.id === o2.id;
	}

	isFoodStorageReadWrite(action: string, prop: string): boolean {
		return this.authorization.isFishSchoolReadWrite(action, prop);
	}

	applyFilter(filterValue: string) {
		if (this.dataSource) {
			this.dataSource.filter = filterValue.trim().toLowerCase();
		}
	}

	trackByIdentity(index, item) {
		return item;
	}

	private loadData(data: FoodStoreroomModel[]) {

		// Enrich JSON
		for (const foosStoreroom of data) {
			for (const food of this.foods) {
				if (foosStoreroom.name === food.name) {
					foosStoreroom[food.name] = foosStoreroom.quantity;
				} else {
					foosStoreroom[food.name] = undefined;
				}
			}
		}

		this.originalData = JSON.parse(JSON.stringify(data));
		this.dataSource = new ResponsiveDataTable<FoodStoreroomModel>(data, this.dataReady);

		this.dataSource.sortingDataAccessor = (item, property) => {
			for (const food of this.foods) {
				if (food.name === property) {
					return '\'' + item[property] + '\'';
				}
			}

			switch (property) {
				case 'name':
					return '\'' + item.name + '\'';
				case 'foodDate':
					return moment(item.foodDate, 'DD/MM/YYYY');
				default:
					return item[property];
			}
		};

		this.dataSource.sort = this.sort;
	}
}
