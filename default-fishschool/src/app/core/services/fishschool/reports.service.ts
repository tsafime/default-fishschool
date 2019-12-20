import {Injectable} from '@angular/core';
import {ToastSupport} from '../../models/fishschool/toast.support';
import {ToastrManager} from 'ng6-toastr-notifications';
import {TranslateService} from '@ngx-translate/core';
import {NgForm} from '@angular/forms';
import * as objectPath from 'object-path';
import {QueryFilter} from '../../models/fishschool/query.filter';

@Injectable()
export class ReportsService extends ToastSupport {
	constructor(private translate: TranslateService, public toastr: ToastrManager) {
		super(toastr);
	}
	errors: any = [];
	validate(f: NgForm) {
		return true;
	}
}
