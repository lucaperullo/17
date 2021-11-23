import ProductDto from "../product/product-dto";

import { Schema } from "express-validator";

export default class UserDto {
  constructor(
    public userId: {
      userId: string;
    },
    public id: string,
    public name: string,
    public role: string,
    public password: string,
    public email: string,
    public avatar: string,
    public products: ProductDto[]
  ) {}
}
