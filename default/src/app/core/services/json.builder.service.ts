import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class JsonBuilderService {

	constructor(private http: HttpClient) {
	}

	buildFileteredQuery() {

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
		return json;
	}
}
