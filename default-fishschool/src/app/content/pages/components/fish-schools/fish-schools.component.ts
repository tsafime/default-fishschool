import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material';
import {FishSchoolsService} from '../../../../core/services/fishschool/fish-schools.service';
import * as moment from 'moment';
import {TranslateService} from '@ngx-translate/core';
import {Moment} from 'moment';
import {AuthenticationService} from '../../../../core/auth/authentication.service';
import {FishSchoolsAuthorizationService} from '../../../../core/services/fishschool/fish-schools.authorization.service';
import {ToastrManager} from 'ng6-toastr-notifications';
import {ToastSupport} from '../../../../core/models/fishschool/toast.support';
import {ReloadFishSchoolsService} from '../../../../core/services/fishschool/reload-fish-schools.service';

@Component({
	selector: 'm-fish-schools',
	templateUrl: './fish-schools.component.html',
	styleUrls: ['./fish-schools.component.scss']
})
export class FishSchoolsComponent extends ToastSupport implements OnInit {

	public model: FsRequestModel = {schoolName: '270517 102', status: 'ACTIVE', feedDate: moment('2017-06-16'), days: 10};

	@ViewChild(MatSort) sort: MatSort;
	fishSchoolNames: string[];

	panelOpenState: boolean = true;
	roles: string;
	maxDate: Date = new Date();

	dataReady: boolean;
	loadingStarted : boolean = false;

	constructor(private service: FishSchoolsService, private authService: AuthenticationService,
				private translate: TranslateService, private authorization: FishSchoolsAuthorizationService,
				public toastr: ToastrManager, private reloadService: ReloadFishSchoolsService) {

		super(toastr);
	}

	async ngOnInit() {
		await this.service.names().toPromise().then(response => {
			this.fishSchoolNames = response.data;
			return response;
		}).catch(error => {
			this.showError({message: this.translate.instant('AUTH.VALIDATION.CONNECTION_FAILURE'), type: 'danger'});
		});

		this.authService.getUserRoles().subscribe(role => {
			this.roles = role;
		});
	}

	loadTableData() {
		this.loadingStarted = true;
		this.reloadService.reload(true);
	}
}

export interface FsRequestModel {
	schoolName: string;
	status: string;
	feedDate: Moment;
	days: number;
}
