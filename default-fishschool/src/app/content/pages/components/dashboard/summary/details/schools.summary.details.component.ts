import {Component, OnInit, Inject, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSort, MatTableDataSource} from '@angular/material';
import {SchoolSummaryModel} from '../../../../../../core/models/fishschool/summary/school.summary.model';
import {PairModel} from '../../../../../../core/models/fishschool/summary/pair.model';
import * as moment from 'moment';
import {TranslateService} from '@ngx-translate/core';

@Component({
	selector: 'm-schools-summary-details',
	templateUrl: './schools.summary.details.component.html',
	styleUrls: ['./schools.summary.details.component.scss']
})
export class SchoolsSummaryDetailsComponent implements OnInit {

	// summaryDisplayedColumns = The JSON names
	summaryDisplayedColumns: string[] = ['name', 'quantity', 'averageWeight', 'foodWeight', 'fcr', 'dead', 'age', 'feedDate'];
	summaryHeaders: string[];
	summaryDataSource: MatTableDataSource<SchoolSummaryModel>;
	@ViewChild(MatSort) summarySort: MatSort;

	summaryDetailsHeaders: string[];

	constructor(public dialogRef: MatDialogRef<SchoolsSummaryDetailsComponent>, private translate: TranslateService,
				@Inject(MAT_DIALOG_DATA) public schoolsSum: SchoolSummaryModel[]) {

		this.summaryHeaders = [this.translate.instant('DASHBOARD.DETAILS.NAME'),
			this.translate.instant('DASHBOARD.NUM_OF_FISH'),
			this.translate.instant('DASHBOARD.AVG_WEIGHT'),
			this.translate.instant('DASHBOARD.FOOD_WEIGHT'),
			this.translate.instant('GENERAL.F_C_R'),
			this.translate.instant('GENERAL.DEAD'),
			this.translate.instant('GENERAL.AGE'),
			this.translate.instant('DASHBOARD.DETAILS.FEED_DATE')];

		this.summaryDetailsHeaders = [this.translate.instant('DASHBOARD.FOOD_TYPE'),
			this.translate.instant('DASHBOARD.QUANTITY')];
	}

	ngOnInit() {
		this.view();
	}

	onNoClick(): void {
		this.dialogRef.close();
	}

	view() {
		this.summaryDataSource = new MatTableDataSource<SchoolSummaryModel>(this.schoolsSum);
		this.summaryDataSource.sortingDataAccessor = (item, property) => {
			switch (property) {
				case 'feedDate':
					return moment(item.feedDate, 'DD/MM/YYYY');
				default:
					return item[property];
			}
		};

		this.summaryDataSource.sort = this.summarySort;
	}

	applyFilter(filterValue: string) {
		if (this.summaryDataSource) {
			this.summaryDataSource.filter = filterValue.trim().toLowerCase();
		}
	}

	createDataSource(data: PairModel<string, number>[]) {
		return new MatTableDataSource<PairModel<string, number>>(data);
	}
}
