import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '../../../../layout/layout.module';
import { PartialsModule } from '../../../../partials/partials.module';
import { ListTimelineModule } from '../../../../partials/layout/quick-sidebar/list-timeline/list-timeline.module';
import { WidgetChartsModule } from '../../../../partials/content/widgets/charts/widget-charts.module';
import {DD_MM_YYYY_Format} from '../fish-schools/fish-schools.module';
import {
	DateAdapter,
	MAT_DATE_FORMATS,
	MAT_DIALOG_DEFAULT_OPTIONS, MatDatepickerModule,
	MatDialogModule,
	MatFormFieldModule, MatIconModule, MatIconRegistry,
	MatInputModule, MatSortModule, MatTableModule
} from '@angular/material';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {InterceptService} from '../../../../../core/services/intercept.service';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';
import {DailyFarmComponent} from './daily-farm.component';
import {FarmService} from '../../../../../core/services/farm/farm-schools.service';
import {FishSchoolsService} from '../../../../../core/services/fishschool/fish-schools.service';
import {NgbAlertConfig, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {ToastrModule} from 'ng6-toastr-notifications';
import {FishSchoolsAuthorizationService} from '../../../../../core/services/fishschool/fish-schools.authorization.service';
import {FsUrlsService} from '../../../../../core/services/fishschool/fs.urls';
import {CurrencyMaskModule} from 'ng2-currency-mask';
import {CurrencyMaskConfig, CURRENCY_MASK_CONFIG} from 'ng2-currency-mask/src/currency-mask.config';
import {AuthGuard} from '../../../../../core/services/fishschool/auth.guard';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
	// suppressScrollX: true
};

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
	align: 'right',
	allowNegative: false,
	decimal: '.',
	precision: 0,
	prefix: '',
	suffix: '',
	thousands: ','
};

@NgModule({
	imports: [
		CommonModule,
		HttpClientModule,
		LayoutModule,
		PartialsModule,
		ListTimelineModule,
		WidgetChartsModule,
		MatInputModule,
		MatFormFieldModule,
		FormsModule,
		MatDialogModule,
		MatTableModule,
		MatSortModule,
		MatDatepickerModule,
		MatIconModule,
		NgbAlertModule,
		ToastrModule.forRoot(),
		TranslateModule.forChild(),
		RouterModule.forChild([
			{
				path: '',
				component: DailyFarmComponent,
				// Source taken from here: https://jasonwatmore.com/post/2018/11/22/angular-7-role-based-authorization-tutorial-with-example]
				// canActivate: [AuthGuard],
				// data: { roles: ['ADMIN', 'FEEDING_FORMAN', 'FARM_MANAGER', 'OWNER_READ', 'ADMINISTRATIVE_MANAGER'] }
			}
		]),
		CurrencyMaskModule,
	],
	providers: [
		InterceptService,
		{provide: HTTP_INTERCEPTORS, useClass: InterceptService, multi: true},
		{provide: DateAdapter, useClass: MomentDateAdapter},
		{provide: MAT_DATE_FORMATS, useValue: DD_MM_YYYY_Format},
		{provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
		{provide: DateAdapter, useClass: MomentDateAdapter},
		{provide: MAT_DATE_FORMATS, useValue: DD_MM_YYYY_Format},
		NgbAlertConfig, {
			provide: PERFECT_SCROLLBAR_CONFIG,
			useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
		},
		MatIconRegistry,
		FishSchoolsAuthorizationService,
		FarmService,
		FishSchoolsService,
		FsUrlsService,
		{ provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig },
	],
	entryComponents: [
	],
	declarations: [
		DailyFarmComponent,
	]
})
export class DailyFarmModule {}
