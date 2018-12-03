import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {QueryFilter} from '../../models/fishschool/query.filter';
import {FilteredQuery} from '../../models/fishschool/filtered.query';
import {FsUrlsService} from './fs.urls';
import {DeliveryNotesRequestModel} from '../../../content/pages/components/food/delivery-notes/delivery-notes.component';
import {Observable} from 'rxjs';
import * as deepEqual from 'deep-equal';
import {DeliveriesNotesModel} from '../../models/food/delivery-notes/deliveriesNotesModel';
import {DeliveryNotesModel} from '../../models/food/delivery-notes/deliveryNotesModel';
import {FoodModel} from '../../models/food/food.model';
import {FsResponse} from '../../models/fishschool/fs.response.model';
import {RequestOptions} from '@angular/http';

@Injectable()
export class DeliveryNotesService {

	constructor(private http: HttpClient, public urlsService: FsUrlsService) {
	}

	view(model: DeliveryNotesRequestModel) {

		const queryFilters: QueryFilter[] = [];
		queryFilters.push(new QueryFilter('status', ['ACTIVE'], '=', 'AND'));
		queryFilters.push(new QueryFilter('actionType', [model.action], '=', 'AND'));
		queryFilters.push(new QueryFilter('foodDate', [model.startDate.clone().format('DD/MM/YYYY'),
			model.startDate.clone().add(model.days, 'days').format('DD/MM/YYYY')], 'BETWEEN', 'NONE'));

		const filteredQuery: FilteredQuery = new FilteredQuery(queryFilters, 400, 0, ['name'], 'ASC');
		const json = JSON.stringify(filteredQuery);
		return this.http.post<DeliveriesNotesModel>(this.urlsService.invoicesViewUrl, json);
	}

	update(originalData: DeliveryNotesModel[], editedData: DeliveryNotesModel[], foods: FoodModel[]): Observable<DeliveriesNotesModel> {

		let biggestArray = originalData;
		let smallestArray = editedData;
		if (editedData.length > originalData.length) {
			biggestArray = editedData;
			smallestArray = originalData;
		}

		const dirtyDeliveryNotesModel: DeliveryNotesModel[] = biggestArray.filter((item, index) => {
			const deepEqual1 = deepEqual(item, smallestArray[index]);
			return !deepEqual1;
		});

		if (dirtyDeliveryNotesModel.length > 0) {
			return this.http.post<DeliveriesNotesModel>(this.urlsService.invoicesUpdateUrl, {entities: dirtyDeliveryNotesModel});
		}

		return null;
	}

	delete(data: DeliveryNotesModel): Observable<FsResponse> {
		return this.http.request<DeliveriesNotesModel>('delete', this.urlsService.invoicesDeleteUrl, {body: {id: data.id}});
	}
}
