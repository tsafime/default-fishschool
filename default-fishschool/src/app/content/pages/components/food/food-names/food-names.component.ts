import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatSort, MatTableDataSource} from '@angular/material';
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
import {ConfirmDeleteFoodDialogComponent} from './confirm-delete/confirm-delete.food.dialog.component';

@Component({
	selector: 'm-food-names',
	templateUrl: './food-names.component.html',
	styleUrls: ['./food-names.component.scss']
})
export class FoodNamesComponent extends ToastSupport implements OnInit {

	displayedColumns: string[] = ['actionsColumn', 'name', 'quantity'];
	headers: string[];
	dataSource: MatTableDataSource<FoodModel>;
	originalData: FoodModel[] = [];
	@ViewChild(MatSort) sort: MatSort;

	constructor(private foodService: FoodService, private authService: AuthenticationService,
				private translate: TranslateService, private authorization: FishSchoolsAuthorizationService,
				public toastr: ToastrManager, public dialog: MatDialog) {

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
			if (response && response.error && response.error.status === 'Failure') {
				this.showError({message: response.error.code + ': ' + response.error.message, type: 'danger'});
			} else {
				this.showError({message: this.translate.instant('AUTH.VALIDATION.FOOD') + ' - '
						+ this.translate.instant('AUTH.VALIDATION.CONNECTION_FAILURE'), type: 'danger'});
			}
		});
	}

	update() {

		if (this.dataSource) {
			const data: FoodModel[] = JSON.parse(JSON.stringify(this.dataSource.data));
			data.forEach((item, index) => {
				if (item.name === undefined || item.quantity === undefined) {
					data.splice(index, 1);

					let missingParts = (item.name === undefined) ? '\'' + this.translate.instant('FOOD.TABLE.NAME') + '\'' : '';
					missingParts += (item.quantity === undefined) ? ', \'' + this.translate.instant('FOOD.TABLE.QUANTITY') + '\'' : '';
					this.showWarning({
						message: this.translate.instant('FOOD.VALIDATION.NEW_RECORD_INCOMPLETE', { missingParts: missingParts }),
						type: 'warning'});
				}
			});

			const httpPost: Observable<FoodsModel> = this.foodService.update(this.originalData, data);

			if (httpPost !== null) {
				httpPost.toPromise().then(response => {
					if (response.status === 'Success') {

						// Response may contain partial data, merge it
						const returnedData: FoodModel[] = response.data;

						this.dataSource.data.forEach((item, index) => {

							// We might get less data since not all records in table were updated
							returnedData.forEach((retItem, retIndex) => {
								if (retItem && item.name === retItem.name) {
									const deepEqual1 = deepEqual(item, retItem);
									if (!deepEqual1) {
										const i = this.dataSource.data.indexOf(retItem);
										this.dataSource.data[i] = retItem;
										returnedData.splice(retIndex);
									}
								}
							});
						});

						this.loadData(this.dataSource.data);
						this.showSuccess({message: this.translate.instant('FOOD.RESULTS.FOOD_UPDATE_SUCCESS'), type: 'success'});
					}
				}).catch(response => {
					if (response.error && response.error.status && response.error.status === 'Failure') {
						this.showError({message: response.error.code + ': ' + response.error.message, type: 'danger'});
					} else {
						this.showError({message: this.translate.instant('AUTH.VALIDATION.UPDATE_FOOD') + ' - '
								+ this.translate.instant('AUTH.VALIDATION.CONNECTION_FAILURE'), type: 'danger'});
					}
				});
			} else {
				this.showWarning({message: this.translate.instant('VALIDATION.NO_CHANGES'), type: 'warning'});
			}
		}
	}

	validate(): boolean {
		if (this.dataSource && this.dataSource.data) {
			const dirty: FoodModel[] = this.dataSource.data.filter((item, index) => {
				const deepEqual1 = deepEqual(item, this.originalData[index]);
				return !deepEqual1;
			});

			return dirty.length === 0;
		}

		return false;
	}

	addNew() {
		this.dataSource.data.push({id: undefined, companyId: undefined, name: undefined, quantity: undefined,
			status: 'ACTIVE', creationDate: undefined, updatedDate: undefined});
		this.loadData(this.dataSource.data);
	}

	delete(row: FoodModel) {

		const dialogRef = this.dialog.open(ConfirmDeleteFoodDialogComponent, {
			height: '200px',
			width: '500px',
			data: { confirmed: false },
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result === 'true') {
				const index = this.dataSource.data.indexOf(row, 0);

				if (index > -1) {
					if (row.name && row.quantity) {

						if (this.originalData.length < this.dataSource.data.length) {

							// There are newly added rows, check if one of them is the deleted row
							const newlyAdded: FoodModel[] = this.dataSource.data.slice(this.originalData.length, this.dataSource.data.length);
							const dirty: FoodModel[] = newlyAdded.filter((item, idx) => {
								const deepEqual1 = deepEqual(item, this.originalData[idx]);
								return !deepEqual1;
							});

							if (dirty.length > 0) {
								this.dataSource.data.splice(index, 1);
								this.loadData(this.dataSource.data);
								this.showSuccess({ message: this.translate.instant('FOOD.RESULTS.FOOD_DELETE_SUCCESS'), type: 'success'});
							}
						} else {
							this.foodService.delete(row).toPromise().then(response => {
								if (response.status === 'Success') {
									this.dataSource.data.splice(index, 1);
									this.loadData(this.dataSource.data);
									this.showSuccess({ message: this.translate.instant('FOOD.RESULTS.FOOD_DELETE_SUCCESS'), type: 'success'});
								}
							}).catch(response => {
								if (response.error && response.error.status && response.error.status === 'Failure') {
									this.showError({message: response.error.code + ': ' + response.error.message, type: 'danger'});
								} else {
									this.showError({message: this.translate.instant('AUTH.VALIDATION.DELETE_FOOD') + ' - '
											+ this.translate.instant('AUTH.VALIDATION.CONNECTION_FAILURE'), type: 'danger'});
								}
							});
						}
					} else {
						this.dataSource.data.splice(index, 1);
						this.loadData(this.dataSource.data);
						this.showSuccess({message: this.translate.instant('FOOD.RESULTS.FOOD_DELETE_SUCCESS'), type: 'success'});
					}
				}
			}
		});
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

export interface ConfirmDeleteFoodDialogData {
	confirmed: boolean;
}

