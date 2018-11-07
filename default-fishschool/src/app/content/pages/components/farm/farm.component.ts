import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import * as moment from 'moment';
import {FishSchoolModel} from '../../../../core/models/fishschool/fish-school.model';
import {FarmService} from '../../../../core/services/farm/farm-schools.service';
import {FishSchoolsService} from '../../../../core/services/fishschool/fish-schools.service';
import {Observable} from 'rxjs';
import {FishSchools} from '../../../../core/models/fishschool/fish.schools.model';
import * as deepEqual from 'deep-equal';

@Component({
	selector: 'm-farm',
	templateUrl: './farm.component.html',
	styleUrls: ['./farm.component.scss']
})
export class FarmComponent implements OnInit {

	dailySchools: FishSchoolModel[] = [];
	originalData: FishSchoolModel[] = [];
	alerts: Array<FsAlert> = [];

	constructor(private service: FarmService, private fsService: FishSchoolsService, private translate: TranslateService) {
	}

	async ngOnInit() {
		this.getDailySchools();
	}

	async getDailySchools() {
		await this.viewDailySchools().then(response => {
				return response;
			}).catch(error => {
				console.log('Error: ' + error);
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
						const i = this.dailySchools.indexOf(item);
						this.dailySchools[i] = data[index];
					});

					this.sendAlert({
						message: this.translate.instant('FISH_SCHOOL.RESULTS.FISH_SCHOOL_UPDATE_SUCCESS'),
						type: 'success'
					});
				}
			}).catch(response => {
				if (response.error !== 'undefined' && response.error.status === 'Failure') {
					this.sendAlert({
						message: response.message,
						type: 'danger'
					});
				} else {
					this.alertNoConnection();
				}
			});
		} else {
			this.sendAlert({
				message: this.translate.instant('FISH_SCHOOL.NO_CHANGES'),
				type: 'info'
			});
		}
	}

	closeAlert(alert: FsAlert) {
		const index: number = this.alerts.indexOf(alert);
		this.alerts.splice(index, 1);
	}

	private alertNoConnection() {

		// Keep same message as in Login
		this.sendAlert({
			message: this.translate.instant('AUTH.VALIDATION.CONNECTION_FAILURE'),
			type: 'danger'
		});
	}

	private sendAlert(alert: FsAlert) {
		if (this.alerts.length > 2) {
			this.alerts.splice(0, 1);
		}

		this.alerts.push(alert);
		setTimeout(() => {
			this.closeAlert(alert);
		}, 5000);

		window.scrollTo(0, 0);
	}
}

export interface FsAlert {
	type: string;
	message: string;
}
