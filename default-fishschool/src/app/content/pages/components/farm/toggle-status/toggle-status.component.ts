import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FishSchoolsService} from '../../../../../core/services/fishschool/fish-schools.service';
import {ToastrManager} from 'ng6-toastr-notifications';
import {TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs';
import {ToastSupport} from '../../../../../core/models/fishschool/toast.support';
import {FishSchools} from '../../../../../core/models/fishschool/fish.schools.model';
import {FishSchoolModel} from '../../../../../core/models/fishschool/fish-school.model';
import {NameEntity} from '../../../../../core/models/fishschool/fish-school.names.model';

@Component({
	selector: 'm-toggle-status',
	templateUrl: './toggle-status.component.html',
	styleUrls: ['./toggle-status.component.scss']
})
export class ToggleStatusComponent extends ToastSupport implements OnInit {

	school: FishSchoolModel = {
		id: null, companyId: null, name: null, updateName: null, status: null, creationDate: null,
		updatedDate: null, age: null, specie: null, quantity: null, dead: null, menualAvgWeight: null, averageWeight: null, soldFish: null,
		foodWeight: null, totalGivenFood: null, actualGivenFood: null, percentageTsemach: null, deadLastUpdateDate: null,
		food: null, feedDate: null, sale: null, totalSale: null, fcr: null, salesFcr: null, totalWeight: null, activityLog: null,
		soldAvgWeight: null, updatedCreationDate: null
	};

	fishSchoolNames: NameEntity[];
	enableSubmit = false;
	source = 'ACTIVE'; // If changing to SOLD change ngOnInit() to set ACTIVE
	submitText = '';

	constructor(private fishSchoolService: FishSchoolsService, public toastr: ToastrManager, private translate: TranslateService,
				private changeDetector: ChangeDetectorRef) {
		super(toastr);
	}

	async ngOnInit() {
		this.submitText = this.translate.instant('TOGGLE_STATUS.TOGGLE_SOLD');

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
		(this.school.status === 'ACTIVE') ? this.school.status = 'SOLD' : this.school.status = 'ACTIVE';
		const httpPost: Observable<FishSchools> = this.fishSchoolService.toggleFishSchoolStatus(this.school.name, this.school.status);
		httpPost.toPromise().then(response => {
			if (response.status === 'Success') {
				this.fishSchoolNames.find(item => item.name === this.school.name).status = this.school.status;
				this.source = this.school.status;

				if (this.source === 'SOLD') {
					this.submitText = this.translate.instant('TOGGLE_STATUS.TOGGLE_ACTIVE');
				} else {
					this.submitText = this.translate.instant('TOGGLE_STATUS.TOGGLE_SOLD');
				}

				this.showSuccess({message: this.translate.instant('FISH_SCHOOL.RESULTS.FISH_SCHOOL_UPDATE_SUCCESS'), type: 'success'});
				if (!this.changeDetector['destroyed']) {
					this.changeDetector.detectChanges();
				}
			}
		}).catch(response => {
			if (response.error && response.error.status && response.error.status === 'Failure') {
				this.showError({message: response.error.code + ': ' + response.error.message, type: 'danger'});
			} else {
				this.showError({message: this.translate.instant('AUTH.VALIDATION.CONNECTION_FAILURE'), type: 'danger'});
			}
		});
	}

	onSchoolSelect($event) {
		const nameEntity: NameEntity[] = this.fishSchoolNames.filter(item => {
			return (item.name === $event.value.name) ? item : null;
		});

		if (nameEntity !== null && nameEntity.length > 0) {
			this.school.status = nameEntity[0].status;
			this.school.name = nameEntity[0].name;
			this.enableSubmit = true;
		} else {
			this.enableSubmit = false;
		}
	}

	selectSource(e) {
		this.source = e.value;
		if (this.source === 'SOLD') {
			this.submitText = this.translate.instant('TOGGLE_STATUS.TOGGLE_ACTIVE');
		} else {
			this.submitText = this.translate.instant('TOGGLE_STATUS.TOGGLE_SOLD');
		}
	}
}
