import {Moment} from 'moment';

export class DeliveryNotesModel {
	id: number;
	companyId: number;
	status: string;
	actionType: string;
	receipt: string;
	foodDate: Moment;
	creationDate: Moment;
	updatedDate: Moment;

	constructor(id: number, companyId: number, status: string, quantity: number, actionType: string, receipt: string,
				foodDate: Moment, creationDate: Moment, updatedDate: Moment) {

		this.id = id;
		this.companyId = companyId;
		this.status = status;
		this.actionType = actionType;
		this.receipt = receipt;
		this.foodDate = foodDate;
		this.creationDate = creationDate;
		this.updatedDate = updatedDate;
	}
}
