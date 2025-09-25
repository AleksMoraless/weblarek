import { IElementsList } from "../../types";
import { eventsList } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { EventEmitter } from "../base/Events";

export class CartView extends Component<IElementsList> {
  protected cartButtonOrder: HTMLButtonElement;
  protected totalPrice: HTMLElement;
  protected cartContainer: HTMLElement;
  protected placer: HTMLElement;


  constructor(container: HTMLElement, protected events: EventEmitter) {
    super(container);

    this.cartButtonOrder = ensureElement('.basket__button', this.container) as HTMLButtonElement;
    this.totalPrice = ensureElement('.basket__price', this.container);
    this.cartContainer = ensureElement('.basket__list', this.container);

    this.placer = document.createElement('p');
    this.setText(this.placer, 'Корзина пуста')
    this.placer.style.opacity = 30 + '%';
    this.placer.style.fontSize = 30 + 'px';

    this.cartButtonOrder.addEventListener('click', () => {
      this.events.emit(eventsList["form:order"]);
    })
  }

  setTotalPrice(value: number): void {
    this.setText(this.totalPrice, `${value} синапсов`);
  }

  setDisableCartButtonOrder(value: boolean): void {
    this.cartButtonOrder.disabled = value;
  }

  getPlacer(): HTMLElement {
    return this.placer;
  }

  set elementsList(cartProducts: HTMLElement[]) {
    this.cartContainer.replaceChildren(...cartProducts);
  }
}