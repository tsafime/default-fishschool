import {Injectable} from '@angular/core';

@Injectable()
export class FsUrlsService {

	public baseUrl: string = 'http://localhost:51120/';
	public loginUrl: string = this.baseUrl + 'login';
	public authorizationsUrl: string = this.baseUrl + 'user/authorizations';

	public farmViewUrl: string = this.baseUrl + 'farm/view';
	public farmSummaryUrl = this.baseUrl + 'farm/summary';

	public fsNamesUrl: string = this.baseUrl + 'fishschool/names';
	public fsViewUrl: string = this.baseUrl + 'fishschool/view';
	public fsUpdateUrl: string = this.baseUrl + 'fishschool/update';

	public foodViewUrl: string = this.baseUrl + 'food/view';
	public foodUpdateUrl: string = this.baseUrl + 'food/update'

	public foodStoreroomViewUrl = this.baseUrl + 'foodControl/view';
	public foodUpdateViewUrl = this.baseUrl + 'foodControl/update';

	constructor() {
	}
}
