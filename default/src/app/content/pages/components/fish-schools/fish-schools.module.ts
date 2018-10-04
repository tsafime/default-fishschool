import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FishSchoolsComponent } from './fish-schools.component';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '../../../layout/layout.module';
import { PartialsModule } from '../../../partials/partials.module';
import { ListTimelineModule } from '../../../partials/layout/quick-sidebar/list-timeline/list-timeline.module';
import { WidgetChartsModule } from '../../../partials/content/widgets/charts/widget-charts.module';

@NgModule({
	imports: [
		CommonModule,
		LayoutModule,
		PartialsModule,
		ListTimelineModule,
		WidgetChartsModule,
		RouterModule.forChild([
			{
				path: '',
				component: FishSchoolsComponent
			}
		])
	],
	providers: [],
	declarations: [FishSchoolsComponent]
})
export class FishSchoolsModule {}
