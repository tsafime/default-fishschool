import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import * as moment from 'moment';
import {FishSchoolModel} from '../../../../../core/models/fishschool/fish-school.model';
import {FarmService} from '../../../../../core/services/farm/farm-schools.service';
import {FishSchoolsService} from '../../../../../core/services/fishschool/fish-schools.service';
import {Observable} from 'rxjs';
import {FishSchools} from '../../../../../core/models/fishschool/fish.schools.model';
import * as deepEqual from 'deep-equal';
import {ToastrManager} from 'ng6-toastr-notifications';
import {ToastConfig} from '../../../../../core/models/toast/toast.config';
import {ToastMessage} from '../../../../../core/models/toast/toast.message';

@Component({
	selector: 'm-daily-farm',
	templateUrl: './daily-farm.component.html',
	styleUrls: ['./daily-farm.component.scss']
})
export class DailyFarmComponent implements OnInit {

	dailySchools: FishSchoolModel[] = [];
	originalData: FishSchoolModel[] = [];

	constructor(private service: FarmService, private fsService: FishSchoolsService, private translate: TranslateService,
				public toastr: ToastrManager) {
	}

	async ngOnInit() {
		this.getDailySchools();
	}

	async getDailySchools() {
		await this.viewDailySchools().then(response => {
			return response;
		}).catch(error => {
			this.showError({
				message: error.message,
				type: 'danger'
			});
		});
		return this.dailySchools;
	}

	async viewDailySchools(): Promise<any> {

		const promise = await this.service.view({feedDate: moment(), days: 400, status: 'ACTIVE', schoolName: undefined}).toPromise();
		this.dailySchools = promise.data;
	}

	update() {

		const httpPost: Observable<FishSchools> = this.service.update(this.originalData, this.dailySchools);

		if (httpPost !== null) {
			httpPost.toPromise().then(response => {
				if (response.status === 'Success') {

					// Response may contain partial data, merge it
					const data = response.data;

					// Deep copy
					this.originalData = JSON.parse(JSON.stringify(data));
					data.forEach((item, index) => {
						const deepEqual1 = deepEqual(item.id, data[index].id);
						if (deepEqual1) {
							const i = this.dailySchools.indexOf(item);
							this.dailySchools[i] = data[index];
						}
					});

					this.showSuccess({
						message: this.translate.instant('FISH_SCHOOL.RESULTS.FISH_SCHOOL_UPDATE_SUCCESS'),
						type: 'success'
					});
				}
			}).catch(response => {
				if (response.error !== 'undefined' && response.error.status === 'Failure') {
					this.showError({
						message: response.error.code + ': ' + response.error.message,
						type: 'danger'
					});
				} else {
					this.showError({
						message: this.translate.instant('AUTH.VALIDATION.CONNECTION_FAILURE'),
						type: 'danger'
					});
				}
			});
		} else {
			this.showInfo({
				message: this.translate.instant('VALIDATION.NO_CHANGES'),
				type: 'info'
			});
		}
	}

	showSuccess(toast: ToastMessage) {
		this.toastr.successToastr(toast.message, toast.type, ToastConfig);
		window.scrollTo(0, 0);
	}

	showError(toast: ToastMessage) {
		this.toastr.errorToastr(toast.message, toast.type, ToastConfig);
		window.scrollTo(0, 0);
	}

	showWarning(toast: ToastMessage) {
		this.toastr.warningToastr(toast.message, toast.type, ToastConfig);
		window.scrollTo(0, 0);
	}

	showInfo(toast: ToastMessage) {
		this.toastr.infoToastr(toast.message, toast.type, ToastConfig);
		window.scrollTo(0, 0);
	}
}

