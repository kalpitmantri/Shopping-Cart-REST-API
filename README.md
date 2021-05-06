# Shopping-Cart-REST-API

#### DESCRIPTION

 -    Built a REST Api in Node.js using MVC approch by leveraging Node.js + MongoDB.
 -    User JWT for Authetication and Authorization.
 -    A RESTful Api built for serving as a Backend for a Shopping Cart.

#### REQUIREMENTS

 - Node.js 10.12.0
 - MongoDb

#### INSTALLATION INSTRUCTIONS
-   Clone or download the repo. into any fresh temporary folder.
-   Cd into that root folder you just cloned locally.
-   Open terminal in the current folder and to install all dependencies type
    ```
    npm install
    ```
-   Now typing
    ```
    npm start
    ```
    will start a server !
    
    App should now be running on **localhost:3000**
         
### Dependencies 
 - For dependencies refer Package.json


### For Testing (Postman)
- Postman extension can be used for testing !
- Supercharge your API workflow with Postman! Build, test, and document your APIs faster.
- You can now fire up postman and then perform several operations on the REST API.
- Another easiest Way Means Best way By Using curl Install Curl on any Platform eg Windows or Linux
      Likewise U can Check Some Eg Of Test API
            
	    ---------   signup   ----------------
 
        1) Command for Curl :  curl -d "email=user1234@gmail.com&password=1sdfghdfg89" -X POST http://localhost:3000/user/signup


         U Will See as an  Responce : {"message":"User Successfully Created!!"}


            -------------- Login  --------------------

         2) Command for Curl :  curl -d "email=user1234@gmail.com&password=1sdfghdfg89" -X POST http://localhost:3000/user/login


          U Will See as an  Responce : {"message":"Auth               Successful!!","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1ha3dhbmFrYXJ0aWs1M0BnbWFpbC5jb20iLCJJZCI6IjYwOTQ1Y2VhOWNmY2I1MzE2OGVkYzQ1NSIsImlhdCI6MTYyMDMzNjMwMCwiZXhwIjoxNjIwMzM5OTAwfQ.8d2Egyq0glSMBnCSiP7KCk0aR7itfKNYVHvEKc24_PA"}


## Available API Routes

### [Products Routes](#1-product-routes)
| Routes        | Description           | 
| ------------- |:-------------:|
| [`GET/products/`](#a-get-list-of-all-products)    |Get list of all products|
| [`POST/products/`](#b-post-a-new-product)     | Post a new product |     
| [`GET/products/:productId`](#c-get-details-of-a-particular-product)| Get details of a particular product. |    
| [`PATCH/products/:productId`](#d-update-a-particular-product) | Update a particular product |
| [`DELETE/products/:productId`](#e-delete-a-particular-product) |Delete a particular product |

### [User Routes](#2-user-routes)
| Routes        | Description           | 
| ------------- |:-------------:|
| [`POST/user/signup`](#a-sign-up-a-new-user)    | Sign up a new user |
| [`POST/user/login`](#b-login-a-existing-user)     | Login a user |     
| [`DELETE/user/:userId`](#c-delete-a-user)|Delete a user from database |    

### [Order Routes](#3-order-routes)
| Routes        | Description           | 
| ------------- |:-------------:|
| [`GET/orders/`](#a-get-list-of-all-orders)    | Get all orders by the logged in user |
| [`POST/orders/`](#b-post-a-new-order)     | Post a new order for the logged in user |
| [`GET/orders/:orderId`](#c-get-details-of-a-particular-order)| Fetch details of a particular order |    
| [`DELETE/orders/:orderId`](#d-delete-a-particular-order) | Deletes a particular order |

## 1. Product Routes

### A. Get list of all Products.
Send Get request to fetch the list of Orders in JSON format..
```
Method: GET 
URL: /products/
Produces: application/json
```
  #### Example :
  - **Request** : /products/
  - **Response**:
  
    ````
    {
    "count": 3,
    "products": [
        {
            "_id": "5bdd9d946d97be54a4dc5666",
            "name": "Book",
            "price": 100,
            "request": {
                "type": "GET",
                "descripption": "Get details of the product.",
                "url": "http://localhost:3000/products/5bdd9d946d97be54a4dc5666"
            }
        },
        {
            "_id": "5bdda09560e88d867454fea3",
            "name": "Mobile",
            "price": 1800,
            "request": {
                "type": "GET",
                "descripption": "Get details of the product.",
                "url": "http://localhost:3000/products/5bdda09560e88d867454fea3"
            }
        },
        {
            "_id": "5bddbd3a3ab5bb2184a14764",
            "name": "headphones",
            "price": 300,
            "request": {
                "type": "GET",
                "descripption": "Get details of the product.",
                "url": "http://localhost:3000/products/5bddbd3a3ab5bb2184a14764"
            }
        }
      ]
    }
    ````

----

### B. Post a new product
  
  User must be logged in to do that.
  
```
Method: POST
URL: /products/
Authorization: Bearer {token}
Produces: application/json
```
#### Parameters :
| Field        | Type           |Required  |Description |
| ------------- |:-------------:|:-------:|:-----:|
| name   | String |Required    | Name of the product |
| price   | String |Required    | Price of the product |

#### Example :
- **Request:**  `/products/`

- **Response:**
````
{
    "message": "Product Created Successfully!!",
    "createdProduct": {
        "_id": "5c21e3f5c6cfb46d8c51b616",
        "name": "laptop",
        "price": 50000,
        "request": {
            "type": "GET",
            "description": "Get details of the product",
            "url": "http://localhost:3000/products/5c21e3f5c6cfb46d8c51b616"
        }
    }
}
````    
----

### C. Get details of a particular product

```
Method: GET
URL: /products/:productId
Produces: application/json
```
#### Example :
- **Request:**  `/products/5c21e3f5c6cfb46d8c51b616`

- **Response:**
````
{
    "product": {
        "_id": "5c21e3f5c6cfb46d8c51b616",
        "name": "laptop",
        "price": 50000
    },
    "request": {
        "type": "GET",
        "description": "Get list of all products",
        "url": "http://localhost:3000/products"
    }
}
````    
----

### D. Update a particular product
  User must be logged in to do that.
#### Parameters :
| Field        | Type           |Required  |Description |
| ------------- |:-------------:|:-------:|:-----:|
| name   | String | Not  |Updated name of the product |
| price   | String | Not  |Updated price of the product |

#### Request Body :
````
[
	{
		"propName":"name",
		"value":"T.V"
	},
  {
		"propName":"price",
		"value":"20000"
	}	
]
````
````
Method: PATCH
URL: /products/:productId
Authorization: Bearer {token}
Produces: application/json
````
#### Example :
- **Request:**  `/products/5c21e3f5c6cfb46d8c51b616`

- **Response:**
````
{
    "message": "Product Updated Successfully",
    "request": {
        "type": "GET",
        "description": "Get product details.",
        "url": "http://localhost:3000/products/5bdd9d946d97be54a4dc5666"
    }
}
````    
----
### E. Delete a particular product
  User must be logged in to do that.
```
Method: DELETE
URL: /products/:productId
Authorization: Bearer {token}
Produces: application/json
```
#### Example :
- **Request:**  `/products/5c21e3f5c6cfb46d8c51b616`

- **Response:**
````
{
    "message": "Product Deleted",
    "request": {
        "type": "POST",
        "description": "Create new Product",
        "url": "http://localhost:3000/products",
        "body": {
            "name": "String",
            "price": "Number"
        }
    }
}
````    
## 2. User Routes

### A. Sign up a new User.
  Sends a POST request to create a new user and returns a web token for further authentication.
```
Method: POST 
URL: /user/signup
Produces: application/json
```
#### Parameters :
| Field        | Type           |Required  |Description |
| ------------- |:-------------:|:-------:|:-----:|
| email   | Email |Required    | User Email |
| password   | String |Required    | password |

  #### Example :
  - **Request** : /user/signup
  - **Response**:
  
    ````
    {
      "message": "User Successfully Created!!"
    }
    ````

----

### B. Login a existing user

Sends a POST request to login a exisiting user
    
```
Method: POST
URL: /user/login
Produces: application/json
```
#### Parameters :
| Field        | Type           |Required  |Description |
| ------------- |:-------------:|:-------:|:-----:|
| email   | Email |Required    | User Email |
| password   | String |Required    | password |

#### Example :
- **Request:**  `/user/login`

- **Response:**
````
      {
        "message": "Auth Successful!!",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImthbHBpdEB0ZXN0LmNvbSIsIklkIjoiNWMyMWUxNGRjNmNmYjQ2ZDhjNTFiNjE1IiwiaWF0IjoxNTQ1NzI0MjcyLCJleHAiOjE1NDU3Mjc4NzJ9.0Ro0iBOO0I_mEjYHhQHPhXy0JmP_iAYhgZAHI3a4vkI"
      }
````    
----   
### C. Delete a user
```
Method: DELETE
URL: /user/:userId
Produces: application/json
```
#### Example :
- **Request:**  `/user/:userId`

- **Response:**
````
{
	"message":'User successfully deleted!!'
}
````    
## 3. Order Routes

### A. Get list of all Orders.
Send Get request to fetch the list of Orders by a User in JSON format.
User must be logged in to do that
```
Method: GET 
URL: /orders/
Authorization: Bearer {token}
Produces: application/json
```
  #### Example :
  - **Request** : /orders/
  - **Response**:
  
    ````
    {
    "count": 3,
    "orders": [
        {
            "_id": "5c21f7d6c6cfb46d8c51b61a",
            "product": {
                "_id": "5bdda09560e88d867454fea3",
                "name": "Mobile",
                "price": 1800
            },
            "request": {
                "type": "GET",
                "description": "Get details of the product",
                "url": "http://localhost:3000/orders/5c21f7d6c6cfb46d8c51b61a"
            }
        },
        {
            "_id": "5c21f87ec6cfb46d8c51b61b",
            "product": {
                "_id": "5bddbd3a3ab5bb2184a14764",
                "name": "headphones",
                "price": 300
            },
            "request": {
                "type": "GET",
                "description": "Get details of the product",
                "url": "http://localhost:3000/orders/5c21f87ec6cfb46d8c51b61b"
            }
        },
        {
            "_id": "5c21f89dc6cfb46d8c51b61c",
            "product": {
                "_id": "5bde81bf8a45ecca5cfac6ff",
                "name": "AC",
                "price": 4000
            },
            "request": {
                "type": "GET",
                "description": "Get details of the product",
                "url": "http://localhost:3000/orders/5c21f89dc6cfb46d8c51b61c"
            }
        }
      ]
    }
    ````
----

### B. Post a new order
  
  User must be logged in to do that.
  
```
Method: POST
URL: /orders/
Authorization: Bearer {token}
Produces: application/json
```
#### Parameters :
| Field        | Type           |Required  |Description |
| ------------- |:-------------:|:-------:|:-----:|
| productId   | String |Required    | Id of the product to be ordered |
| quantity   | integer |Required    | Quantity |

#### Example :
- **Request:**  `/orders/`

- **Response:**
````
{
    "message": "Order Successfully Placed",
    "createdOrder": {
        "_id": "5c21f7d6c6cfb46d8c51b61a",
        "product": "5bdda09560e88d867454fea3",
        "quantity": 5
    },
    "request": {
        "type": "GET",
        "description": "Get details of the order",
        "url": "http://localhost:3000/orders/5c21f7d6c6cfb46d8c51b61a"
    }
}
````    
----

### C. Get details of a particular order
  User must be logged in to do that
```
Method: GET
URL: /orders/:orderId
Authorization: Bearer {token}
Produces: application/json
```
#### Example :
- **Request:**  `/orders/5c21f7d6c6cfb46d8c51b61a`

- **Response:**
````
{
    "order": {
        "quantity": 5,
        "_id": "5c21f7d6c6cfb46d8c51b61a",
        "product": {
            "_id": "5bdda09560e88d867454fea3",
            "name": "Mobile",
            "price": 1800
        },
        "__v": 0
    },
    "request": {
        "type": "GET",
        "description": "Get all Orders",
        "url": "http://localhost:3000/orders/"
    }
}
````    
----
### D. Delete a particular order
  User must be logged in to do that.
```
Method: DELETE
URL: /orders/:orderId
Authorization: Bearer {token}
Produces: application/json
```
#### Example :
- **Request:**  `/orders/5c21f89dc6cfb46d8c51b61c`

- **Response:**
````
{
    "message": "Order Deleted",
    "request": {
        "type": "POST",
        "description": "Place new Order",
        "url": "http://localhost:3000/orders/"
    }
}
````    
