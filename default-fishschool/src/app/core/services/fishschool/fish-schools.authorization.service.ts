import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FishSchoolModel} from '../../models/fishschool/fish-school.model';
import {FishSchools} from '../../models/fishschool/fish.schools.model';
import {QueryFilter} from '../../models/fishschool/query.filter';
import {FilteredQuery} from '../../models/fishschool/filtered.query';
import {FsRequestModel} from '../../../content/pages/components/fish-schools/fish-schools.component';
import {FsNames} from '../../models/fishschool/fish-school.names.model';
import * as deepEqual from 'deep-equal';
import {Observable} from 'rxjs';
import {TokenStorage} from '../../auth/token-storage.service';
import {FsUrlsService} from './fs.urls';
import {ToastSupport} from '../../models/fishschool/toast.support';
import {ToastrManager} from 'ng6-toastr-notifications';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class FishSchoolsAuthorizationService extends ToastSupport {

	authorizations: string;

	constructor(private http: HttpClient, private tokenStorage: TokenStorage, private urlsService: FsUrlsService,
				public toastr: ToastrManager, private translate: TranslateService) {

		super(toastr);

		this.http.post<string>(urlsService.authorizationsUrl, {}).toPromise().then(response => {
			this.authorizations = response;
		})
		.catch(response => {
			if (response && response.error && response.error.status === 'Failure') {
				this.showError({message: response.error.code + ': ' + response.error.message, type: 'danger'});
			} else {
				this.showError({message: this.translate.instant('AUTH.VALIDATION.CONNECTION_FAILURE'), type: 'danger'});
			}
		});
	}

	isFishSchoolReadWrite(action: string, prop: string): boolean {
		return this.isReadWrite('FishSchool', action, prop);
	}

	isFoodReadWrite(action: string, prop: string): boolean {
		return this.isReadWrite('Food', action, prop);
	}

	isFoodInvoicesReadWrite(action: string, prop: string): boolean {
		return this.isReadWrite('FoodInvoice', action, prop);
	}

	private isReadWrite(entity: string, action: string, prop: string): boolean {

		let role: string = '';
		this.tokenStorage.getUserRole().subscribe(userRole => {
			role = userRole;
		});

		// If exists it is RO otherwise it is enabled
		const authByRole = this.authorizations[role];
		if (authByRole) {
			const authByEntity = authByRole[entity];
			if (authByEntity) {
				const authByAction = authByEntity[action];
				if (authByAction) {
					const property = authByAction[prop];
					return !property;
				}
			}
		}

		return false;
	}
}
