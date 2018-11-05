import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {SchoolsSummaryService} from '../../../../../core/services/fishschool/summary/schools.summary.service';
import {SummaryModel} from '../../../../../core/models/fishschool/summary/summary.model';
import {MatDialog} from '@angular/material';
import {SchoolsSummaryDetailsComponent} from './details/schools.summary.details.component';
import {Moment} from 'moment';
import * as moment from 'moment';

@Component({
	selector: 'm-schools-summary',
	templateUrl: './schools.summary.component.html',
	styleUrls: ['./schools.summary.component.scss']
})
export class SchoolsSummaryComponent implements OnInit {

	@Input() public schoolsSum: SummaryModel;
	@Output() valueChange = new EventEmitter<SummaryModel>();
	private isDialogOpened: boolean = false;
	summaryDate: Moment;
	startDate: Moment = moment();
	maxDate: Moment = moment();

	private config = {
		// maxWidth: '100vw',
		// maxHeight: '100vh',
		 height: '100%',
		 width: '100%',
		data: {}
	};

	constructor(private summaryService: SchoolsSummaryService, public dialog: MatDialog) {
	}

	async ngOnInit() {
		this.view();
	}

	async view() {
		await this.viewSchoolsSummary().then(() => {
			this.valueChange.emit(this.schoolsSum);
		});
	}

	async viewSchoolsSummary(): Promise<any> {

		const promise = await this.summaryService.view(this.summaryDate).toPromise();
		this.schoolsSum = promise.entity;
	}

	viewDetails(): void {
		if (! this.isDialogOpened) {
			this.isDialogOpened = true;
			this.config.data = this.schoolsSum.schoolSummaries;

			const dialogRef = this.dialog.open(SchoolsSummaryDetailsComponent, this.config);

			dialogRef.afterClosed().subscribe(result => {
				this.isDialogOpened = false;
			});
		}
	}
}
