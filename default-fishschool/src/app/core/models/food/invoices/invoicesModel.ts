import {InvoiceModel} from './invoiceModel';
import {FsResponse} from '../../fishschool/fs.response.model';

export interface InvoicesModel extends FsResponse {
	data: InvoiceModel[];
}
