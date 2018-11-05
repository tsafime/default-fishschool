import {Component, OnInit, Inject, ViewChild, Input} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSort, MatTableDataSource} from '@angular/material';
import {SchoolSummaryModel} from '../../../../../../core/models/fishschool/summary/school.summary.model';
import {PairModel} from '../../../../../../core/models/fishschool/summary/pair.model';
import * as moment from 'moment';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
	selector: 'm-schools-summary-details',
	templateUrl: './schools.summary.details.component.html',
	styleUrls: ['./schools.summary.details.component.scss'],
	animations: [
		trigger('detailExpand', [
			state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
			state('expanded', style({height: '*'})),
			transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
		]),
	],
})
export class SchoolsSummaryDetailsComponent implements OnInit {

	summaryDisplayedColumns: string[] = ['name', 'quantity', 'averageWeight', 'foodWeight', 'fcr', 'feedDate'];

	// TODO: Use language translation
	summaryHeaders: string[] = ['Name', '# Of Fish', 'Avg. Weight', 'Food Weight', 'F.C.R.', 'Feed Date'];
	summaryDataSource: MatTableDataSource<SchoolSummaryModel>;
	@ViewChild(MatSort) summarySort: MatSort;

	// TODO: Use language translation
	summaryDetailsHeaders: string[] = ['Food Type', 'Quantity'];

	constructor(public dialogRef: MatDialogRef<SchoolsSummaryDetailsComponent>,
				@Inject(MAT_DIALOG_DATA) public schoolsSum: SchoolSummaryModel[]) {
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
