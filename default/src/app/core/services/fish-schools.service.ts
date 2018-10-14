import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {from, Observable, of} from 'rxjs';
import {FishSchoolModel} from '../models/fish-school.model';
import {catchError, map, tap} from 'rxjs/operators';
import {FishSchoolsResponse} from '../models/fish.schools.model';
import {QueryFilter} from '../models/fishschool/query.filter';
import {FilteredQuery} from '../models/fishschool/filtered.query';

@Injectable()
export class FishSchoolsService {

	data: FishSchoolModel[];

	constructor(private http: HttpClient) {
	}

	view(): Observable<FishSchoolsResponse> {

		// TODO: read from a panel in the HTML to create FilteredQuery
		const queryFilters: QueryFilter[] = [];
		queryFilters.push(new QueryFilter('name', ['270517 102'], '=', 'AND'));
		queryFilters.push(new QueryFilter('feedDate', ['30-07-2017'], '=', 'AND'));

		const filteredQuery: FilteredQuery = new FilteredQuery(queryFilters, 10, 0, ['feedDate'], 'ASC');

		const json = JSON.stringify(filteredQuery) ;

		return this.http.post<FishSchoolsResponse>('http://localhost:51120/fishschool/view', json).pipe(
			tap(this.saveData.bind(this)),
			catchError(this.handleError('Fish school view', []))
		);
	}

	private saveData(fishData: FishSchoolsResponse) {

		console.log('In save');
		if (typeof fishData !== 'undefined') {
			this.data = fishData.data;
		}
	}

	private handleError<T>(operation = 'operation', result?: any) {

		console.log('In error');
		return (error: any): Observable<T> => {

			// TODO: send the error to remote logging infrastructure
			console.error(error); // log to console instead

			// TODO: better job of transforming error for user consumption
			console.log(`${operation} failed: ${error.message}`);

			// Let the app keep running by returning an empty result.
			return of(result as T);
		};

		/*console.log('operation: ' + operation + ', error: ' + result);
		return (error: any): Observable<any> => {
			if (error.error instanceof ErrorEvent) {
				// A client-side or network error occurred. Handle it accordingly.
				console.error('An error occurred:', error.error.message);
			} else {
				// The backend returned an unsuccessful response code.
				// The response body may contain clues as to what went wrong,
				console.error(
					`Backend returned code ${error.status}, ` +
					`body was: ${error.error}`);
			}

			result.push(error.error);
			return from(result);
		};*/
	}
}
