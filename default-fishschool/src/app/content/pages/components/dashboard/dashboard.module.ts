import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '../../../layout/layout.module';
import { PartialsModule } from '../../../partials/partials.module';
import { ListTimelineModule } from '../../../partials/layout/quick-sidebar/list-timeline/list-timeline.module';
import { WidgetChartsModule } from '../../../partials/content/widgets/charts/widget-charts.module';
import {SchoolsSummaryService} from '../../../../core/services/fishschool/summary/schools.summary.service';
import {DD_MM_YYYY_Format} from '../fish-schools/fish-schools.module';
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
import {InterceptService} from '../../../../core/services/intercept.service';
import {TranslateModule} from '@ngx-translate/core';
import {SchoolsSummaryComponent} from './summary/schools.summary.component';
import {SchoolsSummaryDetailsComponent} from './summary/details/schools.summary.details.component';
import {FormsModule} from '@angular/forms';
import {ToastrModule} from 'ng6-toastr-notifications';

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
		ToastrModule.forRoot(),
		TranslateModule.forChild(),
		RouterModule.forChild([
			{
				path: '',
				component: DashboardComponent
			}
		])
	],
	providers: [
		InterceptService,
		{provide: HTTP_INTERCEPTORS, useClass: InterceptService, multi: true},
		{provide: DateAdapter, useClass: MomentDateAdapter},
		{provide: MAT_DATE_FORMATS, useValue: DD_MM_YYYY_Format},
		SchoolsSummaryService,
		{provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
		{provide: DateAdapter, useClass: MomentDateAdapter},
		{provide: MAT_DATE_FORMATS, useValue: DD_MM_YYYY_Format},
		MatIconRegistry,
	],
	entryComponents: [
		SchoolsSummaryDetailsComponent
	],
	declarations: [
		DashboardComponent,
		SchoolsSummaryComponent,
		SchoolsSummaryDetailsComponent,
	]
})
export class DashboardModule {}
