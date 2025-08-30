import './types/index.ts'
import './scss/styles.scss';
import { Api } from "./components/base/Api";
import { ComApi } from "./components/base/comApi/comApi";
import { Buyer } from "./components/base/Models/Buyer";
import { Cart } from "./components/base/Models/Cart";
import { Catalog } from "./components/base/Models/Catalog";
import { API_URL } from "./utils/constants";
import { IBuyer, IpostProducts, IProduct } from './types/index.ts';


const comApi = new ComApi(new Api(API_URL));

const catalog = new Catalog();
const cart = new Cart();
const buyer = new Buyer();

const product1: IProduct = {
  "description": "Лизните этот леденец, чтобы мгновенно запоминать и узнавать любой цветовой код CSS.",
  "image": "/Shell.svg",
  "title": "HEX-леденец",
  "category": "другое",
  "price": 1450,
  "id": "c101ab44-ed99-4a54-990d-47aa2bb4e7d9",
}
const product2: IProduct = {
  "id": "b06cde61-912f-4663-9751-09956c0eed67",
  "description": "Будет стоять над душой и не давать прокрастинировать.",
  "image": "/Asterisk_2.svg",
  "title": "Мамка-таймер",
  "category": "софт-скил",
  "price": null
}

const buyer1: IBuyer = {
  payment: 'card',
  address: 'moscow city',
  email: 'sanekm1901@mail.ru',
  phone: '89209871358'
}
const buyer2: IBuyer = {
  payment: 'cash',
  address: 'Ryazan',
  email: 'sanekm1901mailru',
  phone: '898'
}


const data: IpostProducts = {
  "payment": "cash",
  "email": "test@test.ru",
  "phone": "+71234567890",
  "address": "Spb Vosstania 1",
  "total": 2200,
  "items": [
    "854cef69-976d-4c2a-a18c-2aa45046c390",
    "c101ab44-ed99-4a54-990d-47aa2bb4e7d9"
  ]
}

//Проверка методов корзины

// console.log('Методы корзины');
// console.log('Вывод данных коллекции в начальном состоянии', cart.getCartItems());
// console.log('Добавление продукта Product1 и Product2 в корзину');
// cart.addProduct(product1);
// cart.addProduct(product2);
// console.log(cart.getCartItems());
// console.log('Проверка наличия продукта Product1', cart.cartHasProduct(product1));
// console.log('Получение количества товаров в корзине', cart.getQuantityCartItems());
// console.log('Получение общей суммы товаров в корзине', cart.getTotalPrice());
// console.log('Удаление продукта Product1 из корзины');
// cart.deleteProduct(product1);
// console.log(cart.getCartItems());
// console.log('Очистка корзины');
// cart.clearCart();
// console.log(cart.getCartItems());

console.log('______________________________________________________________________________________');
//Проверка методов покупателя

// console.log('Методы покупателя');
// console.log('Вывод данных хранилищ в начальном состоянии', buyer.getData());
// console.log('Сохранение и проверка данных о покупателе');
// buyer.setData(buyer1);
// console.log(buyer.getData());
// console.log('Очистка данных покупателя');
// buyer.clearData();
// console.log(buyer.getData());
// console.log('Сохранение и проверка данных о покупателе с невалидными даными');
// buyer.setData(buyer2);
// console.log(buyer.getData());

console.log('______________________________________________________________________________________');

//Проверка методов каталога и api get

// console.log('Методы каталога');
// console.log('Вывод данных хранилищ в начальном состоянии', catalog.getProducts(), catalog.getPickedProduct());
// console.log('Заполнение каталога данными с сервера');
// comApi.get('/product/').then(res => catalog.setProducts(res));
// setTimeout(() => {
//   console.log('Вывод заполненного массива товаров', catalog.getProducts());
//   console.log('Вывод товара по идентификатору из массива товаров', catalog.getProductByID("854cef69-976d-4c2a-a18c-2aa45046c390"));
//   console.log('Сохранение товара Product1 в выбранный товар');
//   catalog.setPickedProduct(product1);
//   console.log('Вывод данных из объекта выбранного товара', catalog.getPickedProduct());
// }, 1000);

//Проверка метода api post
comApi.post('/order/', data).then(resp => console.log(resp));
