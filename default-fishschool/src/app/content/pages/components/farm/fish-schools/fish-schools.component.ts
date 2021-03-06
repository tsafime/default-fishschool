import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material';
import {FishSchoolsService} from '../../../../../core/services/fishschool/fish-schools.service';
import * as moment from 'moment';
import {TranslateService} from '@ngx-translate/core';
import {Moment} from 'moment';
import {AuthenticationService} from '../../../../../core/auth/authentication.service';
import {FishSchoolsAuthorizationService} from '../../../../../core/services/fishschool/fish-schools.authorization.service';
import {ToastrManager} from 'ng6-toastr-notifications';
import {ToastSupport} from '../../../../../core/models/fishschool/toast.support';
import {ReloadTableDataService} from '../../../../../core/services/fishschool/reload-table-data.service';
import {NameEntity} from '../../../../../core/models/fishschool/fish-school.names.model';

@Component({
	selector: 'm-fish-schools',
	templateUrl: './fish-schools.component.html',
	styleUrls: ['./fish-schools.component.scss', '../../../../../../../node_modules/@ng-select/ng-select/themes/material.theme.css']
})
export class FishSchoolsComponent extends ToastSupport implements OnInit {
	source = 'ACTIVE';
	public model: FsRequestModel = {schoolName: undefined, status: 'ACTIVE', feedDate: moment(), days: 30};

	@ViewChild(MatSort) sort: MatSort;
	fishSchoolNames: NameEntity[];

	panelOpenState: boolean = true;
	role: string;
	maxDate: Date = moment().add(365, 'days').toDate();
	startLoadFishSchools: boolean = false;
	isFishSchoolLoadingStarted = false;

	// This is required since Datatable not visible immediately until focus is set
	@ViewChild('days') daysInput: ElementRef;

	constructor(private service: FishSchoolsService, private authService: AuthenticationService,
				private translate: TranslateService, private authorization: FishSchoolsAuthorizationService,
				public toastr: ToastrManager, private reloadService: ReloadTableDataService) {

		super(toastr);
	}

	ngOnInit() {
		this.service.names().toPromise().then(response => {
			this.fishSchoolNames = response.data;
			return response;
		}).catch(response => {
			if (response && response.error && response.error.status === 'Failure') {
				this.showError({message: response.error.code + ': ' + response.error.message, type: 'danger'});
			} else {
				this.showError({message: this.translate.instant('AUTH.VALIDATION.FS_NAMES') + ' - '
						+ this.translate.instant('AUTH.VALIDATION.CONNECTION_FAILURE'), type: 'danger'});
			}
		});

		this.authService.getUserRoles().subscribe(role => {
			this.role = role;
		});
	}

	loadTableData() {
		this.isFishSchoolLoadingStarted = true;
		this.startLoadFishSchools = true;
		this.reloadService.reload(true);
	}

	selectSource(e) {
		this.source = e.value;
	}

	onDataReady($event) {
		this.panelOpenState = !$event;
		this.isFishSchoolLoadingStarted = false;
	}
}

export interface FsRequestModel {
	schoolName: NameEntity;
	status: string;
	feedDate: Moment;
	days: number;
}
