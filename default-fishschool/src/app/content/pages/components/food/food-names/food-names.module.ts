import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
	DateAdapter,
	MAT_DATE_FORMATS, MatButtonModule, MatButtonToggleModule, MatDatepickerModule, MatDialogModule,
	MatExpansionModule,
	MatFormFieldModule,
	MatIconModule,
	MatIconRegistry, MatInputModule,
	MatOptionModule, MatSelectModule, MatSlideToggleModule, MatSortModule, MatTableModule
} from '@angular/material';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {NgbAlertConfig, NgbAlertModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TranslateModule} from '@ngx-translate/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {FoodNamesComponent} from './food-names.component';
import {PartialsModule} from '../../../../partials/partials.module';
import {MaterialPreviewModule} from '../../../../partials/content/general/material-preview/material-preivew.module';
import {InterceptService} from '../../../../../core/services/intercept.service';
import {FishSchoolsAuthorizationService} from '../../../../../core/services/fishschool/fish-schools.authorization.service';
import {FoodService} from '../../../../../core/services/fishschool/food.service';
import {ToastrModule} from 'ng6-toastr-notifications';
import {FsUrlsService} from '../../../../../core/services/fishschool/fs.urls';
import {ConfirmDeleteFoodDialogComponent} from './confirm-delete/confirm-delete.food.dialog.component';
import {CurrencyMaskModule} from 'ng2-currency-mask';
import {CurrencyMaskConfig, CURRENCY_MASK_CONFIG} from 'ng2-currency-mask/src/currency-mask.config';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
	// suppressScrollX: true
};

export const DD_MM_YYYY_Format = {
	parse: {
		dateInput: 'DD-MM-YYYY',
	},
	display: {
		dateInput: 'DD/MM/YYYY',
		monthYearLabel: 'MMM YYYY',
		dateA11yLabel: 'LL',
		monthYearA11yLabel: 'MMMM YYYY',
	},
};

const routes: Routes = [
	{
		path: '',
		component: FoodNamesComponent,
	},
];

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
		NgbModule,
		NgbAlertModule,
		PartialsModule,
		MatInputModule,
		MatFormFieldModule,
		FormsModule,
		ReactiveFormsModule,
		MaterialPreviewModule,
		MatIconModule,
		MatExpansionModule,
		MatOptionModule,
		MatSelectModule,
		MatSlideToggleModule,
		MatButtonToggleModule,
		MatDatepickerModule,
		MatTableModule,
		MatSortModule,
		ToastrModule.forRoot(),
		TranslateModule.forChild(),
		RouterModule.forChild(routes),
		MatDialogModule,
		MatButtonModule,
		CurrencyMaskModule,
	],
	exports: [
		RouterModule,
	],
	entryComponents: [ConfirmDeleteFoodDialogComponent],
	providers: [
		InterceptService,
		{provide: HTTP_INTERCEPTORS, useClass: InterceptService, multi: true},
		{provide: DateAdapter, useClass: MomentDateAdapter},
		{provide: MAT_DATE_FORMATS, useValue: DD_MM_YYYY_Format},
		MatIconRegistry,
		NgbAlertConfig, {
			provide: PERFECT_SCROLLBAR_CONFIG,
			useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
		},
		FishSchoolsAuthorizationService,
		FoodService,
		FsUrlsService,
		{ provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }
	],
	declarations: [
		FoodNamesComponent,
		ConfirmDeleteFoodDialogComponent,
	]
})

export class FoodNamesModule {
}
