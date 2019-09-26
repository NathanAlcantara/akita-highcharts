import { Order } from '@datorama/akita';

export function sortDate(order?: Order) {
  return (a, b) => {
    let grater: number;
    let lower: number;

    switch (order) {
      case Order.DESC:
        grater = -1;
        lower = 1;
        break;
      case Order.ASC:
      default:
        grater = 1;
        lower = -1;
        break;
    }

    const months = {
      Jan: 1,
      Feb: 2,
      Mar: 3,
      Apr: 4,
      May: 5,
      Jun: 6,
      Jul: 7,
      Aug: 8,
      Sep: 9,
      Oct: 10,
      Nov: 11,
      Dec: 12
    }

    const [m1, y1] = a.month.split("/")
    const [m2, y2] = b.month.split("/")

    if (Number(y1) > Number(y2)) {
      return grater;
    } else if (Number(y1) < Number(y2)) {
      return lower;
    } else {
      if (months[m1] > months[m2]) {
        return grater;
      } else if (months[m1] < months[m2]) {
        return lower;
      }
    }

    return 0;
  }
}
