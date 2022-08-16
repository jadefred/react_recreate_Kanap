interface IData {
  _id: string;
  imageUrl: string;
  altTxt: string;
  name: string;
  description: string;
  price: number;
  colors: string[];
}

interface ILocalStorage {
  selectedProducts:
    | {
        _id: string;
        quantity: number;
        color: string;
      }[]
    | null;
}

interface IProductsState {
  selectedProducts: ILocalStorage["selectedProducts"];
  setSelectProducts(selectedProducts: ILocalStorage["selectedProducts"]): void;
}

type IAddProductPayload = {
  _id: string;
  quantity: number;
  color: string;
};

export type { IData, ILocalStorage, IProductsState, IAddProductPayload };
