import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material';
import {FishSchoolsService} from '../../../../../core/services/fishschool/fish-schools.service';
import {TranslateService} from '@ngx-translate/core';
import {AuthenticationService} from '../../../../../core/auth/authentication.service';
import {FishSchoolsAuthorizationService} from '../../../../../core/services/fishschool/fish-schools.authorization.service';
import {ToastrManager} from 'ng6-toastr-notifications';
import {ToastSupport} from '../../../../../core/models/fishschool/toast.support';
import {ReloadTableDataService} from '../../../../../core/services/fishschool/reload-table-data.service';
import {NameEntity} from '../../../../../core/models/fishschool/fish-school.names.model';
import {NgSelectComponent} from '@ng-select/ng-select';
import {FishSchoolModel} from '../../../../../core/models/fishschool/fish-school.model';
import {FishSchools} from '../../../../../core/models/fishschool/fish.schools.model';
import {Observable} from 'rxjs';

@Component({
	selector: 'm-sold-fish-school',
	templateUrl: './sold-fish-school.component.html',
	styleUrls: ['./sold-fish-school.component.scss', '../../../../../../../node_modules/@ng-select/ng-select/themes/material.theme.css']
})
export class SoldFishSchoolComponent extends ToastSupport implements OnInit {

	@ViewChild(MatSort) sort: MatSort;
	fishSchoolNames: NameEntity[];

	soldFrom: FishSchoolModel = this.getEmptyFishSchool();
	soldTo: FishSchoolModel[] = [];

	// This is required since Datatable not visible immediately until focus is set
	@ViewChild('schoolName') select: NgSelectComponent;
	source = 'SOLD';

	constructor(private service: FishSchoolsService, private authService: AuthenticationService,
				private translate: TranslateService, private authorization: FishSchoolsAuthorizationService,
				public toastr: ToastrManager, private reloadService: ReloadTableDataService) {

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

		this.soldTo.push(this.getEmptyFishSchool());
	}

	update() {

		const results = this.soldTo.filter((item, index) => {
			return item.name === this.soldFrom.name;
		});

		if (results.length > 0) {
			this.showError({message: this.translate.instant('FISH_SCHOOL.VALIDATION.SOLD_DUPLICATE_SCHOOL_NAME'), type: 'danger'});
			return;
		}

		const httpPost: Observable<FishSchools> = this.service.sold(this.soldFrom, this.soldTo);
		httpPost.toPromise().then(response => {
			if (response.status === 'Success') {
				this.showSuccess({message: this.translate.instant('FISH_SCHOOL.RESULTS.SOLD_FISH_SCHOOL_UPDATE_SUCCESS'), type: 'success'});
			}
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

	getEmptyFishSchool() {
		return {
			id: undefined, companyId: undefined, name: undefined, updateName: undefined, status: undefined, creationDate: undefined,
			updatedDate: undefined, age: undefined, specie: undefined, quantity: undefined, dead: undefined, menualAvgWeight: undefined,
			averageWeight: undefined, soldFish: undefined, foodWeight: undefined, totalGivenFood: undefined, actualGivenFood: undefined,
			percentageTsemach: undefined, deadLastUpdateDate: undefined, food: undefined, feedDate: undefined, sale: undefined,
			totalSale: undefined, fcr: undefined, salesFcr: undefined, totalWeight: undefined, activityLog: undefined,
			soldAvgWeight: undefined, updatedCreationDate: undefined
		};
	}
}

export interface SoldFsRequestModel {
	schoolName: NameEntity;
}
