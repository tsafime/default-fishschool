import {QueryFilter} from './query.filter';

export class FilteredQuery {

	/* Example:
	const json = '{' +
			'  "filters": [' +
			'    {' +
			'      "key": "name",' +
			'      "values": [' +
			'        "270517 102"' +
			'      ],' +
			'      "operator": "=",' +
			'      "variant": "AND"' +
			'    },' +
			'    {' +
			'      "key": "feedDate",' +
			'      "values": [' +
			'        "30-07-2017"' +
			'      ],' +
			'      "operator": "=",' +
			'      "variant": "AND"' +
			'    }' +
			'  ],' +
			'  "size": 10,' +
			'  "page": 0,' +
			'  "orderBy": [' +
			'    "feedDate"' +
			'  ],' +
			'  "orderDirection": "ASC"' +
			'}';
	 */
	filters: QueryFilter[];
	size: number;
	page: number;
	orderBy: string[];
	orderDirection: string;

	constructor(filters: QueryFilter[], size: number, page: number, orderBy: string[], orderDirection: string = 'ASC') {
		this.filters = filters;
		this.size = size;
		this.page = page;
		this.orderBy = orderBy;
		this.orderDirection = orderDirection;
	}
}


