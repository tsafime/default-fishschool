import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { ErrorPageComponent } from './snippets/error-page/error-page.component';

const routes: Routes = [
	{
		path: '',
		component: PagesComponent,
		canActivate: [NgxPermissionsGuard],
		data: {
			permissions: {
				only: ['ADMIN', 'FEEDING_FORMAN', 'FARM_MANAGER', 'OWNER_READ', 'ADMINISTRATIVE_MANAGER'],
				except: ['GUEST'],
				redirectTo: '/login'
			}
		},
		children: [
			{
				path: '',
				loadChildren: './components/dashboard/dashboard.module#DashboardModule'
			},
			{
				path: 'fish-schools',
				loadChildren: './components/farm/fish-schools/fish-schools.module#FishSchoolsModule'
			},
			{
				path: 'farm',
				loadChildren: './components/farm/daily/daily-farm.module#DailyFarmModule'
			},
			{
				path: 'fs-new',
				loadChildren: './components/farm/new-school/new-school.module#FishSchoolsNewSchoolModule'
			},
			{
				path: 'fs-toggle-status',
				loadChildren: './components/farm/toggle-status/toggle-status.module#FishSchoolsToggleStatusModule'
			},
			{
				path: 'sold-fs',
				loadChildren: './components/farm/sold-fish-school/sold-fish-school.module#SoldFishSchoolModule'
			},
			{
				path: 'food-names',
				loadChildren: './components/food/food-names/food-names.module#FoodNamesModule'
			},
			{
				path: 'delivery-notes',
				loadChildren: './components/food/delivery-notes/delivery-notes.module#DeliveryNotesModule'
			},
		]
	},
	{
		path: 'login',
		canActivate: [NgxPermissionsGuard],
		loadChildren: './auth/auth.module#AuthModule',
		data: {
			permissions: {
				except: ['ADMIN', 'FEEDING_FORMAN', 'FARM_MANAGER', 'OWNER_READ', 'ADMINISTRATIVE_MANAGER']
			}
		},
	},
	{
		path: '404',
		component: ErrorPageComponent
	},
	{
		path: 'error/:type',
		component: ErrorPageComponent
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class PagesRoutingModule {
}
