export class QueryFilter {
	key: string;
	values: string[];
	operator: string;
	variant: string;

	constructor(key: string, values: string[], operator: string, variant: string) {
		this.key = key;
		this.values = values;
		this.operator = operator;
		this.variant = variant;
	}
}
