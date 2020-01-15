import {SchoolSummaryModel} from './school.summary.model';
import {PairModel} from './pair.model';

export class SummaryModel {

	dead: number;
	totalPlanFood: number;
	totalAverageWeight: number;
	totalNumberOfFish: number;
	totalGivenFood: number;
	totalFCR: number;
	schoolSummaries: SchoolSummaryModel[];
	feedTypes: PairModel<string, number>[];
	totalGivenFoodByTypes: PairModel<string, number>[];
	feedPlanByTypes: PairModel<string, number>[];

	constructor(dead: number, totalPlanFood: number, totalAverageWeight: number, totalNumberOfFish: number, totalGivenFood: number,
				totalFCR: number, schoolSummaries: SchoolSummaryModel[], feedTypes: PairModel<string, number>[], totalGivenFoodByTypes: PairModel<string, number>[], feedPlanByTypes: PairModel<string, number>[]) {

		this.dead = dead;
		this.totalPlanFood = totalPlanFood;
		this.totalAverageWeight = totalAverageWeight;
		this.totalNumberOfFish = totalNumberOfFish;
		this.totalGivenFood = totalGivenFood;
		this.totalFCR = totalFCR;
		this.schoolSummaries = schoolSummaries;
		this.feedTypes = feedTypes;
		this.totalGivenFoodByTypes = totalGivenFoodByTypes;
		this.feedPlanByTypes = feedPlanByTypes;
	}
}


