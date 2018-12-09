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
import {ToastSupport} from '../../models/fishschool/toast.support';
import {ToastrManager} from 'ng6-toastr-notifications';
import {TranslateService} from '@ngx-translate/core';
import * as moment from 'moment';

@Injectable()
export class DeliveryNotesService extends ToastSupport {

	constructor(private http: HttpClient, private translate: TranslateService, public urlsService: FsUrlsService,
				public toastr: ToastrManager) {

		super(toastr);
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

	update(originalData: DeliveryNotesModel[], editedData: DeliveryNotesModel[], foods: FoodModel[]): Observable<any> {

		const dirtyDeliveryNotesModel: DeliveryNotesModel[] = editedData.filter((item, index) => {
			const deepEqual1 = deepEqual(item, originalData[index]);
			return !deepEqual1;
		});

		if (dirtyDeliveryNotesModel.length > 0) {
			let passedValidation = false;
			for (const dirtyDeliveryNotes of dirtyDeliveryNotesModel) {
				for (let i = 0; i < 16; i++) {
					if (dirtyDeliveryNotes.receipt && dirtyDeliveryNotes.momentFoodDate && dirtyDeliveryNotes['food' + i]) {
						passedValidation = true;
						break;
					}
				}

				if (passedValidation) {
					break;
				}
			}

			if (passedValidation) {
				return this.http.post<DeliveriesNotesModel>(this.urlsService.invoicesUpdateUrl, {entities: dirtyDeliveryNotesModel});
			}

			this.showWarning({message: this.translate.instant('DELIVERY_NOTES.VALIDATION.MANDATORY_DATA_MISSING'), type: 'warning'});
			return null;
		}

		this.showWarning({message: this.translate.instant('DELIVERY_NOTES.UPDATE_WITHOUT_RECORDS'), type: 'warning'});
		return null;
	}

	delete(data: DeliveryNotesModel): Observable<FsResponse> {
		return this.http.request<DeliveriesNotesModel>('delete', this.urlsService.invoicesDeleteUrl, {body: {id: data.id}});
	}
}
