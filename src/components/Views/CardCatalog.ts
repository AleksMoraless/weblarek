import { CDN_URL, compareCategory, eventsList } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
import { EventEmitter } from "../base/Events";
import { Card } from "./Card";

export class CardCatalog extends Card {
  protected cardCategory: HTMLElement;
  protected cardImage: HTMLImageElement;

  constructor(container: HTMLElement, protected events: EventEmitter) {
    super(container, events);
    this.cardCategory = ensureElement('.card__category', this.container);
    this.cardImage = ensureElement('.card__image', this.container) as HTMLImageElement;

    this.container.addEventListener('click', () => {
      this.events.emit(eventsList["product:selected"], { id: this.productId })
      this.events.emit(eventsList["modal:noScroll"]);
    })
  }

  set category(value: string) {
    this.setText(this.cardCategory, value);
    compareCategory.has(value) ?
      this.cardCategory.classList.add(`card__category_${compareCategory.get(value)}`) :
      this.cardCategory.classList.add(`card__category_${compareCategory.get('unknown')}`);
  }

  set image(value: string) {
    this.setImage(this.cardImage, `${CDN_URL}/${value}`);
  }

}