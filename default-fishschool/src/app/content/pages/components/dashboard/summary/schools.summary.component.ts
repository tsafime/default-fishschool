import {Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output} from '@angular/core';
import {SchoolsSummaryService} from '../../../../../core/services/fishschool/summary/schools.summary.service';
import {SummaryModel} from '../../../../../core/models/fishschool/summary/summary.model';
import {MatDialog} from '@angular/material';
import {SchoolsSummaryDetailsComponent} from './details/schools.summary.details.component';

@Component({
	selector: 'm-schools-summary',
	templateUrl: './schools.summary.component.html',
	styleUrls: ['./schools.summary.component.scss']
})
export class SchoolsSummaryComponent implements OnInit {

	@Input() public schoolsSum: SummaryModel;
	@Output() valueChange = new EventEmitter<SummaryModel>();
	animal: string;
	name: string;

	constructor(private summaryService: SchoolsSummaryService, public dialog: MatDialog) {
	}

	async ngOnInit() {
		await this.viewSchoolsSummary().then(() => {
			this.valueChange.emit(this.schoolsSum);
		}); // Now has value;
	}

	async viewSchoolsSummary(): Promise<any> {

		const promise = await this.summaryService.view().toPromise();
		this.schoolsSum = promise.entity;
	}

	viewDetails(): void {
		const dialogRef = this.dialog.open(SchoolsSummaryDetailsComponent, {
			width: '700px',
			data: {name: this.name, animal: this.animal}
		});

		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed');
			this.animal = result;
		});
	}
}
