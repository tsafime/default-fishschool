import {Component, OnInit} from '@angular/core';
import {FishSchoolsService} from '../../../../../../core/services/fishschool/fish-schools.service';
import {ToastrManager} from 'ng6-toastr-notifications';
import {TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs';
import {ToastSupport} from '../../../../../../core/models/fishschool/toast.support';
import {FishSchools} from '../../../../../../core/models/fishschool/fish.schools.model';
import {FishSchoolModel} from '../../../../../../core/models/fishschool/fish-school.model';

@Component({
	selector: 'm-toggle-status',
	templateUrl: './toggle-status.component.html',
	styleUrls: ['./toggle-status.component.scss']
})
export class ToggleStatusComponent extends ToastSupport implements OnInit {

	school: FishSchoolModel = {
		id: null, companyId: null, name: null, updateName: null, status: null, creationDate: null,
		updatedDate: null, age: null, specie: null, quantity: null, dead: null, menualAvgWeight: null, averageWeight: null,
		foodWeight: null, totalGivenFood: null, actualGivenFood: null, percentageTsemach: null, deadLastUpdateDate: null,
		food: null, feedDate: null, sale: null, totalSale: null, fcr: null, salesFcr: null, totalWeight: null, updatedCreationDate: null
	};
	fishSchoolNames: string[];

	constructor(private fishSchoolService: FishSchoolsService, public toastr: ToastrManager, private translate: TranslateService) {
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
	}

	toggleFishSchoolStatus() {
		const httpPost: Observable<FishSchools> = this.fishSchoolService.toggleFishSchoolStatus(this.school.name, this.school.status);
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
}
