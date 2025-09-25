import { eventsList } from "../../utils/constants";
import { ensureAllElements, ensureElement } from "../../utils/utils";
import { EventEmitter } from "../base/Events";
import { Form } from "./Form";

export class FormOrder extends Form {
  protected formPayMethods: HTMLButtonElement[];
  protected formInputAddress: HTMLInputElement;
  protected pickedButtonName: string | null = null;


  constructor(container: HTMLElement, protected events: EventEmitter) {
    super(container, events)

    this.formPayMethods = ensureAllElements('button[name]', this.container) as HTMLButtonElement[];
    this.formInputAddress = ensureElement('input[name="address"]', this.container) as HTMLInputElement;

    this.formPayMethods.forEach(item => {
      item.addEventListener('click', () => {
        this.pickedButtonName = item.getAttribute('name')
        this.events.emit(eventsList["payMethod:chosen"], { name: this.pickedButtonName })
        this.events.emit(eventsList["order:checkData"])
      })
    })

    this.formInputAddress.addEventListener('input', () => {
      this.events.emit(eventsList["address:added"], { value: this.formInputAddress.value })
      this.events.emit(eventsList["order:checkData"])
    })
  }

  setActivePayMethod(name: string): void {
    this.formPayMethods.forEach(item => {
      item.classList.remove('button_alt-active');
      
      if (item.getAttribute('name') === name) {
        item.classList.add('button_alt-active');
      }
    })
  }
}