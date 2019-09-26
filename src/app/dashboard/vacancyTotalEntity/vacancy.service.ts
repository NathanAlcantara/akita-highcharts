import { Injectable } from '@angular/core';
import { VacancyStore } from './vacancy.store';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { VacancyTotal } from './vacancy.model';

@Injectable({ providedIn: 'root' })
export class VacancyService {

  constructor(private vacancyStore: VacancyStore,
    private http: HttpClient) {
  }

  get() {
    return this.http.get('assets/result.json').pipe(tap((entities: any) => {
      const vacancies = entities.vacancies;

      const months = vacancies.map((vacancy: VacancyTotal) => vacancy.month);

      let obj;

      vacancies.forEach((vacancy: VacancyTotal) => {
        obj = { ...obj, ...{ [vacancy.month]: vacancy } }
      });

      this.vacancyStore.set({ ids: months, entities: obj })
    }));
  }
}
