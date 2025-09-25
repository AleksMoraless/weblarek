import { IProduct } from "../../../types";
import { eventsList } from "../../../utils/constants";
import { IEvents } from "../Events";

export class Cart {
  protected cartItems: Set<IProduct> = new Set();

  constructor(protected events: IEvents) { }

  public addProduct(product: IProduct): void {
    this.cartItems.add(product);
    this.events.emit(eventsList["cart:changed"]);
  }

  public deleteProduct(product: IProduct): void {
    this.cartItems.delete(product);
    this.events.emit(eventsList["cart:changed"]);
  }

  public clearCart(): void {
    this.cartItems.clear();
    this.events.emit(eventsList["cart:changed"]);
  }

  public getQuantityCartItems(): number {
    return this.cartItems.size;
  }

  public getCartItems(): IProduct[] {
    return Array.from(this.cartItems);
  }

  public getTotalPrice(): number {
    return Array.from(this.cartItems).reduce((sum, item) => {
      item.price ? sum += item.price : null;
      return sum;
    }, 0)
  }

  public cartHasProduct(product: IProduct): boolean {
    return this.cartItems.has(product);
  }
}