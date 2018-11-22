import {Moment} from 'moment';

export interface InvoiceModel {
	id: number;
	companyId: number;
	name: string;
	status: string;
	quantity: number;
	actionType: string;
	receipt: string;
	foodDate: Moment;
	creationDate: Moment;
	updatedDate: Moment;
}
