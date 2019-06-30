import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '../../../layout/layout.module';
import { PartialsModule } from '../../../partials/partials.module';
import { ListTimelineModule } from '../../../partials/layout/quick-sidebar/list-timeline/list-timeline.module';
import { WidgetChartsModule } from '../../../partials/content/widgets/charts/widget-charts.module';
import {
	MatDialogModule,
	MatFormFieldModule, MatIconModule, MatIconRegistry,
	MatInputModule, MatSortModule, MatTableModule
} from '@angular/material';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {InterceptService} from '../../../../core/services/intercept.service';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';
import {ToastrModule} from 'ng6-toastr-notifications';
import {FsUrlsService} from '../../../../core/services/fishschool/fs.urls';
import {AuthorizationComponent} from './authorization.component';
import {AuthorizationService} from '../../../../core/services/fishschool/authorization.service';

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
		MatIconModule,
		ToastrModule.forRoot(),
		TranslateModule.forChild(),
		RouterModule.forChild([
			{
				path: '',
				component: AuthorizationComponent
			}
		]),
	],
	providers: [
		InterceptService,
		{provide: HTTP_INTERCEPTORS, useClass: InterceptService, multi: true},
		MatIconRegistry,
		FsUrlsService,
		AuthorizationService,
	],
	entryComponents: [
	],
	declarations: [
		AuthorizationComponent,
	]
})
export class AuthorizationModule {}
