import {QueryFilter} from './query.filter';

export class XQueryFilter extends QueryFilter {
	selection: string;
	numOfDays: number

	constructor(key: string, values: string[], operator: string, variant: string, selection: string, numOfDays: number) {
		super(key, values, operator, variant);
		this.selection = selection;
		this.numOfDays = numOfDays;
	}
}
