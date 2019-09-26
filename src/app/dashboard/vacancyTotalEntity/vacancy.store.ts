import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { VacancyTotal } from './vacancy.model';

export interface VacancyState extends EntityState<VacancyTotal> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'vacancy', idKey: 'month' })
export class VacancyStore extends EntityStore<VacancyState> {

  constructor() {
    super();
  }

}

