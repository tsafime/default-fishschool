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

const ELEMENT_DATA: PeriodicElement[] = [
	{position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
	{position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
	{position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
	{position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
	{position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
	{position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
	{position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
	{position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
	{position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
	{position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
	{position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
	{position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
	{position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
	{position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
	{position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
	{position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
	{position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
	{position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
	{position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
	{position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];

@Component({
	selector: 'm-fish-schools',
	templateUrl: './fish-schools.component.html',
	styleUrls: ['./fish-schools.component.scss']
})
export class FishSchoolsComponent implements OnInit {

	displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
	dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
	// displayedColumns1: string[] = ['id', 'companyId', 'name', 'status', 'creationDate', 'updatedDate', 'age', 'specie', 'quantity', 'dead',
	// 	'menualAvgWeight', 'averageWeight', 'foodWeight', 'totalGivenFood', 'actualGivenFood', 'percentageTsemach', 'deadLastUpdateDate',
	//     'foodTypeName', 'feedDate', 'sale', 'totalSale', 'fcr', 'salesFcr', 'totalWeight'];
	// displayedColumns1: string[] = ['age', 'averageWeight', 'dead', 'fcr', 'feedDate', 'foodTypeName', 'foodWeight', 'name',
	// 	'percentageTsemach', 'quantity', 'salesFcr', 'specie', 'status', 'totalGivenFood', 'totalWeight'];
	displayedColumns1: string[] = ['age', 'averageWeight', 'dead', 'fcr', 'feedDate'];
	dataSource1: MatTableDataSource<FishSchoolModel>;
	data: FishSchoolsResponse;

	@ViewChild(MatSort) sort: MatSort;

	constructor(private service: FishSchoolsService) {
	}

	ngOnInit() {
		this.dataSource.sort = this.sort;

		const subscription = this.service.view().subscribe(response => {
				console.log('Successfull: ' + response.data);
				this.dataSource1 = new MatTableDataSource<FishSchoolModel>(response.data);
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
}

