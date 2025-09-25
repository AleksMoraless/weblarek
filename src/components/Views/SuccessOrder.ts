import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { EventEmitter } from "../base/Events";

interface ISuccesOrderData {
  totalSum: number;
}

export class SuccessOrder extends Component<ISuccesOrderData> {
  protected elementTotalSum: HTMLElement;
  protected buttonOrderSuccessClose: HTMLButtonElement;

  constructor(container: HTMLElement, protected events: EventEmitter) {
    super(container);

    this.elementTotalSum = ensureElement('.order-success__description', this.container);
    this.buttonOrderSuccessClose = ensureElement('.order-success__close', this.container) as HTMLButtonElement;

    this.buttonOrderSuccessClose.addEventListener('click', () => {
      // this.events.emit('successOrder:close')
      this.events.emit('modal:closed')
    })
  }

  set totalSum(value: number) {
    this.setText(this.elementTotalSum, `Списано ${value} синапсов`);
  }
}