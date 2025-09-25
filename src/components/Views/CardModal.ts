import { CDN_URL, compareCategory, eventsList } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
import { EventEmitter } from "../base/Events";
import { Card } from "./Card";

export class CardModal extends Card {

  protected cardCategory: HTMLElement;
  protected cardDescription: HTMLElement;
  protected cardButtonCart: HTMLButtonElement;
  protected cardImage: HTMLImageElement;

  constructor(container: HTMLElement, protected events: EventEmitter) {
    super(container, events);
    this.cardCategory = ensureElement('.card__category', this.container);
    this.cardDescription = ensureElement('.card__text', this.container);
    this.cardButtonCart = ensureElement('.card__button', this.container) as HTMLButtonElement;
    this.cardCategory = ensureElement('.card__category', this.container);
    this.cardImage = ensureElement('.card__image', this.container) as HTMLImageElement;

    this.cardButtonCart.addEventListener('click', () => {
      this.events.emit(eventsList["product:actionWithCart"], { id: this.productId })
    })
  }

  set inCart(value: boolean) {
    if (value === true) {
      this.setText(this.cardButtonCart, 'Удалить из корзины')
    }
  }

  set description(value: string) {
    this.setText(this.cardDescription, value);
  }

  set price(value: string) {
    if (value) {
      this.setText(this.cardPrice, `${value} синапсов`);
      this.setText(this.cardButtonCart, 'В корзину');
      this.cardButtonCart.disabled = false;
    } else {
      this.setText(this.cardPrice, 'Бесценно');
      this.setText(this.cardButtonCart, 'Недоступно');
      this.cardButtonCart.disabled = true;
    }
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