import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component"
import { EventEmitter } from "../base/Events";

interface IModalData {
  content: HTMLElement | null;
  modalContent: string;
  isOpen?: boolean;
}

export class Modal extends Component<IModalData> {
  protected closeButton: HTMLButtonElement;
  protected modalContainer: HTMLElement;
  protected component: string = '';

  constructor(container: HTMLElement, protected events: EventEmitter) {
    super(container);

    this.closeButton = ensureElement('.modal__close', this.container) as HTMLButtonElement;
    this.modalContainer = ensureElement('.modal__content', this.container);

    this.closeButton.addEventListener('click', () => {
      this.events.emit('modal:closed');
    })

    this.container.addEventListener('click', (e) => {
      if (e.target === e.currentTarget) {
        this.events.emit('modal:closed')
      }
    })
  }

  getModalComponent(): string {
    return this.component;
  }

  set modalContent(value: string) {
    this.component = value;
  }

  set isOpen(value: boolean) {
    if (value === true) {
      this.container.classList.add('modal_active');
    } else this.container.classList.remove('modal_active');
  }

  set content(content: HTMLElement) {
    this.modalContainer.replaceChildren(content);
  }
}