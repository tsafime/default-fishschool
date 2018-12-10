import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ConfirmDeleteDialogData} from '../delivery-notes.table.component';

@Component({
	selector: 'm-confirm-delete.dialog',
	templateUrl: 'confirm-delete.dialog.component.html',
})
export class ConfirmDeleteDialogComponent {

	constructor(public dialogRef: MatDialogRef<ConfirmDeleteDialogComponent>,
				@Inject(MAT_DIALOG_DATA) public data: ConfirmDeleteDialogData) {
	}
}
