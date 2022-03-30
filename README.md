# EXPRESS 

### Setup
1. Convert everything to typescript and leverage ES6 syntax
2. Use and setup the project with `Yarn`

## Problem Description:

Create A basic Express application, that makes a CRUD operation (create, read, update, delete) into a file database.json, document and publish your endpoints using postman.

## How will I complete this project?
- Your aplication should be able to perform.
  - `GET` Request which returns all the data in your database.json data
  - `POST` Request which adds data to your database.json file (Note: If there is no database.json on post, create one dynamically). Also, when posting data, the id, createdAt and updatedAt fields should be generated dynamically. The createdAt and updatedAt fields should be the current date in the format given below and the id can be generated randomly by an external package or through a custom auto increment logic done by you.
  - `PUT` Request which updates fields of a particular data using the id in the database.json file. If an object with the id sent in the request is not found in the database.json file, return a 404 response. Also, the id, createdAt and updatedAt fields should not be updated by the input from postman. The id and createdAt fields are to remain the same as they were at the point of creation while the updatedAt field should be changed dynamically to the current date whenever any field is updated.
  - `DELETE` Request which removes a particular data from your database.json file using the id. If an object with the id sent in the request is not found in the database.json file, return a 404 response

- Host your application on Heroku
- Data format example:

```
[
  {
    organization: "node ninja",
    createdAt: "2020-08-12T19:04:55.455Z",
    updatedAt: "2020-08-12T19:04:55.455Z",
    products: ["developers","pizza"],
    marketValue: "90%",
    address: "sangotedo",
    ceo: "cn",
    country: "Taiwan",
    id: 2,
    noOfEmployees:2,
    employees:["james bond","jackie chan"]
  }
]
```

## Test coverage
- Make sure you write test to cover your application using supertest and jest

### Test
- Test for a GET request
- Test for a POST request
- Test for a PUT request
- Test for a DELETE request
- Test to return proper HTTP status codes and response bodies

## Stretch Goals
- Validate all input coming to your server to ensure they have the required format and all fields have the specified types e.g organization should be a string and noOfEmployees should be a number