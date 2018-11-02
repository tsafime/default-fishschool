import {SchoolSummaryModel} from './school.summary.model';

export class SummaryModel {

	totalAverageWeight: number;
	totalNumberOfFish: number;
	totalFoodWeight: number;
	totalFCR: number;
	totalPlanFood: number;
	schoolSummaries: SchoolSummaryModel[];

	constructor(totalAverageWeight: number, totalNumberOfFish: number, totalFoodWeight: number, totalFCR: number,
				totalPlanFood: number, schoolSummaries: SchoolSummaryModel[]) {

		this.totalAverageWeight = totalAverageWeight;
		this.totalNumberOfFish = totalNumberOfFish;
		this.totalFoodWeight = totalFoodWeight;
		this.totalFCR = totalFCR;
		this.totalPlanFood = totalPlanFood;
		this.schoolSummaries = schoolSummaries;
	}
}


