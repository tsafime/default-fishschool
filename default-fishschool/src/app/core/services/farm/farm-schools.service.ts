import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FishSchoolModel} from '../../models/fishschool/fish-school.model';
import {FishSchools} from '../../models/fishschool/fish.schools.model';
import {QueryFilter} from '../../models/fishschool/query.filter';
import {FilteredQuery} from '../../models/fishschool/filtered.query';
import {FsRequestModel} from '../../../content/pages/components/fish-schools/fish-schools.component';
import {FsNames} from '../../models/fishschool/fish-school.names.model';
import * as deepEqual from 'deep-equal';
import {Observable} from 'rxjs';

@Injectable()
export class FarmService {

	constructor(private http: HttpClient) {
	}

	view(model: FsRequestModel) {

		const queryFilters: QueryFilter[] = [];
		if (model.schoolName) {
			queryFilters.push(new QueryFilter('name', [model.schoolName], '=', 'AND'));
		}

		queryFilters.push(new QueryFilter('status', [model.status], '=', 'AND'));
		queryFilters.push(new QueryFilter('feedDate', [model.feedDate.format('DD/MM/YYYY')], '=', 'NONE'));

		const filteredQuery: FilteredQuery = new FilteredQuery(queryFilters, model.days, 0, ['feedDate'], 'ASC');
		const json = JSON.stringify(filteredQuery);
		return this.http.post<FishSchools>('http://localhost:51120/farm/view', json);
	}

	names() {
		const json = {};
		return this.http.post<FsNames>('http://localhost:51120/fishschool/names', json);
	}

	update(originalData: FishSchoolModel[], editedData: FishSchoolModel[]): Observable<FishSchools> {

		const dirty: FishSchoolModel[] = editedData.filter((item, index) => {
			const deepEqual1 = deepEqual(item, originalData[index]);
			return ! deepEqual1;
		});

		if (dirty.length > 0) {
			return this.http.post<FishSchools>('http://localhost:51120/fishschool/update', {entities: dirty});
		}

		return null;
	}
}
