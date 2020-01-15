import {EventEmitter, Injectable, Output} from '@angular/core';
import {SummaryModel} from '../../models/fishschool/summary/summary.model';

@Injectable()
export class SummaryBarChartService {

	@Output() change: EventEmitter<SummaryModel> = new EventEmitter();

	constructor() {
	}

	publish(summaryModel: SummaryModel) {
		this.change.emit(summaryModel);
	}
}
