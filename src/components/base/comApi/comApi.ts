import { IApi, IgetProducts, IProduct, ISuccessOrder, IpostProducts } from "../../../types";

export class ComApi {
  protected api: IApi;

  constructor(api: IApi) {
    this.api = api;
  }

  protected checkData(data: any): data is IgetProducts {
    return (
      typeof data === "object" &&
      typeof data.total === "number" &&
      typeof data.items === "object"
    );
  }

  public async get(uri: string = '/product/'): Promise<IProduct[]> {
    const response = await this.api.get(uri).then(res => res);
    if (this.checkData(response)) {
      console.log('Data is correct from server')
      return response.items;
    }
    else {
      console.log('Data is not correct from server');
      return [];
    }
  }

  public async post(uri: string = '/order/', data: IpostProducts | {} = {}): Promise<ISuccessOrder> {
    return await this.api.post(uri, data);
  }
}