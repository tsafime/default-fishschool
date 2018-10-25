import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FishSchoolModel} from '../models/fish-school.model';
import {FishSchoolsResponse} from '../models/fish.schools.model';
import {QueryFilter} from '../models/fishschool/query.filter';
import {FilteredQuery} from '../models/fishschool/filtered.query';
import {FsModel} from '../../content/pages/components/fish-schools/fish-schools.component';
import {FsNames} from '../models/fish-school.names.model';

@Injectable()
export class FishSchoolsService {

	data: FishSchoolModel[];

	constructor(private http: HttpClient) {
	}

	view(model: FsModel) {

		const queryFilters: QueryFilter[] = [];
		queryFilters.push(new QueryFilter('name', [model.schoolName], '=', 'AND'));
		queryFilters.push(new QueryFilter('status', [model.status], '=', 'AND'));
		queryFilters.push(new QueryFilter('feedDate', [model.startDate.format('DD/MM/YYYY')], '=', 'NONE'));

		const filteredQuery: FilteredQuery = new FilteredQuery(queryFilters, model.days, 0, ['feedDate'], 'ASC');
		const json = JSON.stringify(filteredQuery);
		const httpPost = this.http.post<FishSchoolsResponse>('http://localhost:51120/fishschool/view', json);
		return httpPost;
	}

	names() {
		const json = {};
		const httpPost = this.http.post<FsNames>('http://localhost:51120/fishschool/names', json);
		return httpPost;
	}
}
