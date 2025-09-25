import './types/index.ts'
import './scss/styles.scss';
import { Api } from "./components/base/Api";
import { ComApi } from "./components/base/comApi/comApi";
import { Catalog } from "./components/base/Models/Catalog";
import { API_URL, eventsList } from "./utils/constants";
import { EventEmitter } from './components/base/Events.ts';
import { Header } from './components/Views/Header.ts';
import { cloneTemplate } from './utils/utils.ts';
import { Gallery } from './components/Views/Gallery.ts';
import { Modal } from './components/Views/Modal.ts';
import { CardCatalog } from './components/Views/CardCatalog.ts';
import { CardModal } from './components/Views/CardModal.ts';
import { Cart } from './components/base/Models/Cart.ts';
import { CardCart } from './components/Views/CardCart.ts';
import { CartView } from './components/Views/CartView.ts';
import { FormOrder } from './components/Views/FormOrder.ts';
import { Buyer } from './components/base/Models/Buyer.ts';
import { FormContacts } from './components/Views/FormContacts.ts';
import { SuccessOrder } from './components/Views/SuccessOrder.ts';
import { IBuyer } from './types/index.ts';

const events = new EventEmitter()
const comApi = new ComApi(new Api(API_URL));
const catalog = new Catalog(events);
const cart = new Cart(events);
const buyer = new Buyer(events);


const cardTemplate = document.querySelector('#card-catalog') as HTMLTemplateElement;
const fullCardTemplate = document.querySelector('#card-preview') as HTMLTemplateElement;
const compactCardTemplate = document.querySelector('#card-basket') as HTMLTemplateElement;
const cartTemplate = document.querySelector('#basket') as HTMLTemplateElement;
const orderTemplate = document.querySelector('#order') as HTMLTemplateElement;
const contactsTemplate = document.querySelector('#contacts') as HTMLTemplateElement;
const successOrderTemplate = document.querySelector('#success') as HTMLTemplateElement;

const header = new Header(document.querySelector('.header') as HTMLElement, events);
const page = new Gallery(document.querySelector('.page__wrapper') as HTMLElement, events);
const modal = new Modal(document.querySelector('#modal-container') as HTMLElement, events);
const cardModal = new CardModal(cloneTemplate(fullCardTemplate), events);
const cartView = new CartView(cloneTemplate(cartTemplate), events);
const order = new FormOrder(cloneTemplate(orderTemplate), events);
const contacts = new FormContacts(cloneTemplate(contactsTemplate), events);
const successOrder = new SuccessOrder(cloneTemplate(successOrderTemplate), events);

comApi.get()
  .then(res => {
    res.map(item => item.image = item.image.slice(1, -3) + 'png')
    catalog.setProducts(res);
  }).catch(err => console.error(err))

events.on(eventsList['products:changed'], () => {
  const productsHTMLArray = catalog.getProducts().map(item => {
    return new CardCatalog(cloneTemplate(cardTemplate), events).render(item)
  })
  page.render({
    elementsList: productsHTMLArray
  })
})

events.on(eventsList['product:selected'], ({ id }: { id: string }) => {
  catalog.setPickedProduct(id);
})

events.on(eventsList['product:setted'], () => {
  const inCart = cart.cartHasProduct(catalog.getPickedProduct()!);

  modal.render({
    content: cardModal.render({ ...catalog.getPickedProduct(), inCart }),
    isOpen: true,
    modalContent: 'product'
  })
})

events.on(eventsList['modal:noScroll'], () => {
  document.body.style.overflow = 'hidden';
})

events.on(eventsList['modal:closed'], () => {
  document.body.style.overflow = 'auto';
  catalog.setPickedProduct('');
  modal.render({
    content: null,
    isOpen: false,
    modalContent: ''
  })
})

events.on(eventsList['cart:opened'], () => {
  if (cart.getQuantityCartItems() === 0) {
    modal.render({
      content: cartView.render({
        elementsList: [cartView.getPlacer()]
      }),
      isOpen: true,
      modalContent: 'cart'
    })
    cartView.setDisableCartButtonOrder(true);
  } else {
    const cartProductsHTMLArray = cart.getCartItems().map((item, ind) => {
      return new CardCart(cloneTemplate(compactCardTemplate), events, ind + 1).render(item);
    });
    modal.render({
      content: cartView.render({
        elementsList: cartProductsHTMLArray
      }),
      isOpen: true,
      modalContent: 'cart'
    })
    cartView.setDisableCartButtonOrder(false);
  }
  cartView.setTotalPrice(cart.getTotalPrice());
})

events.on(eventsList['product:actionWithCart'], ({ id }: { id: string }) => {
  if (cart.cartHasProduct(catalog.getProductByID(id)!)) {
    cart.deleteProduct(catalog.getProductByID(id)!)
  } else {
    cart.addProduct(catalog.getProductByID(id)!)
  }
})

// events.on(eventsList.prod'product:addToCart', ({ id }: { id: string }) => {
//   cart.addProduct(catalog.getProductByID(id)!)
// })

events.on(eventsList['product:deleteToCart'], ({ id }: { id: string }) => {
  cart.deleteProduct(catalog.getProductByID(id)!)
})

events.on(eventsList['cart:changed'], () => {
  if (cart.getQuantityCartItems() === 0) {
    cartView.render({
      elementsList: [cartView.getPlacer()]
    })
    cartView.setDisableCartButtonOrder(true);
  } else {
    const cartProductsHTMLArray = cart.getCartItems().map((item, ind) => {
      return new CardCart(cloneTemplate(compactCardTemplate), events, ind + 1).render(item);
    });
    cartView.render({
      elementsList: cartProductsHTMLArray
    })
    cartView.setDisableCartButtonOrder(false);
  }
  cartView.setTotalPrice(cart.getTotalPrice());

  if (modal.getModalComponent() === 'product') {
    let inCart = cart.cartHasProduct(catalog.getPickedProduct()!);
    modal.render({
      content: cardModal.render({ ...catalog.getPickedProduct(), inCart }),
      isOpen: true,
      modalContent: 'product'
    })
  }

  header.render({
    counter: cart.getQuantityCartItems()
  })
})

events.on(eventsList['form:order'], () => {
  modal.render({
    content: order.render(),
    isOpen: true,
    modalContent: 'order'
  })
})

events.on(eventsList['payMethod:chosen'], ({ name }: { name: 'cash' | 'card' | '' }) => {
  buyer.setPayment(name)
})

events.on(eventsList['payMethod:added'], ({ name }: { name: 'cash' | 'card' | '' }) => {
  order.setActivePayMethod(name);
})

events.on(eventsList['address:added'], ({ value }: { value: string }) => {
  buyer.setAddress(value);
})

events.on(eventsList['order:checkData'], () => {
  order.setError('')

  if (!buyer.getData('payment')) {
    order.setError('Необходимо выбрать способ оплаты')
    order.disableFormButton(false)
  } else if (!buyer.getData('address')) {
    order.setError('Необходимо указать адрес')
    order.disableFormButton(false)
  } else {
    order.disableFormButton(true)
  }
})

events.on(eventsList['order:submit'], () => {
  modal.render({
    content: contacts.render(),
    isOpen: true,
    modalContent: 'contacts'
  })
})

events.on(eventsList['email:added'], ({ value }: { value: string }) => {
  buyer.setEmail(value);
})

events.on(eventsList['phone:added'], ({ value }: { value: string }) => {
  buyer.setPhone(value);
})

events.on(eventsList['contacts:checkData'], () => {
  contacts.setError('')

  if (!buyer.getData('email')) {
    contacts.setError('Необходимо указать email')
    contacts.disableFormButton(false)
  } else if (!buyer.getData('phone')) {
    contacts.setError('Необходимо указать телефон')
    contacts.disableFormButton(false)
  } else {
    contacts.disableFormButton(true)
  }
})

events.on(eventsList['contacts:submit'], () => {
  comApi.post('/order/', {
    ...buyer.getData() as IBuyer,
    total: cart.getTotalPrice(),
    items: cart.getCartItems().map(item => item.id)
  }).then(resp => {
    modal.render({
      content: successOrder.render({ totalSum: resp.total }),
      isOpen: true,
      modalContent: 'success'
    })
    cart.clearCart();
    buyer.clearData();
  }).catch(err => {
    console.log(err)
    contacts.setError(err)
  });
})
