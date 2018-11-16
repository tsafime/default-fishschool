import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatSelect, MatSort} from '@angular/material';
import {FishSchoolsService} from '../../../../core/services/fishschool/fish-schools.service';
import * as moment from 'moment';
import {TranslateService} from '@ngx-translate/core';
import {Moment} from 'moment';
import {AuthenticationService} from '../../../../core/auth/authentication.service';
import {FishSchoolsAuthorizationService} from '../../../../core/services/fishschool/fish-schools.authorization.service';
import {ToastrManager} from 'ng6-toastr-notifications';
import {ToastSupport} from '../../../../core/models/fishschool/toast.support';
import {ReloadFishSchoolsService} from '../../../../core/services/fishschool/reload-fish-schools.service';
import {FormControl, FormGroup} from '@angular/forms';
import {take, takeUntil} from 'rxjs/operators';
import {ReplaySubject, Subject} from 'rxjs';

@Component({
	selector: 'm-fish-schools',
	templateUrl: './fish-schools.component.html',
	styleUrls: ['./fish-schools.component.scss', '../../../../../../node_modules/@ng-select/ng-select/themes/material.theme.css']
})
export class FishSchoolsComponent extends ToastSupport implements OnInit, OnDestroy, AfterViewInit {

	public model: FsRequestModel = {schoolName: undefined, status: 'ACTIVE', feedDate: moment('2017-06-16'), days: 10};

	@ViewChild(MatSort) sort: MatSort;
	fishSchoolNames: string[];

	panelOpenState: boolean = true;
	roles: string;
	maxDate: Date = new Date();

	dataReady: boolean;
	loadingStarted: boolean = false;

	/** Control for the selected school name */
	public selectCtrl: FormControl = new FormControl();

	/** control for the MatSelect filter keyword */
	public schoolNameFilterCtrl: FormControl = new FormControl();

	/** list of school names filtered by search keyword */
	public filteredSchoolNames: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);

	@ViewChild('schooNameSelect') schooNameSelect: MatSelect;

	/** Subject that emits when the component has been destroyed. */
	private _onDestroy = new Subject<void>();

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

		// Load the initial schol names list
		this.filteredSchoolNames.next(this.fishSchoolNames);

		// Listen for search field value changes
		this.schoolNameFilterCtrl.valueChanges
			.pipe(takeUntil(this._onDestroy))
			.subscribe(() => {
				this.filterSchoolNames();
			});
	}

	ngAfterViewInit() {
		this.setInitialValue();
	}

	ngOnDestroy() {
		this._onDestroy.next();
		this._onDestroy.complete();
	}

	loadTableData() {
		this.panelOpenState = true;
		this.loadingStarted = true;
		this.reloadService.reload(true);
	}

	getSelectSchoolNameLabel(): string {
		return this.translate.instant('FISH_SCHOOL.FILTERS.START_TYPING_NAME');
	}

	getSelectSchoolNameNotFoundLabel(): string {
		return this.translate.instant('FISH_SCHOOL.FILTERS.SCHOOL_NAME_NOT_FOUND');
	}

	updateDataReadiness($event) {
		this.dataReady = $event;
		this.loadingStarted = $event;

		// Close if having table data
		if ($event) {
			this.panelOpenState = !$event;
		}
	}
	/**
	 * Sets the initial value after the filteredSchoolNames are loaded initially
	 */
	private setInitialValue() {
		this.filteredSchoolNames
			.pipe(take(1), takeUntil(this._onDestroy))
			.subscribe(() => {

				// Setting the compareWith property to a comparison function
				// triggers initializing the selection according to the initial value of
				// the form control (i.e. _initializeSelection())
				// this needs to be done after the filteredSchoolNames are loaded initially
				// and after the mat-option elements are available
				this.schooNameSelect.compareWith = (a: string, b: string) => a === b;
			});
	}

	private filterSchoolNames() {
		if (!this.fishSchoolNames) {
			return;
		}
		// get the search keyword
		let search = this.schoolNameFilterCtrl.value;
		if (!search) {
			this.filteredSchoolNames.next(this.fishSchoolNames.slice());
			return;
		} else {
			search = search.toLowerCase();
		}
		// filter the school names
		this.filteredSchoolNames.next(
			this.fishSchoolNames.filter(schoolName => schoolName.toLowerCase().indexOf(search) > -1)
		);
	}
}

export interface FsRequestModel {
	schoolName: string;
	status: string;
	feedDate: Moment;
	days: number;
}
