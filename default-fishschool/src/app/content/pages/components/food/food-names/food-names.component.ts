import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import {TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs';
import * as deepEqual from 'deep-equal';
import {FishSchoolsAuthorizationService} from '../../../../../core/services/fishschool/fish-schools.authorization.service';
import {AuthenticationService} from '../../../../../core/auth/authentication.service';
import {FoodService} from '../../../../../core/services/fishschool/food.service';
import {ToastrManager} from 'ng6-toastr-notifications';
import {ToastSupport} from '../../../../../core/models/fishschool/toast.support';
import {FoodModel} from '../../../../../core/models/food/food.model';
import {FoodsModel} from '../../../../../core/models/food/foods.model';

@Component({
	selector: 'm-food-names',
	templateUrl: './food-names.component.html',
	styleUrls: ['./food-names.component.scss']
})
export class FoodNamesComponent extends ToastSupport implements OnInit {

	displayedColumns: string[] = ['name', 'quantity'];
	headers: string[];
	dataSource: MatTableDataSource<FoodModel>;
	originalData: FoodModel[] = [];
	@ViewChild(MatSort) sort: MatSort;

	constructor(private foodService: FoodService, private authService: AuthenticationService,
				private translate: TranslateService, private authorization: FishSchoolsAuthorizationService,
				public toastr: ToastrManager) {

		super(toastr);

		this.headers = [this.translate.instant('FOOD.TABLE.NAME'),
			this.translate.instant('FOOD.TABLE.QUANTITY')];
	}

	async ngOnInit() {
		await this.view();
	}

	async view() {

		await this.foodService.view().toPromise().then(response => {

			if (response.status === 'Success') {

				if (response.data.length === 0) {
					this.dataSource = new MatTableDataSource<FoodModel>([]);
					this.showSuccess({message: this.translate.instant('VALIDATION.NO_RECORDS'), type: 'info'});
				} else {

					// Deep copy
					this.loadData(response.data);
				}
			} else {
				this.showError({message: this.translate.instant('FISH_SCHOOL.VALIDATION.LOAD_FOOD_FAILURE'), type: 'danger'});
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

		const httpPost: Observable<FoodsModel> = this.foodService.update(this.originalData, this.dataSource.data);

		if (httpPost !== null) {
			httpPost.toPromise().then(response => {
				if (response.status === 'Success') {

					// Response may contain partial data, merge it
					const data: FoodModel[] = response.data;

					// Deep copy
					this.originalData = JSON.parse(JSON.stringify(data));
					data.forEach((item, index) => {
						const deepEqual1 = deepEqual(item.id, data[index].id);
						if (deepEqual1) {
							const i = this.dataSource.data.indexOf(item);
							this.dataSource[i] = data[index];
						}
					});

					this.showInfo({message: this.translate.instant('FOOD.RESULTS.FOOD_UPDATE_SUCCESS'), type: 'info'});
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
	}

	addNew() {
		this.dataSource.data.push({id: undefined, companyId: undefined, name: undefined, quantity: undefined,
			status: 'ACTIVE', creationDate: undefined, updatedDate: undefined});
		this.loadData(this.dataSource.data);
	}

	applyFilter(filterValue: string) {
		if (this.dataSource) {
			this.dataSource.filter = filterValue.trim().toLowerCase();
		}
	}

	isFoodReadWrite(prop: string): boolean {
		return this.authorization.isFoodReadWrite('UPDATE', prop);
	}

	private loadData(data: FoodModel[]) {

		this.originalData = JSON.parse(JSON.stringify(data));
		this.dataSource = new MatTableDataSource<FoodModel>(data);

		this.dataSource.sortingDataAccessor = (item, property) => {
			switch (property) {
				// case 'updatedDate':
				// case 'creationDate':
				// 	return moment(item.creationDate, 'DD/MM/YYYY');
				case 'name':
					return '\'' + item[property] + '\'';
				default:
					return item[property];
			}
		};

		this.dataSource.sort = this.sort;
	}
}


