import {FsResponse} from '../fs.response.model';
import {SummaryModel} from './summary.model';

export class SummariesModel implements FsResponse {

	code: string;
	message: string;
	status: string;
	entity: SummaryModel;

	constructor(code: string, message: string, status: string, entity: SummaryModel) {

		this.code = code;
		this.message = message;
		this.status = status;
		this.entity = entity;
	}
}


