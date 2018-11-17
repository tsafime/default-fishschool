import {ToastConfig} from '../toast/toast.config';
import {ToastMessage} from '../toast/toast.message';
import {ToastrManager} from 'ng6-toastr-notifications';

export class ToastSupport {

	constructor(public toastr: ToastrManager) {
	}

	showSuccess(toast: ToastMessage) {
		this.toastr.successToastr(toast.message, toast.type, ToastConfig);
	}

	showError(toast: ToastMessage) {
		this.toastr.errorToastr(toast.message, toast.type, ToastConfig);
	}

	showWarning(toast: ToastMessage) {
		this.toastr.warningToastr(toast.message, toast.type, ToastConfig);
	}

	showInfo(toast: ToastMessage) {
		this.toastr.infoToastr(toast.message, toast.type, ToastConfig);
	}
}
