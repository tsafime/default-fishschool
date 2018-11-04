import {Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

export interface DialogData {
	animal: string;
	name: string;
}

@Component({
	selector: 'm-schools-summary-dialog',
	templateUrl: './schools.summary.details.component.html',
	styleUrls: ['./schools.summary.details.component.scss']
})
export class SchoolsSummaryDetailsComponent implements OnInit {

	constructor(public dialogRef: MatDialogRef<SchoolsSummaryDetailsComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
	}

	ngOnInit() {
	}

	onNoClick(): void {
		this.dialogRef.close();
	}
}
