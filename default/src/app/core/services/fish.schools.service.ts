import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { FishSchoolModel } from '../models/fish.schools.model';
import { catchError, map, tap } from 'rxjs/operators';
import { JsonBuilderService } from './json.builder.service';

const API_DATATABLE_URL = 'fishschool/view';

@Injectable()
export class FishSchoolsService {

	constructor(private http: HttpClient, private jsonBuilder: JsonBuilderService) {
	}

	view(): Observable<FishSchoolModel[]> {

		const json = this.jsonBuilder.buildFileteredQuery();

		const response =  this.http.post<FishSchoolModel>('http://localhost:51120/' + API_DATATABLE_URL, json,
			{headers: {'Content-Type': 'application/json;charset=UTF-8'}}).pipe(
			// map((result: any) => {
			// 	if (result instanceof Array) {
			// 		return result.pop();
			// 	}
            //
			// 	return result;
			// }),
			// tap(this.saveAccessData.bind(this)),
			catchError(this.handleError('login', []))
		);

		return response;
	}

	private handleError<T>(operation = 'operation', result?: any) {
		return (error: any): Observable<any> => {
			console.error(`${operation} failed: ${error.message}`);

			result.push(error.error);
			return from(result);
		};
	}
}
