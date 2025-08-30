import { IProduct } from "../../../types";

export class Cart {
  protected cartItems: Set<IProduct>;

  constructor() {
    this.cartItems = new Set();
  }

  public addProduct(product: IProduct): void {
    this.cartItems.add(product);
  }

  public deleteProduct(product: IProduct): void {
    this.cartItems.delete(product);
  }

  public clearCart(): void {
    this.cartItems.clear();
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