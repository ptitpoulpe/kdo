export interface Gift {
    id: number;
    name: string;
    url?: string;
    price?: number;
    buy_price?: number;
    recipient: string;
    giver?: string;
  }

export class Page<ClassType> {
    items: ClassType[] = [];
    total: number = 0;
    page: number = 0;
    size: number = 0;
  }