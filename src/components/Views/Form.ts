import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { EventEmitter } from "../base/Events";


export class Form extends Component<object> {
  protected errorsDisplay: HTMLElement;
  protected formButton: HTMLButtonElement;

  constructor(container: HTMLElement, protected events: EventEmitter) {
    super(container);

    this.formButton = ensureElement('.modal__actions .button', this.container) as HTMLButtonElement;
    this.errorsDisplay = ensureElement('.form__errors', this.container);
  }

  setError(value: string) {
    this.setText(this.errorsDisplay, value)
  }
}