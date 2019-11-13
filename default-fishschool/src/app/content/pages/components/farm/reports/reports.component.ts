import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material';
import {FishSchoolsService} from '../../../../../core/services/fishschool/fish-schools.service';
import * as moment from 'moment';
import {TranslateService} from '@ngx-translate/core';
import {AuthenticationService} from '../../../../../core/auth/authentication.service';
import {FishSchoolsAuthorizationService} from '../../../../../core/services/fishschool/fish-schools.authorization.service';
import {ToastrManager} from 'ng6-toastr-notifications';
import {ToastSupport} from '../../../../../core/models/fishschool/toast.support';
import {ReloadTableDataService} from '../../../../../core/services/fishschool/reload-table-data.service';
import {NameEntity} from '../../../../../core/models/fishschool/fish-school.names.model';
import {QueryFilter} from '../../../../../core/models/fishschool/query.filter';
import {FsRequestModel} from '../fish-schools/fish-schools.component';
import {XQueryFilter} from '../../../../../core/models/fishschool/xquery.filter';

@Component({
	selector: 'm-reports',
	templateUrl: './reports.component.html',
	styleUrls: ['./reports.component.scss', '../../../../../../../node_modules/@ng-select/ng-select/themes/material.theme.css']
})
export class ReportsComponent extends ToastSupport implements OnInit {
	source = 'ACTIVE';
	public filters: QueryFilter[] = [new XQueryFilter('', [''], '', '', '', undefined)];
	public model: FsRequestModel = {schoolName: undefined, status: 'ACTIVE', feedDate: moment(), days: 10};
	@ViewChild(MatSort) sort: MatSort;
	fishSchoolNames: NameEntity[];

	panelOpenState: boolean = true;
	role: string;
	maxDate: Date = moment().add(365, 'days').toDate();
	startLoadReports: boolean = false;
	isReportslLoadingStarted = false;
	keys = ['name', 'feedDate', 'specie', 'age', 'dead', 'menualAvgWeight', 'averageWeight', 'totalGivenFood', ' foodWeight',
		'actualGivenFood', 'percentageTsemach', 'deadLastUpdateDate', 'food', 'feedDate', 'sale', 'totalSale', 'activityLog',
		'fcr', 'salesFcr', 'totalWeight', 'soldFish', 'saleWeight', 'updatedName', 'updatedCreationDate'];
	operators = ['=', '>', '<', 'IS NOT NULL', 'IS NULL', 'BETWEEN'];

	// This is required since Datatable not visible immediately until focus is set
	@ViewChild('days') daysInput: ElementRef;

	constructor(private service: FishSchoolsService, private authService: AuthenticationService,
				private translate: TranslateService, private authorization: FishSchoolsAuthorizationService,
				public toastr: ToastrManager, private reloadService: ReloadTableDataService,
				private changeDetector: ChangeDetectorRef) {

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
				this.showError({
					message: this.translate.instant('AUTH.VALIDATION.FS_NAMES') + ' - '
						+ this.translate.instant('AUTH.VALIDATION.CONNECTION_FAILURE'), type: 'danger'
				});
			}
		});

		this.authService.getUserRoles().subscribe(role => {
			this.role = role;
		});
	}

	loadTableData() {
		this.isReportslLoadingStarted = true;
		this.startLoadReports = true;
		this.reloadService.reload(true);
	}

	selectSource(e) {
		this.source = e.value;
	}

	onDataReady($event) {
		this.panelOpenState = !$event;
		this.isReportslLoadingStarted = false;
	}

	addNew() {
		this.filters.push(new XQueryFilter('', [''], '', '', '', undefined));
		if (!this.changeDetector['destroyed']) {
			this.changeDetector.detectChanges();
		}
	}

	deleteLast() {
		this.filters.splice(this.filters.length - 1);
	}

	updateDynamicFilter(filter: XQueryFilter) {

		if (filter.key !== 'feedDate') {
			filter.selection = 'value';
		} else if (filter.operator === 'BETWEEN' && filter.key === 'feedDate') {
			filter.selection = 'date & days';
		} else {
			filter.selection = 'date';
		}

		if (!this.changeDetector['destroyed']) {
			this.changeDetector.detectChanges();
		}
	}
}
