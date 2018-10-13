import {PeriodicElement} from '../material/data-table/material-table/material-table.component';
import {Component, OnInit, ViewChild, AfterViewInit, ChangeDetectionStrategy} from '@angular/core';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {HttpClient} from '@angular/common/http';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {FishSchoolsService} from '../../../../core/services/fish-schools.service';
import {DataTableService} from '../../../../core/services/datatable.service';
import {FishSchoolModel} from '../../../../core/models/fish-school.model';
import {FishSchoolsResponse} from '../../../../core/models/fish.schools.model';

export interface PeriodicElement {
	name: string;
	position: number;
	weight: number;
	symbol: string;
}

@Component({
	selector: 'm-fish-schools',
	templateUrl: './fish-schools.component.html',
	styleUrls: ['./fish-schools.component.scss']
})
export class FishSchoolsComponent implements OnInit {

	// All columns:
	// displayedColumns: string[] = ['id', 'companyId', 'name', 'status', 'creationDate', 'updatedDate', 'age', 'specie', 'quantity', 'dead',
	// 	'menualAvgWeight', 'averageWeight', 'foodWeight', 'totalGivenFood', 'actualGivenFood', 'percentageTsemach', 'deadLastUpdateDate',
	// 	'foodTypeName', 'feedDate', 'sale', 'totalSale', 'fcr', 'salesFcr', 'totalWeight'];
	 displayedColumns: string[] = ['feedDate', 'age', 'averageWeight', 'quantity', 'totalWeight', 'totalGivenFood', 'actualGivenFood',
		 'foodWeight', 'foodTypeName', 'dead', 'fcr' ];
    header: string[] = ['Selected Date', 'Age', 'Avg. G', '# Fish', 'Total KG', 'Feed Plan', 'Given Feed', 'Total Food', 'Food Type',
		'Mortality', 'F.C.R.'];
	dataSource: MatTableDataSource<FishSchoolModel>;
	data: FishSchoolsResponse;

	@ViewChild(MatSort) sort: MatSort;

	constructor(private service: FishSchoolsService) {
	}

	ngOnInit() {

		const subscription = this.service.view().subscribe(response => {
				console.log('Successfull: ' + response.data);
				this.dataSource = new MatTableDataSource<FishSchoolModel>(response.data);
				this.dataSource.sort = this.sort;
				// this.dataSource.filter =
				// this.authNoticeService.setNotice(response.message, 'success');
			},
			response => {
				console.log('Failure...' + response);
				// if (response !== 'undefined' && response.status === 'Failure') {
				// 	this.authNoticeService.setNotice(response.message, 'error');
				// } else {
				// 	this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.INVALID_LOGIN'), 'error');
				// }
			});

		// this.service.view();
		// const data = this.service.data;
		/*
		Example repsonse:
		{"status":"Success","code":"MSG_02","message":"List of entities loaded successfully","size":9,
		"data":[{"name":"270517 102","status":"ACTIVE","age":2,"specie":"Barakuda","quantity":1000,"dead":10,"averageWeight":0.11,
		"foodWeight":6.655E-4,"totalGivenFood":122.0,"percentageTsemach":5.0,"foodTypeName":"Food Type","feedDate":"30/10/2016",
		"fcr":1110.09,"salesFcr":122.0,"totalWeight":0.11}]}
		 */

		// TODO: Check data status: Success and notify if failure
		console.log('On NgInit()...');
	}

	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}
}

