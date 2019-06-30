import {Injectable} from '@angular/core';

@Injectable()
export class FsUrlsService {

	public baseUrl: string = 'http://localhost:51120/';
	public loginUrl: string = this.baseUrl + 'login';
	public authorizationUrl: string = this.baseUrl + 'user/authorization';
	public authorizationsUrl: string = this.baseUrl + 'user/authorizations';
	public authorizationViewUrl = this.baseUrl + 'authorization/view';

	public farmViewUrl: string = this.baseUrl + 'farm/view';
	public farmSummaryUrl = this.baseUrl + 'farm/summary';

	public fsNamesUrl: string = this.baseUrl + 'fishschool/names';
	public fsViewUrl: string = this.baseUrl + 'fishschool/view';
	public fsSoldUrl: string = this.baseUrl + 'fishschool/sold';
	public fsSaveUrl: string = this.baseUrl + 'fishschool/save';
	public fsUpdateUrl: string = this.baseUrl + 'fishschool/update';

	public foodViewUrl: string = this.baseUrl + 'food/view';
	public foodUpdateUrl: string = this.baseUrl + 'food/update'
	public foodDeleteUrl: string = this.baseUrl + 'food/delete';

	public invoicesViewUrl = this.baseUrl + 'foodInvoice/view';
	public invoicesUpdateUrl = this.baseUrl + 'foodInvoice/update';
	public invoicesDeleteUrl = this.baseUrl + 'foodInvoice/delete';
	public invoicesSlotsViewUrl = this.baseUrl + 'foodInvoiceSlot/view';

	constructor() {
	}
}
