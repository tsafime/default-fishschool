import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
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

	private config = {
		height: '100%',
		width: '100%',
		data: {}
	};

	constructor(private summaryService: SchoolsSummaryService, public dialog: MatDialog, private router: Router,
				public toastr: ToastrManager, private translate: TranslateService) {
		super(toastr);
	}

	async ngOnInit() {
		this.view();
	}

	async view() {
		await this.viewSchoolsSummary().then(() => {
			this.valueChange.emit(this.schoolsSum);
		}).catch(response => {
			if (response && response.error && response.error.status === 'Failure') {
				this.showError({message: response.error.code + ': ' + response.error.message, type: 'danger'});
			} else {
				this.showError({message: this.translate.instant('AUTH.VALIDATION.SCHOOL_SUMMARY') + ' - '
						+ this.translate.instant('AUTH.VALIDATION.CONNECTION_FAILURE'), type: 'danger'});
			}
		});
	}

	async viewSchoolsSummary(): Promise<any> {
		const promise = await this.summaryService.view(this.summaryDate).toPromise();
		this.schoolsSum = promise.entity;
	}

	viewDetails(): void {
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
