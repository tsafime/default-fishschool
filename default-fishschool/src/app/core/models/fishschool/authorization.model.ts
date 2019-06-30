import {FsResponse} from '../fishschool/fs.response.model';
import {AuthorizationModel} from './food.model';

export interface AuthorizationsModel extends FsResponse {
	data: AuthorizationModel[];
}
