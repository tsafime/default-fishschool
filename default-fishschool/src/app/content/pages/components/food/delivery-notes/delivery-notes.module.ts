import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
	DateAdapter,
	MAT_DATE_FORMATS, MatButtonModule, MatButtonToggleModule, MatCardModule, MatDatepickerModule, MatDialogModule,
	MatExpansionModule,
	MatFormFieldModule,
	MatIconModule,
	MatIconRegistry, MatInputModule,
	MatOptionModule, MatProgressSpinnerModule, MatSelectModule, MatSlideToggleModule, MatSortModule, MatTableModule
} from '@angular/material';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {NgbAlertConfig, NgbAlertModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TranslateModule} from '@ngx-translate/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {NgxPermissionsGuard} from 'ngx-permissions';
import {PartialsModule} from '../../../../partials/partials.module';
import {MaterialPreviewModule} from '../../../../partials/content/general/material-preview/material-preivew.module';
import {InterceptService} from '../../../../../core/services/intercept.service';
import {FishSchoolsAuthorizationService} from '../../../../../core/services/fishschool/fish-schools.authorization.service';
import {DeliveryNotesComponent} from './delivery-notes.component';
import {FoodService} from '../../../../../core/services/fishschool/food.service';
import {ToastrModule} from 'ng6-toastr-notifications';
import {ReloadTableDataService} from '../../../../../core/services/fishschool/reload-table-data.service';
import {DeliveryNotesTableComponent} from './table/delivery-notes.table.component';
import {FsUrlsService} from '../../../../../core/services/fishschool/fs.urls';
import {DeliveryNotesService} from '../../../../../core/services/fishschool/delivery-notes.service';
import {NgSelectModule} from '@ng-select/ng-select';
import {ConfirmDeleteDeliveryNotesDialogComponent} from './table/confirm-delete/confirm-delete.delivery.notes.dialog.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
	// suppressScrollX: true
};

export const DD_MM_YYYY_Format = {
	parse: {
		dateInput: 'DD/MM/YYYY',
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
		component: DeliveryNotesComponent,
	},
];

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
		NgSelectModule,
		MatCardModule,
		MatProgressSpinnerModule,
		MatDialogModule,
		MatButtonModule,
	],
	exports: [
		RouterModule,
	],
	entryComponents: [ConfirmDeleteDeliveryNotesDialogComponent],
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
		ReloadTableDataService,
		FsUrlsService,
		DeliveryNotesService,
	],
	declarations: [
		DeliveryNotesComponent,
		DeliveryNotesTableComponent,
		ConfirmDeleteDeliveryNotesDialogComponent,
	]
})

export class DeliveryNotesModule {
}
