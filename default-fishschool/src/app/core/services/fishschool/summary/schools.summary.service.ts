import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {QueryFilter} from '../../../models/fishschool/query.filter';
import {FilteredQuery} from '../../../models/fishschool/filtered.query';
import * as moment from 'moment';
import {SummariesModel} from '../../../models/fishschool/summary/summaries.model';
import {Observable} from 'rxjs';
import {Moment} from 'moment';

@Injectable()
export class SchoolsSummaryService {

	constructor(private http: HttpClient) {
	}

	view(date: Moment): Observable<any> {
		const queryFilters: QueryFilter[] = [];
		if (date === undefined) {
			date = moment();
		}

		queryFilters.push(new QueryFilter('feedDate', [date.format('DD/MM/YYYY')], '=', 'NONE'));

		const filteredQuery: FilteredQuery = new FilteredQuery(queryFilters, 10, 0, ['feedDate'], 'ASC');
		const json = JSON.stringify(filteredQuery);
		return this.http.post<SummariesModel>('http://localhost:51120/fishschool/summary', json);
	}
}
