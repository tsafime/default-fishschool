import {Moment} from 'moment';

export interface AuthorizationModel {
	id: number;
	companyId: number;
	name: string;
	role: string;
	status: string;
	action: string;
	prop: string;
	creationDate: Moment;
	updatedDate: Moment;
}
