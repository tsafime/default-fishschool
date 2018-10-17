import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FishSchoolsComponent } from './fish-schools.component';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '../../../layout/layout.module';
import { PartialsModule } from '../../../partials/partials.module';
import { ListTimelineModule } from '../../../partials/layout/quick-sidebar/list-timeline/list-timeline.module';
import { WidgetChartsModule } from '../../../partials/content/widgets/charts/widget-charts.module';
import {
	DateAdapter,
	MAT_BOTTOM_SHEET_DATA, MAT_DATE_FORMATS, MAT_DATE_LOCALE,
	MatAutocompleteModule, MatBottomSheetModule,
	MatBottomSheetRef, MatButtonModule,
	MatButtonToggleModule,
	MatCardModule, MatChipsModule, MatDividerModule, MatExpansionModule, MatFormFieldControl, MatFormFieldModule,
	MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule,
	MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule,
	MatSelectModule, MatSidenavModule, MatSliderModule, MatSnackBarModule, MatSortModule, MatStepperModule, MatTableModule, MatTabsModule,
	MatToolbarModule,
	MatTooltipModule, MatTreeModule
} from '@angular/material';

import {IconComponent} from '../material/buttons-and-indicators/icon/icon.component';
import {CardComponent} from '../material/layout/card/card.component';
import {ProgressBarComponent} from '../material/buttons-and-indicators/progress-bar/progress-bar.component';
import {ToolbarComponent} from '../material/navigation/toolbar/toolbar.component';
import {CheckboxComponent} from '../material/formcontrols/checkbox/checkbox.component';
import {DatepickerComponent} from '../material/formcontrols/datepicker/datepicker.component';
import {FormfieldComponent} from '../material/formcontrols/formfield/formfield.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {BottomSheetComponent} from '../material/popups-and-modals/bottom-sheet/bottom-sheet.component';
import {DialogComponent, Modal2Component, Modal3Component, ModalComponent} from '../material/popups-and-modals/dialog/dialog.component';
import {InputComponent} from '../material/formcontrols/input/input.component';
import {CoreModule} from '../../../../core/core.module';
import {RadiobuttonComponent} from '../material/formcontrols/radiobutton/radiobutton.component';
import {SlidertoggleComponent} from '../material/formcontrols/slidertoggle/slidertoggle.component';
import {PaginatorComponent} from '../material/data-table/paginator/paginator.component';
import {SnackbarComponent} from '../material/popups-and-modals/snackbar/snackbar.component';
import {StepperComponent} from '../material/layout/stepper/stepper.component';
import {TreeComponent} from '../material/layout/tree/tree.component';
import {GridListComponent} from '../material/layout/grid-list/grid-list.component';
import {DefaultFormsComponent} from '../material/layout/default-forms/default-forms.component';
import {ExpansionPanelComponent} from '../material/layout/expansion-panel/expansion-panel.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MaterialTooltipComponent} from '../material/popups-and-modals/material-tooltip/material-tooltip.component';
import {ListComponent} from '../material/layout/list/list.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MaterialPreviewModule} from '../../../partials/content/general/material-preview/material-preivew.module';
import {ButtonComponent} from '../material/buttons-and-indicators/button/button.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PizzaPartyComponent} from '../material/popups-and-modals/snackbar/pizza-party.component';
import {MaterialComponent} from '../material/material.component';
import {SliderComponent} from '../material/formcontrols/slider/slider.component';
import {MaterialTabsComponent} from '../material/layout/material-tabs/material-tabs.component';
import {DividerComponent} from '../material/layout/divider/divider.component';
import {MaterialTableComponent} from '../material/data-table/material-table/material-table.component';
import {ButtonToggleComponent} from '../material/buttons-and-indicators/button-toggle/button-toggle.component';
import {MatIconRegistry} from '@angular/material/icon';
import {SidenavComponent} from '../material/navigation/sidenav/sidenav.component';
import {CodePreviewModule} from '../../../partials/content/general/code-preview/code-preview.module';
import {AutocompleteComponent} from '../material/formcontrols/autocomplete/autocomplete.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {ChipsComponent} from '../material/buttons-and-indicators/chips/chips.component';
import {SelectComponent} from '../material/formcontrols/select/select.component';
import {MenuComponent} from '../material/navigation/menu/menu.component';
import {ProgressSpinnerComponent} from '../material/buttons-and-indicators/progress-spinner/progress-spinner.component';
import {BottomSheetExampleComponent} from '../material/popups-and-modals/bottom-sheet/bottom-sheet-example/bottom-sheet-example.component';
import {SortHeaderComponent} from '../material/data-table/sort-header/sort-header.component';
import {FishSchoolsService} from '../../../../core/services/fish-schools.service';
import {InterceptService} from '../apps/e-commerce/_core/utils/intercept.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TranslateModule} from '@ngx-translate/core';
import {SpinnerButtonModule} from '../../../partials/content/general/spinner-button/spinner-button.module';
import {MomentDateAdapter} from '@angular/material-moment-adapter';

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
		// material modules
		MatInputModule,
		MatFormFieldModule,
		MatDatepickerModule,
		MatAutocompleteModule,
		MatListModule,
		MatSliderModule,
		MatCardModule,
		MatSelectModule,
		MatButtonModule,
		MatIconModule,
		MatNativeDateModule,
		MatSlideToggleModule,
		MatCheckboxModule,
		MatMenuModule,
		MatTabsModule,
		MatTooltipModule,
		MatSidenavModule,
		MatProgressBarModule,
		MatProgressSpinnerModule,
		MatSnackBarModule,
		MatTableModule,
		MatGridListModule,
		MatToolbarModule,
		MatBottomSheetModule,
		MatExpansionModule,
		MatDividerModule,
		MatSortModule,
		MatStepperModule,
		MatChipsModule,
		MatPaginatorModule,
		MatDialogModule,
		CoreModule,
		CommonModule,
		MatRadioModule,
		MatTreeModule,
		MatButtonToggleModule,
		PartialsModule,
		MaterialPreviewModule,
		FormsModule,
		ReactiveFormsModule,
		CodePreviewModule,
		LayoutModule,
		ListTimelineModule,
		WidgetChartsModule,
		TranslateModule.forChild(),
		SpinnerButtonModule,
		RouterModule.forChild([
			{
				path: '',
				component: FishSchoolsComponent
			}
		]),
	],
	exports: [RouterModule],
	entryComponents: [
		PizzaPartyComponent,
		DialogComponent,
		ModalComponent,
		Modal2Component,
		Modal3Component,
		IconComponent,
		TreeComponent,
		BottomSheetExampleComponent,
	],
	providers: [
		MatIconRegistry,
		{ provide: MatBottomSheetRef, useValue: {} },
		{ provide: MAT_BOTTOM_SHEET_DATA, useValue: {} },
		InterceptService,
		{ provide: HTTP_INTERCEPTORS, useClass: InterceptService, multi: true},
		FishSchoolsService,
		{ provide: DateAdapter, useClass: MomentDateAdapter },
		{ provide: MAT_DATE_FORMATS, useValue: DD_MM_YYYY_Format },
	],
	declarations: [
		MaterialComponent,
		AutocompleteComponent,
		CheckboxComponent,
		DatepickerComponent,
		FormfieldComponent,
		InputComponent,
		RadiobuttonComponent,
		SelectComponent,
		SliderComponent,
		SlidertoggleComponent,
		MenuComponent,
		SidenavComponent,
		ToolbarComponent,
		CardComponent,
		DividerComponent,
		ExpansionPanelComponent,
		GridListComponent,
		ListComponent,
		MaterialTabsComponent,
		StepperComponent,
		ButtonComponent,
		ButtonToggleComponent,
		ChipsComponent,
		IconComponent,
		ProgressBarComponent,
		ProgressSpinnerComponent,
		DialogComponent,
		ModalComponent,
		Modal2Component,
		Modal3Component,
		PizzaPartyComponent,
		SnackbarComponent,
		MaterialTooltipComponent,
		PaginatorComponent,
		SortHeaderComponent,
		MaterialTableComponent,
		DefaultFormsComponent,
		TreeComponent,
		BottomSheetComponent,
		BottomSheetExampleComponent,
		FishSchoolsComponent,
	]
})

export class FishSchoolsModule {}
