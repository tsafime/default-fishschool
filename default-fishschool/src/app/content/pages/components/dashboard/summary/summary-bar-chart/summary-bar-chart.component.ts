import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {SummaryModel} from '../../../../../../core/models/fishschool/summary/summary.model';
import {SummaryBarChartService} from '../../../../../../core/services/dashboard/summary-bar-chart.service';
import {Color} from 'ng2-charts';

@Component({
	selector: 'm-summary-bar-chart',
	templateUrl: './summary-bar-chart.component.html',
	styleUrls: ['./summary-bar-chart.component.scss']
})
export class SummaryBarChartComponent implements OnInit {

	public schoolsSummary: SummaryModel ;
	public barChartOptions: any = {
		scaleShowVerticalLines: false,
		responsive: true,
		scales: {
			yAxes: [{
				ticks: {
					beginAtZero : true,
					min: 0,
					max: 5000
				},
			}],
			xAxes: [{
				ticks: {
					beginAtZero : true,
					min: 0,
				},
			}]
		}
	};

	public barChartLabels: Array<string> = [];
	public barChartType: string = 'bar';
	public barChartLegend: boolean = false;
	public barChartData: Array<any> = [];
	public barChartColors: Color[] = [
		{ backgroundColor: 'red' },
		{ backgroundColor: 'green' },
		{ backgroundColor: 'blue' },
		{ backgroundColor: 'orange' },
		{ backgroundColor: 'magenta' },
		{ backgroundColor: 'purple' },
		{ backgroundColor: 'yellow' },
		{ backgroundColor: 'pink' },
		{ backgroundColor: 'light blue' },
		{ backgroundColor: 'light green' },
	];

	constructor (private summaryBarChartService: SummaryBarChartService, private changeDetector: ChangeDetectorRef) {
	}

	ngOnInit () {
		this.summaryBarChartService.change.subscribe(data => {
			this.schoolsSummary = data;
			this.view();
		});

		this.view();
	}

	view() {
		const data: Array<any> = [ ];
		this.barChartLabels = [ ];

		if (this.schoolsSummary && this.schoolsSummary.feedTypes) {
			this.schoolsSummary.feedTypes.forEach((pair, index) => {
				this.barChartLabels.push(pair.key);
				data.push(pair.value / 1000);
			});
		}

		this.barChartData.push({ data: data, label: this.barChartLabels });

		if (!this.changeDetector['destroyed']) {
			this.changeDetector.detectChanges();
		}
	}

	// events
	chartClicked (e: any): void {
	}

	chartHovered (e: any): void {
	}
}
