import ProductDto from "../product/product-dto";

// To register a new User in the database, make a POST request to the following URL: /user/signup
// The body of the request should be a JSON object with the following fields:
//
// email: The email of the user.
// password: The password of the user.
// name: The name of the user.
// role: The role of the user.
//
// The response should be a JSON object with the following fields:
//
// token: The JWT token that should be used to authenticate the user.
//
// The token should be valid for 1 hour.
//
// If the user is successfully created, the response should be a JSON object with the following fields:
//
// message: The message that should be displayed to the user.
//
// If the user is not successfully created, the response should be a JSON object with the following fields:
//
// message: The message that should be displayed to the user.
// errors: An array of error messages that should be displayed to the user.
//
// To login a user, make a POST request to the following URL: /user/login
// The body of the request should be a JSON object with the following fields:
//
// email: The email of the user.
// password: The password of the user.
//
// The response should be a JSON object with the following fields:
//
// token: The JWT token that should be used to authenticate the user.
//
// The token should be valid for 1 hour.
//
// If the user is successfully logged in, the response should be a JSON object with the following fields:
//
// message: The message that should be displayed to the user.
//
// If the user is not successfully logged in, the response should be a JSON object with the following fields:
//
// message: The message that should be displayed to the user.
// errors: An array of error messages that should be displayed to the user.
//
// To get the details of a user, make a GET request to the following URL: /user/:id
// The response should be a JSON object with the following fields:
//
// id: The id of the user.
// email: The email of the user.
// name: The name of the user.
// role: The role of the user.
//
// If the user is not found, the response should be a JSON object with the following fields:
//
// message: The message that should be displayed to the user.
//
// To update a user, make a PUT request to the following URL: /user/:id
// The body of the request should be a JSON object with the following fields:
//
// email: The email of the user.
// password: The password of the user.
// name: The name of the user.
// role: The role of the user.
//
// The response should be a JSON object with the following fields:
//
// message: The message that should be displayed to the user.
//
// If the user is not found, the response should be a JSON object with the following fields:
//
// message: The message that should be displayed to the user.
// errors: An array of error messages that should be displayed to the user.
//
// To delete a user, make a DELETE request to the following URL: /user/:id
// The response should be a JSON object with the following fields:
//
// message: The message that should be displayed to the user.
//
// If the user is not found, the response should be a JSON object with the following fields:
//
// message: The message that should be displayed to the user.
// errors: An array of error messages that should be displayed to the user.
//
// To get all users, make a GET request to the following URL: /user/all
// The response should be a JSON array with the following fields:
//
// id: The id of the user.
// email: The email of the user.
// name: The name of the user.
// role: The role of the user.
//
// If no users are found, the response should be a JSON object with the following fields:
//
// message: The message that should be displayed to the user.
//

//
// message: The message that should be displayed to the user.
// errors: An array of error messages that should be displayed to the user.
//
// To get all products of a user, make a GET request to the following URL: /product/user/:id
// The response should be a JSON array with the following fields:
//
// id: The id of the product.
// userId: The id of the user that created the product.
// name: The name of the product.
// price: The price of the product.
// quantity: The quantity of the product.
//

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
