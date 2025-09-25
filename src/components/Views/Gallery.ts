import { IElementsList } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component"
import { EventEmitter } from "../base/Events";

export class Gallery extends Component<IElementsList> {
  protected productsContainer: HTMLElement;

  constructor(container: HTMLElement, protected events: EventEmitter) {
    super(container);
    this.productsContainer = ensureElement('.gallery', this.container)
  }

  set elementsList(products: HTMLElement[]) {
    this.productsContainer.replaceChildren(...products);
  }

}