import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as deepEqual from 'deep-equal';
import {Observable} from 'rxjs';
import {QueryFilter} from '../../models/fishschool/query.filter';
import {FilteredQuery} from '../../models/fishschool/filtered.query';
import {FoodsModel} from '../../models/food/foods.model';
import {FoodModel} from '../../models/food/food.model';
import {FsUrlsService} from './fs.urls';

@Injectable()
export class FoodService {

	constructor(private http: HttpClient, private urlsService: FsUrlsService) {
	}

	names() {
		return this.view();
	}

	view() {

		const queryFilters: QueryFilter[] = [];
		queryFilters.push(new QueryFilter('status', ['ACTIVE'], '=', 'NONE'));
		const filteredQuery: FilteredQuery = new FilteredQuery(queryFilters, 400, 0, ['name'], 'ASC');
		const json = JSON.stringify(filteredQuery);

		return this.http.post<FoodsModel>(this.urlsService.foodViewUrl, json);
	}

	update(originalData: FoodModel[], editedData: FoodModel[]): Observable<FoodsModel> {

		const dirty: FoodModel[] = editedData.filter((item, index) => {
			const deepEqual1 = deepEqual(item, originalData[index]);
			return ! deepEqual1;
		});

		if (dirty.length > 0) {
			return this.http.post<FoodsModel>(this.urlsService.foodUpdateUrl, {entities: dirty});
		}

		return null;
	}
}
