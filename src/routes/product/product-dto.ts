//PRODUCTS DTO

import UserDto from "../authentication/authentication-dto";

// To get all products, make a GET request to the following URL: /product/all
// The response should be a JSON array with the following fields:
//
// id: The id of the product.
// userId: The id of the user that created the product.
// name: The name of the product.
// price: The price of the product.
// quantity: The quantity of the product.
//
// If no products are found, the response should be a JSON object with the following fields:
//
// message: The message that should be displayed to the user.
//
// To get a product, make a GET request to the following URL: /product/:id
// The response should be a JSON object with the following fields:
//
// id: The id of the product.
// userId: The id of the user that created the product.
// name: The name of the product.
// price: The price of the product.
// quantity: The quantity of the product.
//
// If the product is not found, the response should be a JSON object with the following fields:
//
// message: The message that should be displayed to the user.
//
// To update a product, make a PUT request to the following URL: /product/:id
// The body of the request should be a JSON object with the following fields:
//
// name: The name of the product.
// price: The price of the product.
// quantity: The quantity of the product.
//
// The response should be a JSON object with the following fields:
//
// message: The message that should be displayed to the user.
//
// If the product is not found, the response should be a JSON object with the following fields:
//
// message: The message that should be displayed to the user.
// errors: An array of error messages that should be displayed to the user.
//
// To delete a product, make a DELETE request to the following URL: /product/:id
// The response should be a JSON object with the following fields:
//
// message: The message that should be displayed to the user.
//
// If the product is not found, the response should be a JSON object with the following fields:

//HOW TO GET ALL THE PRODUCTS INFORMATIONS
//Performing a get request to /products will print
//all products from the database and return them as a json object to the client

//HOW TO GET OF A SPECIFIC PRODUCT INFORMATIONS
//Performing a get request to /products/:id will print
//a specific product from the database and return it as a json object to the client

//HOW TO ADD NEW STOCKS FOR A PRODUCT
//Performing a post request to /products/:id/add-stock will add
//the new value to the 'quantity' of a specific product and return the updated product
//as a json object to the client

//HOW TO SELL A PRODUCT TO THE CUSTOMER
//Performing a put request to /products/:id/sell will print
//a specific product from the database and return it as a json object to the client with the new quantity

//HOW TO CREATE A NEW PRODUCT
//Performing a post request to /products adds a new product
//to the database and return the product list as a json object to the client
//ACCEPTED PARAMS : product, price, quantity

//HOW TO UPDATE A PRODUCT
//Performing a put request to /products/:id updates a product
//in the database and prints the updated product as a json object to the client
//ACCEPTED PARAMS : product, price, quantity

//HOW TO DELETE ALL THE PRODUCTS
//Performing a delete request to delete all products from the database

//HOW TO DELETE A SPECIFIC PRODUCT
//Performing a delete request to /products/:id will delete a
//specifict product by identifier from the database

export default class ProductDto {
  constructor(
    public userId: UserDto,
    public id: string,
    public name: string,
    public price: number,
    public quantity: number,
    public disponibility: boolean,
    public imgUrl: string
  ) {}
}
