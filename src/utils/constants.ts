/* Константа для получения полного пути для сервера. Для выполнения запроса 
необходимо к API_URL добавить только ендпоинт. */
export const API_URL = `${import.meta.env.VITE_API_ORIGIN}/api/weblarek`; 
/* Константа для формирования полного пути к изображениям карточек. 
Для получения полной ссылки на картинку необходимо к CDN_URL добавить только название файла изображения,
которое хранится в объекте товара. */
export const CDN_URL = `${import.meta.env.VITE_API_ORIGIN}/content/weblarek`;

export const settings = {};

export const compareCategory = new Map([
    ['другое', 'other'],
    ['софт-скил', 'soft'],
    ['дополнительное', 'additional'],
    ['хард-скил', 'hard'],
    ['кнопка', 'button'],
    ['unknown', 'unknown']
  ])

  export enum eventsList {
    'products:changed' = 'products:changed',
    'product:setted' = 'product:setted',
    'cart:changed' = 'cart:changed',
    'payMethod:added' = 'payMethod:added',
    'product:deleteToCart' = 'product:deleteToCart',
    'product:selected' = 'product:selected',
    'modal:noScroll' = 'modal:noScroll',
    'product:actionWithCart' = 'product:actionWithCart',
    'form:order' = 'form:order',
    'email:added' = 'email:added',
    'phone:added' = 'phone:added',
    'address:added' = 'address:added',
    'contacts:checkData' = 'contacts:checkData',
    'contacts:submit' = 'contacts:submit',
    'payMethod:chosen' = 'payMethod:chosen',
    'order:checkData' = 'order:checkData',
    'order:submit' = 'order:submit',
    'cart:opened' = 'cart:opened',
    'modal:closed' = 'modal:closed',
  }

