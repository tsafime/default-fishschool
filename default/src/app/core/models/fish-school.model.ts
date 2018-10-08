export interface FishSchoolModel {
	id: number;
	companyId: number;
	name: string;
	status: string;
	creationDate: string;
	updatedDate: string;
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
	deadLastUpdateDate: string;
	foodTypeName: string;
	feedDate: string;
	sale: number;
	totalSale: number;
	fcr: number;
	salesFcr: number;
	totalWeight: number;
}
