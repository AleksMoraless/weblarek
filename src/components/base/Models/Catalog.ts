import { IProduct } from "../../../types";
import { eventsList } from "../../../utils/constants";
import { IEvents } from "../Events";

export class Catalog {
  protected products: IProduct[] = []
  protected pickedProduct: null | IProduct = null

  constructor(protected events: IEvents) { }

  public getProducts(): IProduct[] {
    return this.products;
  }

  public setProducts(products: IProduct[]): void {
    this.products = products;
    this.events.emit(eventsList["products:changed"]);
  }

  public getProductByID(id: string): IProduct | null {
    return this.products.find(item => item.id === id) ?? null
  }

  public getPickedProduct(): IProduct | null {
    return this.pickedProduct;
  }

  public setPickedProduct(id: string): void {
    this.pickedProduct = this.getProductByID(id) ?? null;
    this.events.emit('product:setted');
  }
}