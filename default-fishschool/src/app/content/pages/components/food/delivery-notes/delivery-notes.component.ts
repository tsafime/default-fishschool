import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {ToastrManager} from 'ng6-toastr-notifications';
import {FishSchoolsAuthorizationService} from '../../../../../core/services/fishschool/fish-schools.authorization.service';
import {ToastSupport} from '../../../../../core/models/fishschool/toast.support';
import {Moment} from 'moment';
import * as moment from 'moment';
import {FoodService} from '../../../../../core/services/fishschool/food.service';
import {ReloadTableDataService} from '../../../../../core/services/fishschool/reload-table-data.service';

@Component({
	selector: 'm-delivery-notes',
	templateUrl: './delivery-notes.component.html',
	styleUrls: ['./delivery-notes.component.scss']
})
export class DeliveryNotesComponent extends ToastSupport implements OnInit {

	maxDate: Moment = moment();
	model: DeliveryNotesRequestModel = { startDate: moment(), action: 'SALE', days: 10 };
	panelOpenState: boolean = true;
	startLoadingDeliveryNotes: boolean = false;
	isDeliveryNotesLoading = false;

	// This is required since Datatable not visible immediately until focus id set
	@ViewChild('days') daysInput: ElementRef;

	constructor(private foodService: FoodService, private translate: TranslateService,
				private authorization: FishSchoolsAuthorizationService, public toastr: ToastrManager,
				private reloadService: ReloadTableDataService) {

		super(toastr);
	}

	async ngOnInit() {
		this.startLoadingDeliveryNotes = true;
	}

	loadTableData() {
		this.startLoadingDeliveryNotes = true;
		this.isDeliveryNotesLoading = true;
		this.reloadService.reload(true);
	}

	onDataReady() {
		// Disable close panel
		// this.panelOpenState = ! $event;
		this.isDeliveryNotesLoading = false;
	}
}

export interface DeliveryNotesRequestModel {
	startDate: Moment;
	action: string;
	days: number;
}
