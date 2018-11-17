import {Component, OnInit, ViewChild} from '@angular/core';
import {FishSchools} from '../../../../../core/models/fishschool/fish.schools.model';
import {FarmService} from '../../../../../core/services/farm/farm-schools.service';
import {FishSchoolsService} from '../../../../../core/services/fishschool/fish-schools.service';
import {TranslateService} from '@ngx-translate/core';
import {ToastrManager} from 'ng6-toastr-notifications';
import {Observable} from 'rxjs';
import {FishSchoolModel} from '../../../../../core/models/fishschool/fish-school.model';
import {MatSort, MatTableDataSource} from '@angular/material';
import {FishSchoolsAuthorizationService} from '../../../../../core/services/fishschool/fish-schools.authorization.service';
import {ToastSupport} from '../../../../../core/models/fishschool/toast.support';
import {Moment} from 'moment';
import * as moment from 'moment';
import {FoodService} from '../../../../../core/services/fishschool/food.service';
import {FoodModel} from '../../../../../core/models/food/food.model';
import {ReloadFishSchoolsService} from '../../../../../core/services/fishschool/reload-fish-schools.service';

@Component({
	selector: 'm-food-storeroom',
	templateUrl: './food-storeroom.component.html',
	styleUrls: ['./food-storeroom.component.scss']
})
export class FoodStoreroomComponent extends ToastSupport implements OnInit {

	maxDate: Moment = moment();
	model: FoodStoretRequestModel = { startDate: moment(), status: 'SELL', days: 10 };
	panelOpenState: boolean = true;

	constructor(private foodService: FoodService, private translate: TranslateService,
				private authorization: FishSchoolsAuthorizationService, public toastr: ToastrManager,
				private reloadService: ReloadFishSchoolsService) {

		super(toastr);
	}

	async ngOnInit() {
	}

	loadTableData() {
		console.log(this.model.startDate.format('DD/MM/YYYY') + ', ' + this.model.status + ', ' + this.model.days);
		this.panelOpenState = false;

		// TODO: submit view FoodControl
		this.reloadService.reload(true);
	}

	/*private async viewFood() {

		await this.foodService.view().toPromise().then(response => {

			if (response.status === 'Success') {

				if (response.data.length === 0) {
					this.showSuccess({message: this.translate.instant('VALIDATION.NO_RECORDS'), type: 'info'});
				} else {
					this.food = response.data;
					this.food.forEach((food, index) => {
						this.displayedColumns.push(food.name + '\n' + food.quantity);
					});
				}
			} else {
				this.showError({message: this.translate.instant('VALIDATION.LOAD_FOOD_FAILURE'), type: 'danger'});
			}
		}).catch(response => {
			if (response !== 'undefined' && response.status === 'Failure') {
				this.showError({message: response.error.code + ': ' + response.error.message, type: 'danger'});
			} else {
				this.showError({message: this.translate.instant('AUTH.VALIDATION.CONNECTION_FAILURE'), type: 'danger'});
			}
		});
	}*/
}

export interface FoodStoretRequestModel {
	startDate: Moment;
	status: string;
	days: number;
}
