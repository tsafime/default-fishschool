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
import {default as moment, Moment} from 'moment';
import {FsRequestModel} from '../fish-schools/fish-schools.component';

@Component({
	selector: 'm-view-sold-fish-school',
	templateUrl: './view-sold-fish-school.component.html',
	styleUrls: ['./view-sold-fish-school.component.scss', '../../../../../../../node_modules/@ng-select/ng-select/themes/material.theme.css']
})
export class ViewSoldFishSchoolComponent extends ToastSupport implements OnInit {

	// public model: SoldFsRequestModel = {schoolName: undefined};
	source = 'SOLD';
	public model: FsRequestModel = {schoolName: undefined, status: 'SOLD', feedDate: moment(), days: 10};

	@ViewChild(MatSort) sort: MatSort;
	fishSchoolNames: NameEntity[];

	panelOpenState: boolean = true;
	startLoadFishSchools: boolean = false;
	isFishSchoolLoadingStarted = false;

	// This is required since Datatable not visible immediately until focus is set
	@ViewChild('schoolName') select: NgSelectComponent;
	// source = 'SOLD';

	constructor(private service: FishSchoolsService, private authService: AuthenticationService,
				private translate: TranslateService, private authorization: FishSchoolsAuthorizationService,
				public toastr: ToastrManager, private reloadService: ReloadTableDataService) {

		super(toastr);
	}

	ngOnInit() {
		this.service.names().toPromise().then(response => {
			this.fishSchoolNames = response.data;
			this.fishSchoolNames.splice(0, 0, { name: '', status: 'SOLD' });
			return response;
		}).catch(response => {
			if (response && response.error && response.error.status === 'Failure') {
				this.showError({message: response.error.code + ': ' + response.error.message, type: 'danger'});
			} else {
				this.showError({message: this.translate.instant('AUTH.VALIDATION.VIEW_SOLD_FS') + ' - '
						+ this.translate.instant('AUTH.VALIDATION.CONNECTION_FAILURE'), type: 'danger'});
			}
		});

		this.model.schoolName = { name: '', status: undefined };

	}

	loadTableData() {
		this.isFishSchoolLoadingStarted = true;
		this.startLoadFishSchools = true;
		this.reloadService.reload(true);
	}

	onDataReady($event) {
		this.panelOpenState = ! $event;
		this.isFishSchoolLoadingStarted = false;
	}

	onSchoolSelect($event) {
		this.model.schoolName = { name: $event.value.name, status: undefined };
	}

	selectSource(e) {
		this.source = e.value;

	}
}

export interface SoldFsRequestModel {
	schoolName: NameEntity;
	feedDate: Moment;
	days: number;
}
