import { eventsList } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
import { EventEmitter } from "../base/Events";
import { Card } from "./Card";

export class CardCart extends Card {

  protected indexElement: HTMLElement;
  protected cardButtonDelete: HTMLButtonElement;

  constructor(container: HTMLElement, protected events: EventEmitter, index: number) {
    super(container, events);

    this.indexElement = ensureElement('.basket__item-index', this.container);
    this.cardButtonDelete = ensureElement('.basket__item-delete', this.container) as HTMLButtonElement;

    this.setText(this.indexElement, index);

    this.cardButtonDelete.addEventListener('click', () => {
      this.events.emit(eventsList["product:deleteToCart"], { id: this.productId })
    })
  }

  set index(value: number) {
    this.setText(this.indexElement, value);
  }
}