import { eventsList } from "../../utils/constants";
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
      this.events.emit(eventsList["modal:closed"]);
    })

    this.container.addEventListener('click', (e) => {
      if (e.target === e.currentTarget) {
        this.events.emit(eventsList["modal:closed"])
      }
    })
  }

  getModalComponent(): string {
    return this.component;
  }

  set modalContent(value: string) {
    this.component = value;
  }
  
// Обработчик в виде стрелочного метода, чтобы не терять контекст `this`
  _handleEscape = (evt: KeyboardEvent) => {
    if (evt.key === "Escape") {
      // this.isOpen = false;
      //чтобы появился скролл и очистить контент и тип контента
      this.events.emit(eventsList["modal:closed"])
    }
  };

  set isOpen(value: boolean) {
    if (value === true) {
      this.container.classList.add("modal_active");
      document.addEventListener("keydown", this._handleEscape);
    } else { 
      this.container.classList.remove("modal_active");
      document.removeEventListener("keydown", this._handleEscape);
    }
  }

  set content(content: HTMLElement) {
    this.modalContainer.replaceChildren(content);
  }
}