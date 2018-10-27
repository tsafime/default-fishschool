import {FsResponse} from './fs.response.model';
import {FishSchoolModel} from './fish-school.model';

export interface FishSchools extends FsResponse {

	data: FishSchoolModel[];
}
