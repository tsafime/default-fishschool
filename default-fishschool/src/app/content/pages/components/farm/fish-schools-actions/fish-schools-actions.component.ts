import {Component, OnInit, ViewChild} from '@angular/core';
import {FishSchoolsService} from '../../../../../core/services/fishschool/fish-schools.service';
import {Observable} from 'rxjs';
import {FishSchools} from '../../../../../core/models/fishschool/fish.schools.model';
import {ToastSupport} from '../../../../../core/models/fishschool/toast.support';
import {ToastrManager} from 'ng6-toastr-notifications';
import {TranslateService} from '@ngx-translate/core';
import {FishSchoolModel} from '../../../../../core/models/fishschool/fish-school.model';
import {FishSchoolsAuthorizationService} from '../../../../../core/services/fishschool/fish-schools.authorization.service';
import {MatSort} from '@angular/material';
import * as moment from 'moment';
import {FoodModel} from '../../../../../core/models/food/food.model';
import {FoodService} from '../../../../../core/services/fishschool/food.service';

@Component({
	selector: 'm-quick-actions',
	templateUrl: './fish-schools-actions.component.html',
	styleUrls: ['./fish-schools-actions.component.scss']
})
export class FishSchoolsActionsComponent extends ToastSupport implements OnInit {

	school: FishSchoolModel = { id: null,	companyId: null, name: null, updateName: null, status: null, creationDate: null,
		updatedDate: null, age: null, specie: null, quantity: null, dead: null, menualAvgWeight: null, averageWeight: null,
		foodWeight: null, totalGivenFood: null, actualGivenFood: null, percentageTsemach: null, deadLastUpdateDate: null,
		food: null, feedDate: null, sale: null, totalSale: null, fcr: null, salesFcr: null, totalWeight: null, updatedCreationDate: null };

	@ViewChild(MatSort) sort: MatSort;
	fishSchoolNames: string[];
	maxDate: Date = moment().add(365, 'days').toDate();
	foods: FoodModel[];

	constructor(private fishSchoolService: FishSchoolsService, public toastr: ToastrManager, private translate: TranslateService,
				private authorization: FishSchoolsAuthorizationService, private foodService: FoodService) {
		super(toastr);
	}

	async ngOnInit() {
		await this.fishSchoolService.names().toPromise().then(response => {
			this.fishSchoolNames = response.data;
			return response;
		}).catch(response => {
			if (response && response.error && response.error.status === 'Failure') {
				this.showError({message: response.error.code + ': ' + response.error.message, type: 'danger'});
			} else {
				this.showError({message: this.translate.instant('AUTH.VALIDATION.CONNECTION_FAILURE'), type: 'danger'});
			}
		});

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

	createNewFishSchool() {
		const httpPost: Observable<FishSchools> = this.fishSchoolService.createNewFishSchool(this.school);
		httpPost.toPromise().then(response => {
			if (response.status === 'Success') {
				this.showSuccess({message: this.translate.instant('FISH_SCHOOL.RESULTS.FISH_SCHOOL_UPDATE_SUCCESS'), type: 'success'});
			}
		}).catch(response => {
			if (response.error && response.error.status && response.error.status === 'Failure') {
				this.showError({message: response.error.code + ': ' + response.error.message, type: 'danger'});
			} else {
				this.showError({message: this.translate.instant('AUTH.VALIDATION.CONNECTION_FAILURE'), type: 'danger'});
			}
		});
	}

	renameFishSchool() {
		const httpPost: Observable<FishSchools> = this.fishSchoolService.renameFishSchool(this.school.name, this.school.updateName);
		httpPost.toPromise().then(response => {
			if (response.status === 'Success') {
				this.showSuccess({message: this.translate.instant('FISH_SCHOOL.RESULTS.FISH_SCHOOL_UPDATE_SUCCESS'), type: 'success'});
			}
		}).catch(response => {
			if (response.error && response.error.status && response.error.status === 'Failure') {
				this.showError({message: response.error.code + ': ' + response.error.message, type: 'danger'});
			} else {
				this.showError({message: this.translate.instant('AUTH.VALIDATION.CONNECTION_FAILURE'), type: 'danger'});
			}
		});
	}

	toggelFishSchoolStatus(status: string) {
		const httpPost: Observable<FishSchools> = this.fishSchoolService.toggelFishSchoolStatus(this.school.name, this.school.status);
		httpPost.toPromise().then(response => {
			if (response.status === 'Success') {
				this.showSuccess({message: this.translate.instant('FISH_SCHOOL.RESULTS.FISH_SCHOOL_UPDATE_SUCCESS'), type: 'success'});
			}
		}).catch(response => {
			if (response.error && response.error.status && response.error.status === 'Failure') {
				this.showError({message: response.error.code + ': ' + response.error.message, type: 'danger'});
			} else {
				this.showError({message: this.translate.instant('AUTH.VALIDATION.CONNECTION_FAILURE'), type: 'danger'});
			}
		});
	}

	isFishSchoolReadWrite(action: string, prop: string): boolean {
		return this.authorization.isFishSchoolReadWrite(action, prop);
	}
}
