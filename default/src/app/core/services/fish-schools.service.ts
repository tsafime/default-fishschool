import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {from, Observable, of} from 'rxjs';
import {FishSchoolModel} from '../models/fish-school.model';
import {catchError, map, tap} from 'rxjs/operators';
import {FishSchoolsResponse} from '../models/fish.schools.model';
import {QueryFilter} from '../models/fishschool/query.filter';
import {FilteredQuery} from '../models/fishschool/filtered.query';
import {FsModel} from '../../content/pages/components/fish-schools/fish-schools.component';

@Injectable()
export class FishSchoolsService {

	data: FishSchoolModel[];

	constructor(private http: HttpClient) {
	}

	view(model: FsModel): Observable<FishSchoolsResponse> {

		const queryFilters: QueryFilter[] = [];
		queryFilters.push(new QueryFilter('name', [model.schoolName], '=', 'AND'));
		queryFilters.push(new QueryFilter('feedDate', [model.startDate.format('DD-MM-YYYY')], '=', 'NONE'));

		const filteredQuery: FilteredQuery = new FilteredQuery(queryFilters, model.days, 0, ['feedDate'], 'ASC');
		const json = JSON.stringify(filteredQuery);

		return this.http.post<FishSchoolsResponse>('http://localhost:51120/fishschool/view', json).pipe(
			map((result: any) => {
				return result;
			}),
			tap(this.saveData.bind(this)),
			catchError(this.handleError('Fish school view', []))
		);
	}

	private saveData(fishData: FishSchoolsResponse) {

		if (typeof fishData !== 'undefined') {
			this.data = fishData.data;
		}
	}

	private handleError<T>(operation = 'operation', result?: any) {
		return (error: any): Observable<T> => {

			// TODO: send the error to remote logging infrastructure
			console.error(error); // log to console instead

			// TODO: better job of transforming error for user consumption
			console.log(`${operation} failed: ${error.message}`);

			// Let the app keep running by returning an empty result.
			return of(result as T);
		};
	}
}
