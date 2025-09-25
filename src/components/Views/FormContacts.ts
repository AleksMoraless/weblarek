import { eventsList } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
import { EventEmitter } from "../base/Events";
import { Form } from "./Form";

export class FormContacts extends Form {
  protected formInputEmail: HTMLInputElement;
  protected formInputPhone: HTMLInputElement;

  constructor(container: HTMLElement, protected events: EventEmitter) {
    super(container, events)

    this.formInputEmail = ensureElement('input[name="email"]', this.container) as HTMLInputElement;
    this.formInputPhone = ensureElement('input[name="phone"]', this.container) as HTMLInputElement;

    this.formInputEmail.addEventListener('input', () => {
      this.events.emit(eventsList["email:added"], { value: this.formInputEmail.value })
      this.events.emit(eventsList["contacts:checkData"])
    })

    this.formInputPhone.addEventListener('input', () => {
      this.events.emit(eventsList["phone:added"], { value: this.formInputPhone.value })
      this.events.emit(eventsList["contacts:checkData"])
    })
  }
}