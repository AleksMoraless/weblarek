import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { EventEmitter } from "../base/Events";


export class Form extends Component<object> {
  protected errorsDisplay: HTMLElement;
  protected _submitButton: HTMLButtonElement;

  constructor(container: HTMLElement, protected events: EventEmitter) {
    super(container);

    this._submitButton = ensureElement('button[type="submit"]', this.container) as HTMLButtonElement;
    this.errorsDisplay = ensureElement('.form__errors', this.container);

    this.container.addEventListener('submit', (e) => {
      e.preventDefault();
      console.log(`${this.container.getAttribute('name')}:submit`)
      this.events.emit(`${this.container.getAttribute('name')}:submit`)
    })
  }

  setError(value: string) {
    this.setText(this.errorsDisplay, value)
  }

  disableFormButton(value: boolean) {
    if (value) {
      this._submitButton.disabled = false;
    } else {
      this._submitButton.disabled = true;
    }
  }
}