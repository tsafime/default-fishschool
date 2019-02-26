import {FsResponse} from './fs.response.model';

export interface FsNames extends FsResponse {
	data: NameEntity[];
}

export interface NameEntity {
	name: string;
	status: string;
}
