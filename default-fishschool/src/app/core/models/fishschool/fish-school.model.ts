import {Moment} from 'moment';

export interface FishSchoolModel {

	id: number;
	companyId: number;
	name: string;
	status: string;
	creationDate: Moment;
	updatedDate: Moment;
	age: number;
	specie: string;
	quantity: number;
	dead: number;
	menualAvgWeight: boolean;
	averageWeight: number;
	foodWeight: number;
	totalGivenFood: number;
	actualGivenFood: number;
	percentageTsemach: number;
	deadLastUpdateDate: Moment;
	food: FoodModel;
	feedDate: Moment;
	sale: number;
	totalSale: number;
	fcr: number;
	salesFcr: number;
	totalWeight: number;
}

export interface FoodModel {
	id: number;
	name: string;
}
