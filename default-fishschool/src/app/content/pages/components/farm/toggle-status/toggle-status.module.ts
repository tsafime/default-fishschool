import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {
	DateAdapter,
	MAT_DATE_FORMATS, MatButtonToggleModule, MatCardModule, MatDatepickerModule,
	MatExpansionModule,
	MatFormFieldModule,
	MatIconModule,
	MatIconRegistry, MatInputModule,
	MatOptionModule, MatProgressSpinnerModule, MatSelectModule, MatSlideToggleModule, MatSortModule, MatTableModule
} from '@angular/material';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {NgbAlertConfig, NgbAlertModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {PartialsModule} from '../../../../partials/partials.module';
import {MaterialPreviewModule} from '../../../../partials/content/general/material-preview/material-preivew.module';
import {TranslateModule} from '@ngx-translate/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InterceptService} from '../../../../../core/services/intercept.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FishSchoolsService} from '../../../../../core/services/fishschool/fish-schools.service';
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {FishSchoolsAuthorizationService} from '../../../../../core/services/fishschool/fish-schools.authorization.service';
import {FoodService} from '../../../../../core/services/fishschool/food.service';
import {ToastrModule} from 'ng6-toastr-notifications';
import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';
import {NgSelectModule} from '@ng-select/ng-select';
import {FsUrlsService} from '../../../../../core/services/fishschool/fs.urls';
import {ToggleStatusComponent} from './toggle-status.component';

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
		ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
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
		RouterModule.forChild([
			{
				path: '',
				component: ToggleStatusComponent
			}
		]),
		NgSelectModule,
		NgxMatSelectSearchModule,
		MatCardModule,
		MatProgressSpinnerModule,
	],
	exports: [
		RouterModule,
	],
	entryComponents: [],
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
		FishSchoolsService,
		FishSchoolsAuthorizationService,
		FoodService,
		FsUrlsService,
	],
	declarations: [
		ToggleStatusComponent,
	]
})

export class FishSchoolsToggleStatusModule {
}
