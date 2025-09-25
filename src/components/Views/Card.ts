import { IProduct, IProductCart } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { EventEmitter } from "../base/Events";


export class Card extends Component<IProduct | IProductCart> {
  protected cardTitle: HTMLElement;
  protected cardPrice: HTMLElement;
  protected productId: string = '';

  constructor(container: HTMLElement, protected events: EventEmitter) {
    super(container);
    this.cardTitle = ensureElement('.card__title', this.container);
    this.cardPrice = ensureElement('.card__price', this.container);
  }

  set id(value: string) {
    this.productId = value;
  }

  set title(value: string) {
    this.setText(this.cardTitle, value);
  }

  set price(value: string) {
    value ?
      this.setText(this.cardPrice, `${value} синапсов`) :
      this.setText(this.cardPrice, 'Бесценно');
  }
}