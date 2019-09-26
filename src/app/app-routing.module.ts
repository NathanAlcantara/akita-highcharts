import { Component, Injectable, NgModule } from '@angular/core';
import { Resolve, RouterModule, Routes } from '@angular/router';
import { VacancyService } from './dashboard/vacancyTotalEntity';

@Injectable()
export class ValueResolver implements Resolve<any> {
  constructor(private readonly vacancyService: VacancyService) { }

  resolve() {
    return this.vacancyService.get();
  }
}

@Component({
  template: `
		<router-outlet></router-outlet>
	`
})
export class EmptyComponent { }

const routes: Routes = [
  {
    path: "",
    component: EmptyComponent,
    resolve: {
      values: ValueResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    ValueResolver
  ],
  declarations: [
    EmptyComponent
  ]
})
export class AppRoutingModule { }
