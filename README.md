# Overview

This application allows you to interact with your inventory using CRUD operations through a RESTful API.

Performing simple operations to control your inventory is the goal of this software. 

# Development Environment

The application was written using VS Code and it's written to depend on a basic connection to a mongoDB database.

The program was written in TypeScript and uses Express.js following a Model, View, and Controller structure.

It uses mongoose to connect and interact with the mongoDB database and Swagger for documentation.

# Useful Websites

Some useful references I used: 

- [Medium - Stackademic](https://blog.stackademic.com/how-to-create-api-documentation-fast-swagger-with-typescript-a5926acbed30)
- [W3Schools - Introduction to TypeScript](https://www.w3schools.com/typescript/typescript_intro.php)

# Future Work

Some of the things in my to-do list:

- Validation: Implement validation rules to avoid invalid data in the database.
- Search features: Add filtering and ordering functions to retrieve the data in a certain order or filter out some of the products.
- Perfect error handling: Refactorize the error handling so it better reflects what went wrong and how to fix it.

- Mock version: Include a testing module so the API can be used without having to create a mongoDB database.