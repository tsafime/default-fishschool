import { Component, OnInit } from '@angular/core';
import {SummaryModel} from '../../../../core/models/fishschool/summary/summary.model';

@Component({
	selector: 'm-dashboard',
	templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

	public config: any;
	public mySchoolsSum: SummaryModel = new SummaryModel(0, 0, 0, 0, 0, []);

	constructor() {
	}

	ngOnInit(): void {
	}
}
