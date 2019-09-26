import { Component, OnInit } from '@angular/core';
import { akitaDevtools } from '@datorama/akita';
import { Observable } from 'rxjs';
import { sortDate } from 'src/utils/utils';
import { VacancyQuery, VacancyState } from './dashboard/vacancyTotalEntity';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'akita';
  values$: Observable<VacancyState>;

  constructor(private readonly vacancyQuery: VacancyQuery) { }

  get loadingState$() {
    return this.vacancyQuery.selectLoading();
  }

  ngOnInit() {
    akitaDevtools();
    this.changeValueAll();
  }

  randomOrder(only: boolean) {
    if (only) {
      this.values$ = this.vacancyQuery.randomYear$;
    } else {
      this.values$ = this.vacancyQuery.selectAll({ sortBy: () => Math.random() - 0.5 });
    }
  }

  changeOrder({ limit, order }) {
    this.values$ = this.vacancyQuery.selectAll({ limitTo: limit, sortBy: sortDate(order) });
  }

  changeOrderYear() {
    this.values$ = this.vacancyQuery.reverseYear$;
  }

  changeValueTrimester() {
    this.values$ = this.vacancyQuery.lastTrimester$;
  }

  changeValueSemester() {
    this.values$ = this.vacancyQuery.lastSemester$;
  }

  changeValueAll() {
    this.values$ = this.vacancyQuery.selectAll();
  }
}
