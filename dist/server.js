"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const app = express();
//The port variable stores the desired port being used to listen to our application
const port = process.env.PORT || 3000;
//Ensures that the app can correctly parse any returned json object
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello World, this will be my new API');
});
//This is the general route used to change the database data.
app.use('/product', require('./route/product'));
//The app.listen will start listening to the API.
app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});
/*This error handler catches any errrors thrown during the execution. It works with the error handler middleware function
Found in utilities/utilities.ts/*/
app.use((err, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.error(`Error at: "${req.originalUrl}": ${err.message}`);
    res.status(500).send(`There was an error at ${req.originalUrl}`);
}));
