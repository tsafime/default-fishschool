import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as deepEqual from 'deep-equal';
import {Observable} from 'rxjs';
import {QueryFilter} from '../../models/fishschool/query.filter';
import {FilteredQuery} from '../../models/fishschool/filtered.query';
import {FsNames} from '../../models/fishschool/fish-school.names.model';
import {FoodModel, FoodsModel} from '../../../content/pages/components/food/food-names/food-names.component';

@Injectable()
export class FoodService {

	constructor(private http: HttpClient) {
	}

	names() {
		const json = {};
		return this.http.post<FsNames>('http://localhost:51120/food/names', json);
	}

	view() {

		const queryFilters: QueryFilter[] = [];
		queryFilters.push(new QueryFilter('status', ['ACTIVE'], '=', 'NONE'));

		const filteredQuery: FilteredQuery = new FilteredQuery(queryFilters, 400, 0, ['name'], 'ASC');
		const json = JSON.stringify(filteredQuery);
		return this.http.post<FoodsModel>('http://localhost:51120/food/view', json);
	}

	update(originalData: FoodModel[], editedData: FoodModel[]): Observable<FoodsModel> {

		const dirty: FoodModel[] = editedData.filter((item, index) => {
			const deepEqual1 = deepEqual(item, originalData[index]);
			return ! deepEqual1;
		});

		if (dirty.length > 0) {
			return this.http.post<FoodsModel>('http://localhost:51120/food/update', {entities: dirty});
		}

		return null;
	}
}
