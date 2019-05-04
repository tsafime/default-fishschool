// tslint:disable-next-line:no-shadowed-variable
import { ConfigModel } from '../core/interfaces/config';

// tslint:disable-next-line:no-shadowed-variable
export class MenuConfig implements ConfigModel {
	public config: any = {};

	constructor() {
		this.config = {
			header: {
				self: {},
				items: []
			},
			aside: {
				self: {},
				items: [
					{
						title: 'Dashboard',
						desc: 'Some description goes here',
						root: true,
						icon: 'flaticon-line-graph',
						page: '/',
						translate: 'MENU.DASHBOARD',
						authorizations: ['ADMIN', 'FEEDING_FORMAN', 'FARM_MANAGER', 'OWNER_READ', 'ADMINISTRATIVE_MANAGER'],
					},
					{
						title: 'Farm',
						icon: 'fa fa-fish',
						root: true,
						submenu: [
							{
								title: 'Daily Update',
								desc: 'Daily farm update',
								icon: 'flaticon-list',
								page: '/farm',
								translate: 'MENU.FARM',
								authorizations: ['ADMIN', 'FEEDING_FORMAN', 'FARM_MANAGER', 'OWNER_READ', 'ADMINISTRATIVE_MANAGER'],
							},
							{
								title: 'Fish Schools',
								desc: 'Fish schools operations',
								icon: 'fa fa-fish',
								page: '/fish-schools',
								translate: 'MENU.FISH_SCHOOLS',
								authorizations: ['ADMIN', 'FEEDING_FORMAN', 'FARM_MANAGER', 'OWNER_READ', 'ADMINISTRATIVE_MANAGER'],
							},
							{
								title: 'New',
								desc: 'New Fish school',
								icon: 'flaticon-bell',
								page: '/fs-new',
								translate: 'MENU.FISH_SCHOOLS_NEW',
								authorizations: ['ADMIN', 'FEEDING_FORMAN', 'FARM_MANAGER', 'OWNER_READ', 'ADMINISTRATIVE_MANAGER'],
							},
							{
								title: 'Toggle Status',
								desc: 'Fish schools toggle status',
								icon: 'flaticon-layers',
								page: '/fs-toggle-status',
								translate: 'MENU.FISH_SCHOOLS_TOGGLE_STATUS',
								authorizations: ['ADMIN', 'FEEDING_FORMAN', 'FARM_MANAGER', 'OWNER_READ', 'ADMINISTRATIVE_MANAGER'],
							},
							{
								title: 'Sold',
								desc: 'Sold Fish School',
								icon: 'flaticon-graph',
								page: '/sold-fs',
								translate: 'MENU.SOLD_FISH_SCHOOL',
								authorizations: ['ADMIN', 'FEEDING_FORMAN', 'FARM_MANAGER', 'OWNER_READ', 'ADMINISTRATIVE_MANAGER'],
							},
						]
					},
					{
						title: 'Food',
						icon: 'flaticon-tea-cup',
						root: true,
						submenu: [
							{
								title: 'Food Names',
								desc: 'Daily farm update',
								icon: 'flaticon-list',
								page: '/food-names',
								translate: 'MENU.FOOD_NAMES',
								authorizations: ['ADMIN', 'FEEDING_FORMAN', 'FARM_MANAGER', 'OWNER_READ', 'ADMINISTRATIVE_MANAGER'],
							},
							{
								title: 'Delivery Notes',
								desc: 'Food delivery-notes',
								icon: 'flaticon-lifebuoy',
								page: '/delivery-notes',
								translate: 'MENU.DELIVERY_NOTES',
								authorizations: ['ADMIN', 'FEEDING_FORMAN', 'FARM_MANAGER', 'OWNER_READ', 'ADMINISTRATIVE_MANAGER']
							},
						]
					},
				]
			}
		};
	}
}
