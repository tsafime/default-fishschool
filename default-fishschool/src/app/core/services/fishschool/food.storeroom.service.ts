import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {QueryFilter} from '../../models/fishschool/query.filter';
import {FilteredQuery} from '../../models/fishschool/filtered.query';
import {FsUrlsService} from './fs.urls';
import {FoodStoreRequestModel} from '../../../content/pages/components/food/food-storeroom/food-storeroom.component';
import {Observable} from 'rxjs';
import * as deepEqual from 'deep-equal';
import {FoodStoreroomsModel} from '../../models/food/storeroom/food.storerooms.model';
import {FoodStoreroomModel} from '../../models/food/storeroom/food.storeroom.model';

@Injectable()
export class FoodStoreroomService {

	constructor(private http: HttpClient, public urlsService: FsUrlsService) {
	}

	view(model: FoodStoreRequestModel) {

		const queryFilters: QueryFilter[] = [];
		queryFilters.push(new QueryFilter('status', ['ACTIVE'], '=', 'AND'));
		queryFilters.push(new QueryFilter('actionType', [model.action], '=', 'AND'));
		queryFilters.push(new QueryFilter('foodDate', [model.startDate.format('DD/MM/YYYY')], '=', 'NONE'));

		const filteredQuery: FilteredQuery = new FilteredQuery(queryFilters, model.days, 0, ['name'], 'ASC');
		const json = JSON.stringify(filteredQuery);
		return this.http.post<FoodStoreroomsModel>(this.urlsService.foodStoreroomViewUrl, json);
	}

	update(originalData: FoodStoreroomModel[], editedData: FoodStoreroomModel[]): Observable<FoodStoreroomsModel> {

		const dirty: FoodStoreroomModel[] = editedData.filter((item, index) => {
			const deepEqual1 = deepEqual(item, originalData[index]);
			return ! deepEqual1;
		});

		if (dirty.length > 0) {
			return this.http.post<FoodStoreroomsModel>(this.urlsService.foodUpdateViewUrl, {entities: dirty});
		}

		return null;
	}
}
