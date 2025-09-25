import './types/index.ts'
import './scss/styles.scss';
import { Api } from "./components/base/Api";
import { ComApi } from "./components/base/comApi/comApi";
import { Catalog } from "./components/base/Models/Catalog";
import { API_URL } from "./utils/constants";
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

comApi.get('/product/')
  .then(res => {
    res.map(item => item.image = item.image.slice(1, -3) + 'png')
    catalog.setProducts(res);
  })

events.on('products:changed', () => {
  const productsHTMLArray = catalog.getProducts().map(item => {
    return new CardCatalog(cloneTemplate(cardTemplate), events).render(item)
  })
  page.render({
    elementsList: productsHTMLArray
  })
})

events.on('product:selected', ({ id }: { id: string }) => {
  catalog.setPickedProduct(id);
})

events.on('product:setted', () => {
  const inCart = cart.cartHasProduct(catalog.getPickedProduct()!);

  modal.render({
    content: cardModal.render({ ...catalog.getPickedProduct(), inCart }),
    isOpen: true,
    modalContent: 'product'
  })
})

events.on('modal:noScroll', () => {
  document.body.style.overflow = 'hidden';
})

events.on('modal:closed', () => {
  document.body.style.overflow = 'auto';
  catalog.setPickedProduct('');
  modal.render({
    content: null,
    isOpen: false,
    modalContent: ''
  })
})

events.on('cart:opened', () => {
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

events.on('product:actionWithCart', ({ id }: { id: string }) => {
  if (cart.cartHasProduct(catalog.getProductByID(id)!)) {
    cart.deleteProduct(catalog.getProductByID(id)!)
  } else {
    cart.addProduct(catalog.getProductByID(id)!)
  }
})

events.on('product:addToCart', ({ id }: { id: string }) => {
  cart.addProduct(catalog.getProductByID(id)!)
})

events.on('product:deleteToCart', ({ id }: { id: string }) => {
  cart.deleteProduct(catalog.getProductByID(id)!)
})

events.on('cart:changed', () => {
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

events.on('form:order', () => {
  modal.render({
    content: order.render(),
    isOpen: true,
    modalContent: 'order'
  })
})

events.on('payMethod:chosen', ({ name }: { name: 'cash' | 'card' | '' }) => {
  buyer.setPayment(name)
})

events.on('payMethod:added', ({ name }: { name: 'cash' | 'card' | '' }) => {
  order.setActivePayMethod(name);
})

events.on('address:added', ({ value }: { value: string }) => {
  buyer.setAddress(value);
})

events.on('order:checkData', () => {
  order.setError('')

  if (!buyer.getData('payment')) {
    order.setError('Необходимо выбрать способ оплаты')
    order.setformButtonNextEnable(false)
  } else if (!buyer.getData('address')) {
    order.setError('Необходимо указать адрес')
    order.setformButtonNextEnable(false)
  } else {
    order.setformButtonNextEnable(true)
  }
})

events.on('form:contacts', () => {
  modal.render({
    content: contacts.render(),
    isOpen: true,
    modalContent: 'contacts'
  })
})

events.on('email:added', ({ value }: { value: string }) => {
  buyer.setEmail(value);
})

events.on('phone:added', ({ value }: { value: string }) => {
  buyer.setPhone(value);
})

events.on('contacts:checkData', () => {
  contacts.setError('')

  if (!buyer.getData('email')) {
    contacts.setError('Необходимо указать email')
    contacts.setformButtonBuyEnable(false)
  } else if (!buyer.getData('phone')) {
    contacts.setError('Необходимо указать телефон')
    contacts.setformButtonBuyEnable(false)
  } else {
    contacts.setformButtonBuyEnable(true)
  }
})

events.on('order:success', () => {
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
