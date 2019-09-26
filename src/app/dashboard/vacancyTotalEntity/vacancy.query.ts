import { Injectable } from '@angular/core';
import { QueryEntity, Order, QueryConfig } from '@datorama/akita';
import { VacancyState, VacancyStore } from './vacancy.store';
import { sortDate } from 'src/utils/utils';

@Injectable({ providedIn: 'root' })
@QueryConfig({
  sortBy: sortDate(Order.ASC)
})
export class VacancyQuery extends QueryEntity<VacancyState> {
  lastSemester$ = this.selectAll({ filterBy: (entity, index) => index >= 6 });
  lastTrimester$ = this.selectAll({ filterBy: (entity, index) => index >= 9 });
  reverseYear$ = this.selectAll({ sortBy: sortDate(Order.DESC) });
  randomYear$ = this.selectAll({ sortBy: () => Math.random() - 0.5 })

  constructor(protected store: VacancyStore) {
    super(store);
  }

}
