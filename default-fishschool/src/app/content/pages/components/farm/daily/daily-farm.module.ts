import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '../../../../layout/layout.module';
import { PartialsModule } from '../../../../partials/partials.module';
import { ListTimelineModule } from '../../../../partials/layout/quick-sidebar/list-timeline/list-timeline.module';
import { WidgetChartsModule } from '../../../../partials/content/widgets/charts/widget-charts.module';
import {DD_MM_YYYY_Format, FishSchoolsModule} from '../../fish-schools/fish-schools.module';
import {
	DateAdapter,
	MAT_DATE_FORMATS,
	MAT_DIALOG_DEFAULT_OPTIONS, MatDatepickerModule, MatDialog,
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

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
	// suppressScrollX: true
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
				component: DailyFarmComponent
			}
		])
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
	],
	entryComponents: [
	],
	declarations: [
		DailyFarmComponent,
	]
})
export class DailyFarmModule {}
