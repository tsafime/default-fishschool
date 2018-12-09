import {Moment} from 'moment';
import * as moment from 'moment';

export class DeliveryNotesModel {
	id: number;
	companyId: number;
	status: string;
	actionType: string;
	receipt: string;
	foodDate: string;
	momentFoodDate: Moment;
	creationDate: Moment;
	updatedDate: Moment;
	food1: number;
	food2: number;
	food3: number;
	food4: number;
	food5: number;
	food6: number;
	food7: number;
	food8: number;
	food9: number;
	food10: number;
	food11: number;
	food12: number;
	food13: number;
	food14: number;
	food15: number;
	food16: number;

	constructor(id: number, companyId: number, status: string, quantity: number, actionType: string, receipt: string,
				foodDate: string, creationDate: Moment, updatedDate: Moment, food1: number, food2: number, food3: number,
				food4: number, food5: number, food6: number, food7: number, food8: number, food9: number, food10: number,
				food11: number, food12: number, food13: number, food14: number, food15: number, food16: number) {

		this.id = id;
		this.companyId = companyId;
		this.status = status;
		this.actionType = actionType;
		this.receipt = receipt;
		this.foodDate = foodDate;
		this.momentFoodDate = moment(foodDate, 'DD/MM/YYYY')
		this.food1 = food1;
		this.food2 = food2;
		this.food3 = food3;
		this.food4 = food4;
		this.food5 = food5;
		this.food6 = food6;
		this.food7 = food7;
		this.food8 = food8;
		this.food9 = food9;
		this.food10 = food10;
		this.food11 = food11;
		this.food12 = food12;
		this.food13 = food13;
		this.food14 = food14;
		this.food15 = food15;
		this.food16 = food16;
		this.creationDate = creationDate;
		this.updatedDate = updatedDate;
	}
}
