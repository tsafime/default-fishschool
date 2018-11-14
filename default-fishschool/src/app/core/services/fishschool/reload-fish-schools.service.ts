import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FishSchoolModel} from '../../models/fishschool/fish-school.model';
import {FishSchools} from '../../models/fishschool/fish.schools.model';
import {QueryFilter} from '../../models/fishschool/query.filter';
import {FilteredQuery} from '../../models/fishschool/filtered.query';
import {FsRequestModel} from '../../../content/pages/components/fish-schools/fish-schools.component';
import {FsNames} from '../../models/fishschool/fish-school.names.model';
import * as deepEqual from 'deep-equal';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable()
export class ReloadFishSchoolsService {

	@Output() change: EventEmitter<boolean> = new EventEmitter();

	constructor() {
	}

	reload(value: boolean) {
		this.change.emit(true);
	}
}
