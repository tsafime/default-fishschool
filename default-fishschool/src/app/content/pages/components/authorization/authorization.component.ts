import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ToastSupport} from '../../../../core/models/fishschool/toast.support';
import {ToastrManager} from 'ng6-toastr-notifications';
import {FsUrlsService} from '../../../../core/services/fishschool/fs.urls';
import {AuthorizationService} from '../../../../core/services/fishschool/authorization.service';
import {AuthorizationsModel} from '../../../../core/models/fishschool/foods.model';
import {TranslateService} from '@ngx-translate/core';
import {AuthorizationModel} from '../../../../core/models/fishschool/food.model';
import {TokenStorage} from '../../../../core/auth/token-storage.service';

@Component({
	selector: 'm-authorization',
	templateUrl: './authorization.component.html',
	styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent extends ToastSupport implements OnInit {

	private authorizations: AuthorizationsModel;
	private model: AuthorizationModel;
	names: string[];
	actions: string[];

	constructor(public toastr: ToastrManager, private urlsService: FsUrlsService, private service: AuthorizationService,
				private translate: TranslateService, private tokenStorage: TokenStorage, private changeDetector: ChangeDetectorRef) {
		super(toastr);

		let role;
		this.tokenStorage.getUserRole().subscribe(userRole => {
			role = userRole;
		});

		this.model = { id: undefined, role: role, status: 'ACTIVE', name: this.translate.instant('AUTHORIZATIONS.FISH_SCHOOL'),
			action: this.translate.instant('AUTHORIZATIONS.ACTION_VIEW'), prop: '', auth: 'RO' };

		this.names = [ this.translate.instant('AUTHORIZATIONS.COMPANY') , this.translate.instant('AUTHORIZATIONS.USER'),
			this.translate.instant('AUTHORIZATIONS.FISH_SCHOOL'), this.translate.instant('AUTHORIZATIONS.FOOD'),
			this.translate.instant('AUTHORIZATIONS.FOOD_INVOICE'), this.translate.instant('AUTHORIZATIONS.FOOD_INVOICE_SLOT') ];

		this.actions = [ this.translate.instant('AUTHORIZATIONS.ACTION_VIEW'), this.translate.instant('AUTHORIZATIONS.ACTION_SAVE'),
			this.translate.instant('AUTHORIZATIONS.ACTION_UPDATE'), this.translate.instant('AUTHORIZATIONS.ACTION_DELETE') ];
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
					this.showError({message: this.translate.instant('AUTH.VALIDATION.AUTHORIZATION') + ' - '
							+ this.translate.instant('AUTH.VALIDATION.CONNECTION_FAILURE'), type: 'danger'});
				}
			});
	}
}
