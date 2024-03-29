interface IData {
  _id: string;
  imageUrl: string;
  altTxt: string;
  name: string;
  description: string;
  price: number;
  colors: string[];
}

type selectedProducts = {
  _id: string;
  quantity: number;
  color: string;
}[];

type IAddProductPayload = {
  _id: string;
  quantity: number;
  color: string;
};

export type { IData, IAddProductPayload, selectedProducts };
