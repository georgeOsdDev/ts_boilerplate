import { IItem } from "../interfaces/Item";

/**
 * class of Item
 *
 */
export default class Item {
  private _key: string;
  private _name: string;
  private _price: number;
  private _taxRate: number;
  /**
   * Constructor
   *
   * @param itemData
   */
  constructor(itemData: IItem) {
    this._key = itemData.key;
    this._name = itemData.name;
    this._price = itemData.price;
    this._taxRate = itemData.taxRate;
  }

  get key(): string {
    return this._key;
  }
  get name(): string {
    return this._name;
  }
  get price(): number {
    return this._price;
  }
  get taxIncludedPrice(): number {
    return this._price * (1 + this._taxRate);
  }
}
