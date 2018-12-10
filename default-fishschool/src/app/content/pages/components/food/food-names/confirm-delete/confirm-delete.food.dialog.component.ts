import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ConfirmDeleteFoodDialogData} from '../food-names.component';

@Component({
	selector: 'm-confirm-delete.food.dialog',
	templateUrl: 'confirm-delete.food.dialog.component.html',
})
export class ConfirmDeleteFoodDialogComponent {

	constructor(public dialogRef: MatDialogRef<ConfirmDeleteFoodDialogComponent>,
				@Inject(MAT_DIALOG_DATA) public data: ConfirmDeleteFoodDialogData) {
	}
}
