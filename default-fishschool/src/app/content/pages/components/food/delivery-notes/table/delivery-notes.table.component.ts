import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {DeliveryNotesRequestModel} from '../delivery-notes.component';
import {ReloadTableDataService} from '../../../../../../core/services/fishschool/reload-table-data.service';
import {ResponsiveDataTable} from '../../../../../../core/models/fishschool/table/ResponsiveDataTable';
import {DeliveryNotesModel} from '../../../../../../core/models/food/delivery-notes/deliveryNotesModel';
import {MatSort} from '@angular/material';
import {ToastrManager} from 'ng6-toastr-notifications';
import {TranslateService} from '@ngx-translate/core';
import {FishSchoolsAuthorizationService} from '../../../../../../core/services/fishschool/fish-schools.authorization.service';
import {ToastSupport} from '../../../../../../core/models/fishschool/toast.support';
import {DeliveryNotesService} from '../../../../../../core/services/fishschool/delivery-notes.service';
import {FoodService} from '../../../../../../core/services/fishschool/food.service';
import {FoodModel} from '../../../../../../core/models/food/food.model';
import {Observable} from 'rxjs';
import * as moment from 'moment';
import * as deepEqual from 'deep-equal';
import {DeliveriesNotesModel} from '../../../../../../core/models/food/delivery-notes/deliveriesNotesModel';
import {FoodSlotModel} from '../../../../../../core/models/food/delivery-notes/foodSlotModel';
import {Moment} from 'moment';

@Component({
	selector: 'm-delivery-notes-table',
	templateUrl: './delivery-notes.table..component.html',
	styleUrls: ['./delivery-notes.table.component.scss']
})
export class DeliveryNotesTableComponent extends ToastSupport implements OnInit {

	@Output() dataReady = new EventEmitter<boolean>();
	@Input() public model: DeliveryNotesRequestModel;

	displayedColumns: string[] = ['actionsColumn', 'receipt', 'foodDate'];

	headers: string[];
	dataSource: ResponsiveDataTable<DeliveryNotesModel>;
	originalData: DeliveryNotesModel[] = [];
	@ViewChild(MatSort) sort: MatSort;
	foods: FoodModel[];
	foodSlots: FoodSlotModel[];
	foodNames: string[] = [];
	isDeliveryNotesTableLoading = true;
	havingDeliveryNotesRecords = false;
	foodIndex = 0;
	totalFoodIndex = 1;
	maxDate: Date = new Date();

	constructor(private service: DeliveryNotesService, private translate: TranslateService,
				private authorization: FishSchoolsAuthorizationService, public toastr: ToastrManager,
				private reloadService: ReloadTableDataService, private foodService: FoodService) {
		super(toastr);
	}

	async ngOnInit() {
		this.headers = [this.translate.instant('DELIVERY_NOTES.TABLE.RECEIPT'),
			this.translate.instant('DELIVERY_NOTES.TABLE.FOOD_DATE')];

		await this.foodService.names().toPromise().then(response => {
			this.foods = response.data;
			let i = 1;

			for (const food of this.foods) {
				this.displayedColumns.push('food' + i++);
				this.foodNames.push(food.name);
			}

			return response;
		});

		await this.foodService.viewSlots().toPromise().then(response => {
			this.foodSlots = response.data;

			this.headers = [this.translate.instant('DELIVERY_NOTES.TABLE.RECEIPT'),
				this.translate.instant('DELIVERY_NOTES.TABLE.FOOD_DATE')];

			for (const slot of this.foodSlots) {
				this.headers.push(slot.slot);
			}

			return response;
		});

		this.reloadService.change.subscribe(() => {
			this.view();
		});

		await this.view();
	}

	async view() {

		this.isDeliveryNotesTableLoading = true;
		await this.service.view(this.model).toPromise().then(response => {

			if (response.status === 'Success') {

				if (response.data.length === 0) {
					this.dataReady.emit(false);
					this.havingDeliveryNotesRecords = false;
					this.dataSource = new ResponsiveDataTable<DeliveryNotesModel>([], this.dataReady);
					this.showInfo({message: this.translate.instant('VALIDATION.NO_RECORDS'), type: 'info'});
				} else {
					this.loadData(response.data);
				}
			} else {
				this.showError({message: this.translate.instant('VALIDATION.LOAD_FOOD_DELIVERY_NOTES_FAILURE'), type: 'danger'});
			}
		}).catch(response => {
			if (response !== 'undefined' && response.status === 'Failure') {
				this.showError({message: response.error.code + ': ' + response.error.message, type: 'danger'});
			} else {
				this.showError({message: this.translate.instant('AUTH.VALIDATION.CONNECTION_FAILURE'), type: 'danger'});
			}
		});

		this.isDeliveryNotesTableLoading = false;
	}

	getTotal() {
		if (this.dataSource && this.dataSource.data) {
			const reduce = this.dataSource.data.map(t => t['food' + this.totalFoodIndex]).reduce((acc, value) => {
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

			this.totalFoodIndex++;
			return reduce;
		}

		return 0;
	}

	resetTotalFoodIndex() {
		this.totalFoodIndex = 1;
	}

	update() {

		if (this.dataSource) {
			const httpPost: Observable<DeliveriesNotesModel> = this.service.update(this.originalData, this.dataSource.data, this.foods);

			if (httpPost !== null) {
				httpPost.toPromise().then(response => {
					if (response.status === 'Success') {

						// Response may contain partial data, merge it
						const returnedData: DeliveryNotesModel[] = response.data;
						this.dataSource.data.forEach((item, index) => {

							// We might get less data since not all records in table were updated
							if (returnedData.length > index) {
								if (returnedData[index] && item.id === returnedData[index].id) {

									console.log('item.foodDate               : ' + item.foodDate);
									console.log('returnedData[index].foodDate: ' + returnedData[index].foodDate);

									if (returnedData[index].foodDate === item.foodDate) {
										const deepEqual1 = deepEqual(item, returnedData[index]);
										if (!deepEqual1) {
											const i = this.dataSource.data.indexOf(item);
											this.dataSource.data[i] = returnedData[index];
										}
									}
								} else {

									console.log('item.foodDate               : ' + item.foodDate);
									console.log('returnedData[index].foodDate: ' + returnedData[index].foodDate);

									const foodDate: Moment = moment(returnedData[index].foodDate, 'DD/MM/YYYY');

									if (foodDate.isBefore(this.model.startDate)
										|| foodDate.isAfter(this.model.startDate.clone().add(this.model.days, 'days'))) {

										returnedData[index].momentFoodDate = moment(returnedData[index].foodDate, 'DD/MM/YYYY');
										const idx = this.dataSource.data.findIndex(elem => elem.id === returnedData[index].id);

										if (idx > -1) {
											this.dataSource.data.splice(idx, 1);
										}
									}
								}
							}
						});

						this.loadData(this.dataSource.data);
						this.showSuccess({message: this.translate.instant('DELIVERY_NOTES.RESULTS.DELIVERY_NOTES_UPDATE_SUCCESS'), type: 'success'});
					}
				}).catch(response => {
					if (response.error && response.error.status && response.error.status === 'Failure') {
						this.showError({message: response.error.code + ': ' + response.error.message, type: 'danger'});
					} else {
						this.showError({message: this.translate.instant('AUTH.VALIDATION.CONNECTION_FAILURE'), type: 'danger'});
					}
				});
			}
		}
	}

	getFood() {
		return this.foodSlots[this.foodIndex++].name;
	}

	resetIndex() {
		this.foodIndex = 0;
	}

	createNew() {
		const deliveryNotesModel = new DeliveryNotesModel(undefined, undefined, undefined, undefined,
			this.model.action, undefined, moment(this.dataSource.data[this.dataSource.data.length - 1].foodDate, 'DD/MM/YYYY').format('DD/MM/YYYY'),
			undefined, undefined, undefined, undefined,
			undefined, undefined, undefined, undefined, undefined, undefined, undefined,
			undefined, undefined, undefined, undefined, undefined, undefined, undefined);

		this.dataSource.data.push(deliveryNotesModel);
		this.dataSource = new ResponsiveDataTable<DeliveryNotesModel>(this.dataSource.data, this.dataReady);
	}

	delete(row: DeliveryNotesModel) {

		const index = this.dataSource.data.indexOf(row, 0);
		if (index > -1) {
			let foodDefined = false;
			for (let i = 0; i < 16; i++) {
				if (row['food' + i]) {
					foodDefined = true;
					break;
				}
			}

			if (row.receipt && row.foodDate && foodDefined) {

				if (this.originalData.length < this.dataSource.data.length) {

					// There are newly added rows, check if one of them is the deleted row
					const newlyAdded: DeliveryNotesModel[] = this.dataSource.data.slice(this.originalData.length, this.dataSource.data.length);
					const dirty: DeliveryNotesModel[] = newlyAdded.filter((item, idx) => {
						const deepEqual1 = deepEqual(item, this.originalData[idx]);
						return !deepEqual1;
					});

					if (dirty.length > 0) {
						this.dataSource.data.splice(index, 1);
						this.loadData(this.dataSource.data);
						this.showSuccess({ message: this.translate.instant('DELIVERY_NOTES.RESULTS.DELIVERY_NOTES_DELETE_SUCCESS'), type: 'success'});
					}
				} else {
					this.dataSource.data.splice(index, 1);
					this.service.delete(row).toPromise().then(response => {
						if (response.status === 'Success') {
							this.loadData(this.dataSource.data);
							this.showSuccess({
								message: this.translate.instant('DELIVERY_NOTES.RESULTS.DELIVERY_NOTES_DELETE_SUCCESS'),
								type: 'success'
							});
						}
					}).catch(response => {
						if (response.error && response.error.status && response.error.status === 'Failure') {
							this.showError({message: response.error.code + ': ' + response.error.message, type: 'danger'});
						} else {
							this.showError({message: this.translate.instant('AUTH.VALIDATION.CONNECTION_FAILURE'), type: 'danger'});
						}
					});
				}
			} else {
				this.loadData(this.dataSource.data);
				this.showSuccess({ message: this.translate.instant('DELIVERY_NOTES.RESULTS.DELIVERY_NOTES_DELETE_SUCCESS'), type: 'success'});
			}
		}
	}

	validate(): boolean {
		if (!this.isDeliveryNotesTableLoading && this.dataSource && this.dataSource.data) {
			if (this.dataSource.data.length !== this.originalData.length) {
				return false;
			}

			const dirty: DeliveryNotesModel[] = this.dataSource.data.filter((item, index) => {
				const deepEqual1 = deepEqual(item, this.originalData[index]);
				return !deepEqual1;
			});

			return dirty.length === 0;
		}

		return false;
	}

	dateChanged(row, $event) {
		row.foodDate = $event.value.format('DD/MM/YYYY');
		row.momentFoodDate = $event.value;
	}

	isFoodDeliveryNotesReadWrite(action: string, prop: string): boolean {
		return this.authorization.isFishSchoolReadWrite(action, prop);
	}

	applyFilter(filterValue: string) {
		if (this.dataSource) {
			this.dataSource.filter = filterValue.trim().toLowerCase();
		}
	}

	private loadData(data: DeliveryNotesModel[]) {

		for (const deliveryNotes of data) {
		 	deliveryNotes.momentFoodDate = moment(deliveryNotes.foodDate, 'DD/MM/YYYY');
		}

		this.originalData = JSON.parse(JSON.stringify(data));
		for (const originalNotes of this.originalData) {
			originalNotes.momentFoodDate = moment(originalNotes.foodDate, 'DD/MM/YYYY');
		}

		this.dataReady.emit(true); // To take immediate affect
		this.dataSource = new ResponsiveDataTable<DeliveryNotesModel>(data, this.dataReady);

		this.dataSource.sortingDataAccessor = (item, property) => {
			for (const food of this.foods) {
				if (food.name === property) {
					return '\'' + item[property] + '\'';
				}
			}

			for (const slot of this.foodSlots) {
				if (slot.slot === property) {
					return '\'' + item[property] + '\'';
				}
			}

			return item[property];
		};

		this.dataSource.sort = this.sort;
		this.havingDeliveryNotesRecords = true;
	}
}
