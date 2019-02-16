import {SchoolSummaryModel} from './school.summary.model';

export class SummaryModel {

	dead: number;
	totalPlanFood: number;
	totalAverageWeight: number;
	totalNumberOfFish: number;
	totalGivenFood: number;
	totalFCR: number;

	schoolSummaries: SchoolSummaryModel[];

	constructor(dead: number, totalPlanFood: number, totalAverageWeight: number, totalNumberOfFish: number, totalGivenFood: number,
				totalFCR: number, schoolSummaries: SchoolSummaryModel[]) {

		this.dead = dead;
		this.totalPlanFood = totalPlanFood;
		this.totalAverageWeight = totalAverageWeight;
		this.totalNumberOfFish = totalNumberOfFish;
		this.totalGivenFood = totalGivenFood;
		this.totalFCR = totalFCR;
		this.schoolSummaries = schoolSummaries;
	}
}


