import {Component, OnInit} from '@angular/core';

@Component({
	selector: 'm-quick-actions',
	templateUrl: './fish-schools-actions.component.html',
	styleUrls: ['./fish-schools-actions.component.scss']
})
export class FishSchoolsActionsComponent implements OnInit {

	constructor() {
	}

	ngOnInit() {
	}

	/*renameFishSchool() {
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
	}*/
}
