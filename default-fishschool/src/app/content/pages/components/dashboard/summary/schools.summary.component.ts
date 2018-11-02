import {Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output} from '@angular/core';
import {SchoolsSummaryService} from '../../../../../core/services/fishschool/summary/schools.summary.service';
import {SummaryModel} from '../../../../../core/models/fishschool/summary/summary.model';

@Component({
	selector: 'm-schools-summary',
	templateUrl: './schools.summary.component.html',
	styleUrls: ['./schools.summary.component.scss']
})
export class SchoolsSummaryComponent implements OnInit {

	@Input() public schoolsSum: SummaryModel;
	@Output() valueChange = new EventEmitter<SummaryModel>();

	constructor(private summaryService: SchoolsSummaryService) {
	}

	async ngOnInit() {
		await this.viewSchoolsSummary().then(() => {
			console.log('Data is ready');
			this.valueChange.emit(this.schoolsSum);
		}); // Now has value;

		console.log('On init finished...');
	}

	async viewSchoolsSummary(): Promise<any> {

		const promise = await this.summaryService.view().toPromise();
		this.schoolsSum = promise.entity;
	}
}
