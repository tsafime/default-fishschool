import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ToastSupport} from '../../../../core/models/fishschool/toast.support';
import {ToastrManager} from 'ng6-toastr-notifications';
import {FsUrlsService} from '../../../../core/services/fishschool/fs.urls';
import {AuthorizationService} from '../../../../core/services/fishschool/authorization.service';
import {AuthorizationsModel} from '../../../../core/models/fishschool/foods.model';
import {TranslateService} from '@ngx-translate/core';

@Component({
	selector: 'm-authorization',
	templateUrl: './authorization.component.html',
	styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent extends ToastSupport implements OnInit {

	private authorizations: AuthorizationsModel;

	constructor(public toastr: ToastrManager, private urlsService: FsUrlsService, private service: AuthorizationService,
				private translate: TranslateService, private changeDetector: ChangeDetectorRef) {
		super(toastr);
	}

	async ngOnInit() {
		await this.view();
	}

	view() {
		this.service.view().toPromise()
			.then(response => {

				if (response.status === 'Success') {
					this.authorizations = response;
				} else {
					this.showError({message: this.translate.instant('VALIDATION.LOAD_AUTHORIZATIONS_FAILURE'), type: 'danger'});
				}
			}).catch(response => {
				if (response && response.error && response.error.status === 'Failure') {
					this.showError({message: response.error.code + ': ' + response.error.message, type: 'danger'});
				} else {
					this.showError({message: this.translate.instant('AUTH.VALIDATION.CONNECTION_FAILURE'), type: 'danger'});
				}
			});
	}
}
