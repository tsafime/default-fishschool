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

@Injectable()
export class FishSchoolsAuthorizationService {

	authorizations: string;

	constructor(private http: HttpClient, private tokenStorage: TokenStorage, private urlsService: FsUrlsService) {
		this.http.post<string>(urlsService.authorizationsUrl, {}).toPromise()
			.then(response => {
				this.authorizations = response;
			})
			.catch(error => {
				console.log('Failed: ' + error);
			});
	}

	/*
	 isFishSchoolReadWrite('Company', 'SAVE', 'creationDate');
	 JSON example:
		{
		  "ADMIN": {
			"FishSchool": {
			  "UPDATE": {
				"companyId": "RO",
				"foodWeight": "RO",
				"percentageTsemach": "RO",
				"deadLastUpdateDate": "RO",
				"creationDate": "RO",
				"updatedDate": "RO",
				"totalGivenFood": "RO",
				"status": "RO",
				"totalSale": "RO"
			  }
		}
	 */

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