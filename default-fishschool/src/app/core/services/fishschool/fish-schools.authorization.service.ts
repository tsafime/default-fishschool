import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FishSchoolModel} from '../../models/fishschool/fish-school.model';
import {FishSchools} from '../../models/fishschool/fish.schools.model';
import {QueryFilter} from '../../models/fishschool/query.filter';
import {FilteredQuery} from '../../models/fishschool/filtered.query';
import {FsModel} from '../../../content/pages/components/fish-schools/fish-schools.component';
import {FsNames} from '../../models/fishschool/fish-school.names.model';
import * as deepEqual from 'deep-equal';
import {Observable} from 'rxjs';
import {TokenStorage} from '../../auth/token-storage.service';

@Injectable()
export class FishSchoolsAuthorizationService {

	authorizations: string;

	constructor(private http: HttpClient, private tokenStorage: TokenStorage) {
		this.http.post<string>('http://localhost:51120/user/authorizations', {}).toPromise()
			.then(response => {
				this.authorizations = response;
			})
			.catch(error => {
				console.log('Failed: ' + error);
			});
	}

	/*
	 isReadWrite('Company', 'SAVE', 'creationDate');
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
	isReadWrite(entity: string, action: string, prop: string): boolean {

		let role: string = '';
		this.tokenStorage.getUserRole().subscribe(userRole => {
			role = userRole;
		});

		// If exists it is RO otherwise it is enabled
		const property = this.authorizations[role][entity][action][prop];
		return ! property;
	}
}
