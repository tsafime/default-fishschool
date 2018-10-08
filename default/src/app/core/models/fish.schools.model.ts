import {FsResponse} from './fs.response.model';
import {FishSchoolModel} from './fish-school.model';

export interface FishSchoolsResponse extends FsResponse {
	data: FishSchoolModel[];
}
