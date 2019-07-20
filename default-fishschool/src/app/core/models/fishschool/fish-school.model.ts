import {Moment} from 'moment';
import {FoodModel} from '../food/food.model';

export interface FishSchoolModel {

	id: number;
	companyId: number;
	name: string;
	updateName: string;
	status: string;
	creationDate: Moment;
	updatedDate: Moment;
	age: number;
	specie: string;
	quantity: number;
	dead: number;
	menualAvgWeight: boolean;
	averageWeight: number;
	soldFish: number;
	foodWeight: number;
	totalGivenFood: number;
	actualGivenFood: number;
	percentageTsemach: number;
	deadLastUpdateDate: Moment;
	food: FoodModel;
	feedDate: any;
	sale: number;
	totalSale: number;
	fcr: number;
	salesFcr: number;
	totalWeight: number;
	activityLog: string;
	saleWeight: number;
	updatedCreationDate: any;
}

