import {FoodStoreroomModel} from './food.storeroom.model';
import {FsResponse} from '../../fishschool/fs.response.model';

export interface FoodStoreroomsModel extends FsResponse {
	data: FoodStoreroomModel[];
}
