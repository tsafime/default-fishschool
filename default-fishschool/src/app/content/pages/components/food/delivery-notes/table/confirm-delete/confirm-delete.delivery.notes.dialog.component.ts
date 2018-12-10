import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ConfirmDeleteDeliveryNotesDialogData} from '../delivery-notes.table.component';

@Component({
	selector: 'm-confirm-delete.delivery.notes.dialog',
	templateUrl: 'confirm-delete.delivery.notes.dialog.component.html',
})
export class ConfirmDeleteDeliveryNotesDialogComponent {

	constructor(public dialogRef: MatDialogRef<ConfirmDeleteDeliveryNotesDialogComponent>,
				@Inject(MAT_DIALOG_DATA) public data: ConfirmDeleteDeliveryNotesDialogData) {
	}
}
