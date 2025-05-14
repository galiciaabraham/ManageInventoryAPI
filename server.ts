const express = require('express');
import { Request, Response, NextFunction } from 'express';
const app = express();
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "./swagger_output.json";

//The port variable stores the desired port being used to listen to our application
const port = process.env.PORT || 3000;

//Ensures that the app can correctly parse any returned json object
app.use(express.json());

app.get('/', (req : any, res: any) => {
    res.send('Hello World, this will be my new API');
})

//This is the general route used to change the database data.
app.use('/product', require('./route/product'));

/*Swagger used for documentation*/
app.use("/api-docs", swaggerUi.serve);
app.get("/api-docs", swaggerUi.setup(swaggerOutput));

//The app.listen will start listening to the API.
app.listen(port, () => {
    console.log(`Server running at port ${port}`);
})

/*This error handler catches any errrors thrown during the execution. It works with the error handler middleware function
Found in utilities/utilities.ts/*/
app.use(async (err: Error, req: Request, res: Response, next : NextFunction) => {
  console.error(`Error at: "${req.originalUrl}": ${err.message}`);
  res.status(500).send(`There was an error at ${req.originalUrl}`);
});