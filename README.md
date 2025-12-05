# node-shop-api

A simple RESTful API built with **Node.js**, **Express**, and **MongoDB**, following the Academind YouTube playlist tutorial.

This API supports user authentication, image uploads, CRUD operations, and MongoDB Atlas connectivity.


## Features

- **Products API** (Create, Read, Update, Delete)
- **Orders API**
- **User Signup & Login** (JWT Authentication)
- **Protected Routes** using middleware
- **File/Image Uploads** using Multer
- **MongoDB Atlas** Integration
- **Environment Variables** using dotenv


## Clone the repository
```
git clone https://github.com/vinahavrvani/node-shop-api.git

cd node-shop-api

npm install
```
## Environment Variables
```
MONGO_ATLAS_USER=yourUser

MONGO_ATLAS_PW=yourPassword

JWT_KEY=yourSecret
```

## Running the Server
```
npm start
```
## Protected Routes

To access protected routes, include your JWT token in the request header:

Authorization: Bearer <your_token_here>
