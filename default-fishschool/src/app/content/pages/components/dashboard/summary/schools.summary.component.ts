import {Component, OnInit, Input, EventEmitter, Output, ChangeDetectorRef} from '@angular/core';
import {SchoolsSummaryService} from '../../../../../core/services/fishschool/summary/schools.summary.service';
import {SummaryModel} from '../../../../../core/models/fishschool/summary/summary.model';
import {MatDialog} from '@angular/material';
import {SchoolsSummaryDetailsComponent} from './details/schools.summary.details.component';
import {Moment} from 'moment';
import * as moment from 'moment';
import {Router} from '@angular/router';
import {ToastSupport} from '../../../../../core/models/fishschool/toast.support';
import {ToastrManager} from 'ng6-toastr-notifications';
import {TranslateService} from '@ngx-translate/core';
import {SummaryBarChartService} from '../../../../../core/services/dashboard/summary-bar-chart.service';
import {ReloadTableDataService} from '../../../../../core/services/fishschool/reload-table-data.service';

@Component({
	selector: 'm-schools-summary',
	templateUrl: './schools.summary.component.html',
	styleUrls: ['./schools.summary.component.scss']
})
export class SchoolsSummaryComponent extends ToastSupport implements OnInit {

	@Input() public schoolsSum: SummaryModel;
	@Output() valueChange = new EventEmitter<SummaryModel>();
	private isDialogOpened: boolean = false;
	summaryDate: Moment = moment();
	maxDate: Date = moment().add(365, 'days').toDate();
	isSummaryReady: boolean = false;

	private config = {
		height: '100%',
		width: '100%',
		data: {}
	};

	constructor(private summaryService: SchoolsSummaryService, public dialog: MatDialog, private router: Router,
				public toastr: ToastrManager, private summaryBarChartService: SummaryBarChartService, private translate: TranslateService,
				private changeDetector: ChangeDetectorRef) {
		super(toastr);
	}

	async ngOnInit() {
		this.view();
	}

	async view() {
		await this.viewSchoolsSummary().then(() => {
			this.valueChange.emit(this.schoolsSum);
			this.summaryBarChartService.publish(this.schoolsSum);
			this.isSummaryReady = true;
		}).catch(response => {
			if (response && response.error && response.error.status === 'Failure') {
				this.showError({message: response.error.code + ': ' + response.error.message, type: 'danger'});
				this.isSummaryReady = false;
			} else {
				this.showError({message: this.translate.instant('AUTH.VALIDATION.SCHOOL_SUMMARY') + ' - '
						+ this.translate.instant('AUTH.VALIDATION.CONNECTION_FAILURE'), type: 'danger'});
				this.isSummaryReady = false;
			}
		});

		if (!this.changeDetector['destroyed']) {
			this.changeDetector.detectChanges();
		}
	}

	async viewSchoolsSummary(): Promise<any> {
		const promise = await this.summaryService.view(this.summaryDate).toPromise();
		this.schoolsSum = promise.entity;
	}

	viewDetails(): void {
		if (this.schoolsSum.schoolSummaries.length > 0) {
			if (!this.isDialogOpened) {
				this.isDialogOpened = true;
				this.config.data = this.schoolsSum.schoolSummaries;

				const dialogRef = this.dialog.open(SchoolsSummaryDetailsComponent, this.config);

				dialogRef.afterClosed().subscribe(result => {
					this.isDialogOpened = false;
				});
			}
		}
	}
}
