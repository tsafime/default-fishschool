import {DeliveryNotesModel} from './deliveryNotesModel';
import {FsResponse} from '../../fishschool/fs.response.model';

export interface DeliveriesNotesModel extends FsResponse {
	data: DeliveryNotesModel[];
}
