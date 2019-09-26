export interface VacancyTotal {
  month: string,
  closed: number,
  canceled: number,
  opened: number,
  balance: number
}

export function createVacancy(params: Partial<VacancyTotal>) {
  return params as VacancyTotal;
}
