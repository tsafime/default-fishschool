import {Moment} from 'moment';

export interface FoodModel {
	id: number;
	companyId: number;
	name: string;
	quantity: number;
	status: string;
	creationDate: Moment;
	updatedDate: Moment;
}
