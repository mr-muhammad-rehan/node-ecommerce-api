# Rest API For Products and Orders
  This is basic API for CRUD operations on Products and Orders

## File Tree
```
node-ecommerce-api/
┣ api/
┃ ┣ controller/
┃ ┃ ┣ orders.js
┃ ┃ ┗ products.js
┃ ┣ middleware/
┃ ┃ ┗ check-auth.js
┃ ┣ models/
┃ ┃ ┣ order.js
┃ ┃ ┣ products.js
┃ ┃ ┗ user.js
┃ ┗ routes/
┃ ┃ ┣ orders.js
┃ ┃ ┣ products.js
┃ ┃ ┗ user.js
┣ uploads/ 
┣ .gitignore
┣ app.js
┣ nodemon.json
┣ package-lock.json
┣ package.json
┣ README.md
┗ server.js
```

# Intro
This is basic express API to do some CRUD operations on mongoose, the idea is understend Authorization and  CRUD operations etc.

**Motive** 
Express is amazing when it comes to Node.js API's, This is a beginner tutorial for newbees.

# Product Routes

**GET www.domain.com/products/**
```
__Does not require Auth Header__
//Get all products in JSON array
{
    "count": PRODUCT COUNT,
    "products": [
        {
            "name": "PRODUCT NAME",
            "price": PRICE,
            "request": {
                "type": "GET",
                "url": "https://domain.com/products/ID"
            }
        }
    ]
}
```

**POST www.domain.com/products/**
```
__Required Auth Header__
//Create a product
FormData:
name: Required | String
price: Required | Number
image: Required | image
```

**GET www.domain.com/products/ID**
```
__Does not require Auth Header__
//JSON Object of product
{
    "_id": "PRODUCT ID",
    "name": "PRODUCT NAME",
    "price": PRICE 
}
```

**PATCH www.domain.com/products/ID**
```
__Require Auth Header__
//UPDATE a product
FormData:
name: Required | String
price: Required | Number
image: Required | image
```

**DELETE www.domain.com/products/ID**
```
__Require Auth Header__
//DELETE a product
```

# Order Routes
**GET www.domain.com/orders/**
```
__Require Auth Header__
//GET a orders
{
    "count": NUMBER OF ORDERS,
    "orders": [
        {
            "_id": "ORDER ID",
            "product": {
                "_id": "PRODUCT ID",
                "name": "PRODUCT NAME"
            } 
    ]
}
```


**POST www.domain.com/orders/**
```
__Require Auth Header__
//GET all orders
 {
  "productId": "PRODUCT_ID | REQUIRED",
  "quantity": QUANtity | NUMBER | NOT REQUIRED - DEFAULT 1
}
```

**GET www.domain.com/orders/ID**
```
__Require Auth Header__
//GET an order
 "_id": "ORDER ID",
 "product": {
     "_id": "PRODUCT ID",
     "name": "PRODUCT NAME"
 }
``` 

**DELETE www.domain.com/orders/ID**
```
__Require Auth Header__
//DELETE an order
``` 

**POST www.domain.com/useres/signup**
```
__Does Not Require Auth Header__
//CREATE a USER
{
	"email": EMAIL | REQUIRED,
	"password": PASSWORD | REQUIRED
}
``` 

**POST www.domain.com/useres/login**
```
__Does Not Require Auth Header__
//CREATE a USER
{
	"email": EMAIL | REQUIRED,
	"password": PASSWORD | REQUIRED
}

__RETURN__
{
    "message": "AUTH MESSAGE",
    "tocken": "TOKEN"
}
``` 

**DELETE www.domain.com/useres/ID**
```
__Does Not Require Auth Header__
//DELETE a USER
``` 


