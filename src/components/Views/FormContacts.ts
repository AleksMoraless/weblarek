import { ensureElement } from "../../utils/utils";
import { EventEmitter } from "../base/Events";
import { Form } from "./Form";

export class FormContacts extends Form {
  protected formInputEmail: HTMLInputElement;
  protected formInputPhone: HTMLInputElement;
  protected formButtonBuy: HTMLButtonElement;

  constructor(container: HTMLElement, protected events: EventEmitter) {
    super(container, events)

    this.formInputEmail = ensureElement('input[name="email"]', this.container) as HTMLInputElement;
    this.formInputPhone = ensureElement('input[name="phone"]', this.container) as HTMLInputElement;
    this.formButtonBuy = ensureElement('button[type="submit"]', this.container) as HTMLButtonElement;

    this.formInputEmail.addEventListener('input', () => {
      this.events.emit('email:added', { value: this.formInputEmail.value })
      this.events.emit('contacts:checkData')
    })

    this.formInputPhone.addEventListener('input', () => {
      this.events.emit('phone:added', { value: this.formInputPhone.value })
      this.events.emit('contacts:checkData')
    })

    this.formButtonBuy.addEventListener('click', (e) => {
      e.preventDefault();
      this.events.emit('order:success')
    })
  }

  setformButtonBuyEnable(value: boolean) {
    if (value) {
      this.formButtonBuy.disabled = false;
    } else {
      this.formButtonBuy.disabled = true;
    }
  }
}