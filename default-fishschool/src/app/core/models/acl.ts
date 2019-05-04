import { ConfigModel } from '../interfaces/config';

export interface AclInterface {
	permissions: any;
	currentUserRoles: any;
}

export class AclModel implements AclInterface, ConfigModel {
	public config: any;

	// default permissions
	public permissions: any = {
		ADMIN: ['canDoAnything'],
		FEEDING_FORMAN: ['canDoAnything'],
		FARM_MANAGER: ['canDoAnything'],
		OWNER_READ: ['canDoAnything'],
		ADMINISTRATIVE_MANAGER: ['canDoAnything'],
		// USER: ['canDoLimitedThings']
	};

	// store an object of current username role
	public currentUserRoles: any = {};

	constructor() {}
}
