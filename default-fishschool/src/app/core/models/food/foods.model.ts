import {FsResponse} from '../fishschool/fs.response.model';
import {FoodModel} from './food.model';

export interface FoodsModel extends FsResponse {
	data: FoodModel[];
}
