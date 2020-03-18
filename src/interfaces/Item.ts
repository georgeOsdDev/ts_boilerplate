export interface IItem {
  key: string;
  name: string;
  price: number;
  taxRate: number;
}

export default interface IGetItemsResponse {
  items: IItem[];
}
