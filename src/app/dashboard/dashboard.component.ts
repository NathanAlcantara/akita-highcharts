import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Order } from '@datorama/akita';
import * as Highcharts from "highcharts";
import { VacancyTotal } from './vacancyTotalEntity';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnChanges {
  @Input() vacancies: VacancyTotal[];
  @Output() lastYear = new EventEmitter();
  @Output() lastSemester = new EventEmitter();
  @Output() lastTrimester = new EventEmitter();
  @Output() reverseOrder = new EventEmitter();
  @Output() reverseYear = new EventEmitter();
  @Output() randomOrder = new EventEmitter();

  chart: Highcharts.Chart;

  ngOnInit() {
    this.chart = Highcharts.chart('container', {
      title: {
        text: null
      },
      credits: {
        enabled: false
      },
      responsive: {
        rules: [{
          condition: {
            minWidth: 100,
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom'
            }
          }
        }]
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.vacancies.firstChange) {
      this.mountChart(changes.vacancies.currentValue)
    }
  }

  changeSeries(range: string, only?: boolean) {
    switch (range) {
      case 'random':
        this.randomOrder.emit(only);
        break;
      case 'reverse':
        this.reverseOrder.emit({ limit: this.vacancies.length, order: Order.DESC });
        break;
      case 'trimester':
        this.lastTrimester.emit(true);
        break;
      case 'semester':
        this.lastSemester.emit(true);
        break
      case 'reverseYear':
        this.reverseYear.emit(true);
        break;
      case 'year':
      default:
        this.lastYear.emit(true);
        break;
    }
  }

  private mountChart(values: VacancyTotal[]): void {
    const options: Highcharts.Options = {
      xAxis: {
        categories: values.map(item => item.month)
      },
      yAxis: {
        title: {
          text: null
        },
      },

      series: [
        {
          name: "Concluidas",
          data: values.map(item => item.closed),
          type: 'line'
        },
        {
          name: "Abertas",
          data: values.map(item => item.opened),
          type: 'line'
        },
        {
          name: "Canceladas",
          data: values.map(item => item.canceled),
          type: 'line'
        },
        {
          name: "Saldo",
          data: values.map(item => item.balance),
          type: 'line'
        }
      ],
    }
    this.chart.update(options, true, true, true)
  }
}
