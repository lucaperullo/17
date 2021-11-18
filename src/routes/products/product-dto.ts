//PRODUCTS DTO

//HOW TO GET ALL THE PRODUCTS
//Performing a get request to /products will print
//all products from the database and return them as a json object to the client

//HOW TO GET A SPECIFIC PRODUCT
//Performing a get request to /products/:id will print
//a specific product from the database and return it as a json object to the client

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
    public id: string,
    public name: string,
    public price: number,
    public quantity: number,
    public disponibility: boolean
  ) {}
}
