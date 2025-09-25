import { eventsList } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { EventEmitter } from "../base/Events";

interface IHeaderData {
  counter: number;
}

export class Header extends Component<IHeaderData> {
  protected cartButton: HTMLButtonElement;
  protected elementCartQuantity: HTMLElement;

  constructor(container: HTMLElement, protected events: EventEmitter) {
    super(container);
    this.cartButton = ensureElement('.header__basket', this.container) as HTMLButtonElement
    this.elementCartQuantity = ensureElement('.header__basket-counter', this.container)


    this.cartButton.addEventListener('click', () => {
      this.events.emit(eventsList["cart:opened"]);
      this.events.emit(eventsList["modal:noScroll"]);
    });
  }

  set counter(value: number) {
    this.setText(this.elementCartQuantity, value);
  }
}