import {Component, OnInit} from '@angular/core';
import {SummaryModel} from '../../../../core/models/fishschool/summary/summary.model';
import {ToastrManager} from 'ng6-toastr-notifications';
import {ToastConfig} from '../../../../core/models/toast/toast.config';
import {ToastMessage} from '../../../../core/models/toast/toast.message';

@Component({
	selector: 'm-dashboard',
	templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

	public config: any;
	public mySchoolsSum: SummaryModel = new SummaryModel(0, 0, 0, 0, 0, 0, []);

	constructor(public toastr: ToastrManager) {
	}

	ngOnInit(): void {
	}

	showSuccess(toast: ToastMessage) {
		this.toastr.successToastr(toast.message, toast.type, ToastConfig);
		window.scrollTo(0, 0);
	}

	showError(toast: ToastMessage) {
		this.toastr.errorToastr(toast.message, toast.type, ToastConfig);
		window.scrollTo(0, 0);
	}

	showWarning(toast: ToastMessage) {
		this.toastr.warningToastr(toast.message, toast.type, ToastConfig);
		window.scrollTo(0, 0);
	}

	showInfo(toast: ToastMessage) {
		this.toastr.infoToastr(toast.message, toast.type, ToastConfig);
		window.scrollTo(0, 0);
	}
}
