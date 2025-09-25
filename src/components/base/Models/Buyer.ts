import { IBuyer, IErrors } from "../../../types";
import { eventsList } from "../../../utils/constants";
import { IEvents } from "../Events";

export class Buyer {
  protected buyerData: IBuyer = {
    payment: '',
    address: '',
    email: '',
    phone: '',
  }

  protected errors: IErrors = {
    payment: 'Необходимо выбрать способ оплаты',
    address: 'Необходимо указать адрес',
    email: 'Необходимо выбрать способ оплаты',
    phone: 'Необходимо указать адрес',
  };

  constructor(protected events: IEvents) {}

  // getError(name: 'payment' | 'address' | 'email' | 'phone'): string {
    // const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
    // const phoneRegex = /^\+?(\d{1,3})?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$/;
    // return ( // !!buyer.payment && (buyer.payment === 'card' || buyer.payment === 'cash') && !!buyer.address && emailRegex.test(buyer.email) && phoneRegex.test(buyer.phone) );
  //   return this.errors[name];
  // }

  public getData(name?: 'payment' | 'address' | 'email' | 'phone'): IBuyer | string {
    if (name) {
      return this.buyerData[name];
    } else {
      return this.buyerData;
    }
  }

  public clearData(): void {
    this.buyerData.payment = '';
    this.buyerData.address = '';
    this.buyerData.email = '';
    this.buyerData.phone = '';
  }

  public setPayment(value: 'cash' | 'card' | ''): void {
    this.buyerData.payment = value;
    this.events.emit(eventsList["payMethod:added"], { name: value })
  }

  public setAddress(value: string): void {
    this.buyerData.address = value;
  }

  public setEmail(value: string): void {
    this.buyerData.email = value;
  }

  public setPhone(value: string): void {
    this.buyerData.phone = value;
  }
}