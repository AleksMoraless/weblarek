import { IBuyer } from "../../../types";

export class Buyer {
  protected buyer: IBuyer = {
    'payment': '',
    'address': '',
    'phone': '',
    'email': ''
  };

  constructor() {
  }

  protected checkData(buyer: IBuyer): boolean {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
    const phoneRegex = /^\+?(\d{1,3})?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$/;

    return (
      !!buyer.payment && (buyer.payment === 'card' || buyer.payment === 'cash') &&
      !!buyer.address && emailRegex.test(buyer.email) && phoneRegex.test(buyer.phone)
    );
  }

  public getData(): IBuyer {
    return this.buyer;
  }

  public clearData(): void {
    this.buyer.payment = '';
    this.buyer.address = '';
    this.buyer.email = '';
    this.buyer.phone = '';
  }

  public setData(newBuyer: IBuyer): void {
    if (this.checkData(newBuyer)) {
      console.log('Данные покупателя валидны');
      this.buyer.payment = newBuyer.payment;
      this.buyer.address = newBuyer.address;
      this.buyer.email = newBuyer.email;
      this.buyer.phone = newBuyer.phone;
    } else console.log('Данные покупателя некорректны');
  }
}