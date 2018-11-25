import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {ToastrManager} from 'ng6-toastr-notifications';
import {FishSchoolsAuthorizationService} from '../../../../../core/services/fishschool/fish-schools.authorization.service';
import {ToastSupport} from '../../../../../core/models/fishschool/toast.support';
import {Moment} from 'moment';
import * as moment from 'moment';
import {FoodService} from '../../../../../core/services/fishschool/food.service';
import {ReloadTableDataService} from '../../../../../core/services/fishschool/reload-table-data.service';

@Component({
	selector: 'm-invoices',
	templateUrl: './invoices.component.html',
	styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent extends ToastSupport implements OnInit {

	maxDate: Moment = moment();
	model: InvoicesRequestModel = { startDate: moment(), action: 'SALE', days: 10 };
	panelOpenState: boolean = true;
	startLoadingInvoices: boolean = false;
	isInvoiceLoading = false;

	constructor(private foodService: FoodService, private translate: TranslateService,
				private authorization: FishSchoolsAuthorizationService, public toastr: ToastrManager,
				private reloadService: ReloadTableDataService) {

		super(toastr);
	}

	async ngOnInit() {
	}

	loadTableData() {
		this.startLoadingInvoices = true;
		this.isInvoiceLoading = true;
		this.reloadService.reload(true);
	}

	onDataReady($event) {
		this.panelOpenState = ! $event;
		this.isInvoiceLoading = false;
	}
}

export interface InvoicesRequestModel {
	startDate: Moment;
	action: string;
	days: number;
}
