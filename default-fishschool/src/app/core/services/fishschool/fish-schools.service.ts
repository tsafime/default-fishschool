import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FishSchoolModel} from '../../models/fishschool/fish-school.model';
import {FishSchools} from '../../models/fishschool/fish.schools.model';
import {QueryFilter} from '../../models/fishschool/query.filter';
import {FilteredQuery} from '../../models/fishschool/filtered.query';
import {FsRequestModel} from '../../../content/pages/components/farm/fish-schools/fish-schools.component';
import {FsNames} from '../../models/fishschool/fish-school.names.model';
import * as deepEqual from 'deep-equal';
import {Observable} from 'rxjs';
import {FsUrlsService} from './fs.urls';
import {SoldFsRequestModel} from '../../../content/pages/components/farm/view-sold-fish-school/view-sold-fish-school.component';
import {ToastSupport} from '../../models/fishschool/toast.support';
import {ToastrManager} from 'ng6-toastr-notifications';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class FishSchoolsService extends ToastSupport {

	constructor(private http: HttpClient, private urlsService: FsUrlsService, private translate: TranslateService,
				public toastr: ToastrManager) {
		super(toastr);
	}

	view(model: FsRequestModel) {

		const queryFilters: QueryFilter[] = [];
		queryFilters.push(new QueryFilter('name', [model.schoolName.name], '=', 'AND'));
		queryFilters.push(new QueryFilter('status', [model.schoolName.status], '=', 'AND'));
		queryFilters.push(new QueryFilter('feedDate', [model.feedDate.clone().format('DD/MM/YYYY')], '=', 'NONE'));

		const filteredQuery: FilteredQuery = new FilteredQuery(queryFilters, model.days, 0, ['feedDate'], 'ASC');
		const json = JSON.stringify(filteredQuery);
		return this.http.post<FishSchools>(this.urlsService.fsViewUrl, json);
	}

	viewSold(model: SoldFsRequestModel) {

		const queryFilters: QueryFilter[] = [];
		queryFilters.push(new QueryFilter('name', [model.schoolName.name], '=', 'NONE'));

		const filteredQuery: FilteredQuery = new FilteredQuery(queryFilters, 400, 0, ['feedDate'], 'ASC');
		const json = JSON.stringify(filteredQuery);
		return this.http.post<FishSchools>(this.urlsService.fsViewSoldUrl, json);
	}

	sold(from: FishSchoolModel, entities: FishSchoolModel[]): Observable<FishSchools> {
		entities.unshift(from);
		return this.http.post<FishSchools>(this.urlsService.fsViewSoldUrl, {entities: entities});
	}

	names() {
		const json = {};
		return this.http.post<FsNames>(this.urlsService.fsNamesUrl, json);
	}

	update(originalData: FishSchoolModel[], editedData: FishSchoolModel[]): Observable<FishSchools> {

		const dirty: FishSchoolModel[] = editedData.filter((item, index) => {
			const deepEqual1 = deepEqual(item, originalData[index]);
			return !deepEqual1;
		});

		if (dirty.length === 1) {
			return this.http.post<FishSchools>(this.urlsService.fsUpdateUrl, {entities: editedData});
			// return this.http.post<FishSchools>(this.urlsService.fsUpdateUrl, {entities: dirty});
		}

		if (dirty.length > 1) {
			this.showError({message: this.translate.instant('VALIDATION.FISH_SCHOOL_MULTI_UPDATE'), type: 'info'});
		} else {
			this.showInfo({message: this.translate.instant('VALIDATION.NO_CHANGES'), type: 'info'});
		}

		return null;
	}


	createNewFishSchool(school: FishSchoolModel) {
		if (school.updatedCreationDate) {
			school.updatedCreationDate = school.updatedCreationDate.format('DD/MM/YYYY HH:mm:ss');
		}
		return this.http.put<FishSchools>(this.urlsService.fsSaveUrl, {entities: [school]});
	}

	renameFishSchool(from: string, to: string) {
		const model = [{ name: from, updateName: to}];
		return this.http.post<FishSchools>(this.urlsService.fsUpdateUrl, {entities: model});
	}

	toggleFishSchoolStatus(name: string, status: string) {
		const model = [{ name: name, status: status}];
		return this.http.post<FishSchools>(this.urlsService.fsUpdateUrl, {entities: model});
	}
}
