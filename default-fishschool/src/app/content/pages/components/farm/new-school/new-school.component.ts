import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {FishSchools} from '../../../../../core/models/fishschool/fish.schools.model';
import {FishSchoolModel} from '../../../../../core/models/fishschool/fish-school.model';
import * as moment from 'moment';
import {FoodModel} from '../../../../../core/models/food/food.model';
import {FishSchoolsService} from '../../../../../core/services/fishschool/fish-schools.service';
import {TranslateService} from '@ngx-translate/core';
import {ToastSupport} from '../../../../../core/models/fishschool/toast.support';
import {ToastrManager} from 'ng6-toastr-notifications';
import {FoodService} from '../../../../../core/services/fishschool/food.service';

@Component({
	selector: 'm-new-school',
	templateUrl: './new-school.component.html',
	styleUrls: ['./new-school.component.scss']
})
export class NewSchoolComponent extends ToastSupport implements OnInit {

	school: FishSchoolModel = {
		id: null, companyId: null, name: null, updateName: null, status: null, creationDate: null,
		updatedDate: null, age: null, specie: 'Telipa', quantity: null, dead: null, menualAvgWeight: null, averageWeight: null, soldFish: null,
		foodWeight: null, totalGivenFood: null, actualGivenFood: null, percentageTsemach: 100, deadLastUpdateDate: null,
		food: null, feedDate: null, sale: null, totalSale: null, fcr: null, salesFcr: null, totalWeight: null, updatedCreationDate: moment()
	};

	maxDate: Date = moment().add(365, 'days').toDate();
	foods: FoodModel[];

	constructor(private fishSchoolService: FishSchoolsService, private translate: TranslateService, public toastr: ToastrManager,
				private foodService: FoodService) {

		super(toastr);
	}

	async ngOnInit() {
		await this.foodService.names().toPromise().then(response => {
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

	onFoodSelect(row, e) {
		row.food = e.value;
	}

	createNewFishSchool() {
		this.school.updatedCreationDate = moment.utc(this.school.updatedCreationDate);

		const httpPost: Observable<FishSchools> = this.fishSchoolService.createNewFishSchool(this.school);
		httpPost.toPromise().then(response => {
			if (response.status === 'Success') {
				this.showSuccess({message: this.translate.instant('FISH_SCHOOL.RESULTS.FISH_SCHOOL_UPDATE_SUCCESS'), type: 'success'});

				// this.school = { id: null,	companyId: null, name: null, updateName: null, status: null, creationDate: null,
				// 	updatedDate: null, age: null, specie: null, quantity: null, dead: null, menualAvgWeight: null, averageWeight: null,
				// 	foodWeight: null, totalGivenFood: null, actualGivenFood: null, percentageTsemach: null, deadLastUpdateDate: null,
				// 	food: null, feedDate: null, sale: null, totalSale: null, fcr: null, salesFcr: null, totalWeight: null, updatedCreationDate: null };
				// this.focusInput.nativeElement.focus();
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
