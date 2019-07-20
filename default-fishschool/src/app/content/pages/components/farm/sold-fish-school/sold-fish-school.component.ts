import {Component, OnInit, ViewChild} from '@angular/core';
import {FishSchoolsService} from '../../../../../core/services/fishschool/fish-schools.service';
import {TranslateService} from '@ngx-translate/core';
import {AuthenticationService} from '../../../../../core/auth/authentication.service';
import {FishSchoolsAuthorizationService} from '../../../../../core/services/fishschool/fish-schools.authorization.service';
import {ToastrManager} from 'ng6-toastr-notifications';
import {ToastSupport} from '../../../../../core/models/fishschool/toast.support';
import {ReloadTableDataService} from '../../../../../core/services/fishschool/reload-table-data.service';
import {NameEntity} from '../../../../../core/models/fishschool/fish-school.names.model';
import {FishSchoolModel} from '../../../../../core/models/fishschool/fish-school.model';
import {FishSchools} from '../../../../../core/models/fishschool/fish.schools.model';
import {Observable} from 'rxjs';
import {Moment} from 'moment';
import * as moment from 'moment';

@Component({
	selector: 'm-sold-fish-school',
	templateUrl: './sold-fish-school.component.html',
	styleUrls: ['./sold-fish-school.component.scss', '../../../../../../../node_modules/@ng-select/ng-select/themes/material.theme.css']
})
export class SoldFishSchoolComponent extends ToastSupport implements OnInit {

	fishSchoolNames: NameEntity[];
	maxDate: Moment = moment();
	soldFrom: FishSchoolModel = this.getEmptyFishSchool();
	soldTo: FishSchoolModel[] = [this.getEmptyFishSchool()];
	source = 'SOLD';

	constructor(private service: FishSchoolsService, private authService: AuthenticationService,
				private translate: TranslateService, public toastr: ToastrManager) {

		super(toastr);
	}

	async ngOnInit() {
		await this.service.names().toPromise().then(response => {
			this.fishSchoolNames = response.data;
			return response;
		}).catch(response => {
			if (response && response.error && response.error.status === 'Failure') {
				this.showError({message: response.error.code + ': ' + response.error.message, type: 'danger'});
			} else {
				this.showError({message: this.translate.instant('AUTH.VALIDATION.CONNECTION_FAILURE'), type: 'danger'});
			}
		});
	}

	update() {

		// No selection of same school name as in soldFrom
		let results = this.soldTo.filter((item, index) => {
			return item.name === this.soldFrom.name;
		});

		if (results.length > 0) {
			this.showError({message: this.translate.instant('FISH_SCHOOL.VALIDATION.SOLD_DUPLICATE_SCHOOL_NAME',
					{ name: results[0].name }), type: 'danger'});
			return;
		}

		// No selection of same school name as in soldTo
		results = this.soldTo.filter((item, index) =>
			index === this.soldTo.findIndex((findTest) => findTest.name === item.name)
		);

		if (results.length > 0) {
			this.showError({message: this.translate.instant('FISH_SCHOOL.VALIDATION.SOLD_DUPLICATE_SOLD_TO_SCHOOL_NAME',
					{ name:  results[0].name }), type: 'danger'});
			return;
		}

		// Remove empty soldTo is not fulfilled
		this.soldTo.forEach((item, index) => {
			if (item.name === undefined || item.quantity === undefined || item.averageWeight === undefined) {
				this.soldTo.splice(index);
			}
		});

		const httpPost: Observable<FishSchools> = this.service.sold(this.soldFrom, this.soldTo);
		httpPost.toPromise().then(response => {
			if (response.status === 'Success') {
				this.showSuccess({message: this.translate.instant('FISH_SCHOOL.RESULTS.SOLD_FISH_SCHOOL_UPDATE_SUCCESS'), type: 'success'});
			}

			this.soldFrom = this.getEmptyFishSchool();
			this.soldTo = [this.getEmptyFishSchool()];
		}).catch(response => {
			if (response.error && response.error.status && response.error.status === 'Failure') {
				this.showError({message: response.error.code + ': ' + response.error.message, type: 'danger'});
			} else {
				this.showError({message: this.translate.instant('AUTH.VALIDATION.CONNECTION_FAILURE'), type: 'danger'});
			}
		});
	}

	onFromSchoolSelect($event) {
		this.soldFrom.name = $event.value.name;
	}

	onToSchoolSelect($event, toSchool) {
		toSchool.name = $event.value.name;
	}

	addNew() {
		this.soldTo.push(this.getEmptyFishSchool());
	}

	deleteLast() {
		this.soldTo.splice(this.soldTo.length - 1);
	}

	validate() {
		const incompleteTo = this.soldTo.filter((item, index) => {
			return item.name === undefined || item.quantity === undefined || item.averageWeight === undefined;
		});

		return this.soldTo.length === 0 || incompleteTo.length > 0 || this.soldFrom.name === undefined || this.soldFrom.feedDate === undefined
			|| this.soldFrom.soldFish === undefined || this.soldFrom.soldAvgWeight === undefined;
	}

	getEmptyFishSchool() {
		return {
			id: undefined, companyId: undefined, name: undefined, updateName: undefined, status: undefined, creationDate: undefined,
			updatedDate: undefined, age: undefined, specie: undefined, quantity: undefined, dead: undefined, menualAvgWeight: undefined,
			averageWeight: undefined, soldFish: undefined, foodWeight: undefined, totalGivenFood: undefined, actualGivenFood: undefined,
			percentageTsemach: undefined, deadLastUpdateDate: undefined, food: undefined, feedDate: undefined, sale: undefined,
			totalSale: undefined, fcr: undefined, salesFcr: undefined, totalWeight: undefined, activityLog: undefined,
			saleWeight: undefined, updatedCreationDate: undefined
		};
	}
}
