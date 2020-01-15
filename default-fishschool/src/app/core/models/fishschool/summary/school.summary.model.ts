import {PairModel} from './pair.model';
import * as moment from 'moment';

export class SchoolSummaryModel {

	name: string;
	quantity: number;
	averageWeight: number;
	foodWeight: number;
	givenFood: number;
	fcr: number;
	feedDate: string;
	foodTypeName: string;
	feedTypes: PairModel<string, number>[];
	totalGivenFoodByTypes: PairModel<string, number>[];
	feedPlanByTypes: PairModel<string, number>[];

	constructor(name: string, quantity: number, averageWeight: number, foodWeight: number, givenFood: number, fcr: number, feedDate: string,
	            foodTypeName: string, foodTypes: PairModel<string, number>[], totalGivenFoodByTypes: PairModel<string, number>[], feedPlanByTypes: PairModel<string, number>[]) {

		this.name = name;
		this.quantity = quantity;
		this.averageWeight = averageWeight;
		this.foodWeight = foodWeight;
		this.givenFood = givenFood;
		this.fcr = fcr;
		this.feedDate = moment(feedDate).format('DD/MM/YYYY');
		this.foodTypeName = foodTypeName;
		this.feedTypes = foodTypes;
		this.totalGivenFoodByTypes = totalGivenFoodByTypes;
		this.feedPlanByTypes = feedPlanByTypes;
	}
}


