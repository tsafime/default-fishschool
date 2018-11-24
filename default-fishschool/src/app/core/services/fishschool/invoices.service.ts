import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {QueryFilter} from '../../models/fishschool/query.filter';
import {FilteredQuery} from '../../models/fishschool/filtered.query';
import {FsUrlsService} from './fs.urls';
import {InvoicesRequestModel} from '../../../content/pages/components/food/invoices/invoices.component';
import {Observable} from 'rxjs';
import * as deepEqual from 'deep-equal';
import {InvoicesModel} from '../../models/food/invoices/invoicesModel';
import {InvoiceModel} from '../../models/food/invoices/invoiceModel';

@Injectable()
export class InvoicesService {

	constructor(private http: HttpClient, public urlsService: FsUrlsService) {
	}

	view(model: InvoicesRequestModel) {

		const queryFilters: QueryFilter[] = [];
		queryFilters.push(new QueryFilter('status', ['ACTIVE'], '=', 'AND'));
		queryFilters.push(new QueryFilter('actionType', [model.action], '=', 'AND'));
		queryFilters.push(new QueryFilter('foodDate', [model.startDate.format('DD/MM/YYYY'),
			model.startDate.add(model.days, 'days').format('DD/MM/YYYY')], 'BETWEEN', 'NONE'));

		const filteredQuery: FilteredQuery = new FilteredQuery(queryFilters, 400, 0, ['name'], 'ASC');
		const json = JSON.stringify(filteredQuery);
		return this.http.post<InvoicesModel>(this.urlsService.invoicesViewUrl, json);
	}

	update(originalData: InvoiceModel[], editedData: InvoiceModel[]): Observable<InvoicesModel> {

		const dirty: InvoiceModel[] = editedData.filter((item, index) => {
			const deepEqual1 = deepEqual(item, originalData[index]);
			return ! deepEqual1;
		});

		if (dirty.length > 0) {
			return this.http.post<InvoicesModel>(this.urlsService.invoicesUpdateUrl, {entities: dirty});
		}

		return null;
	}
}
