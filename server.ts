const express = require('express');
import { Request, Response, NextFunction } from 'express';
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req : any, res: any) => {
    res.send('Hello World, this will be my new API');
} )

app.use('/product', require('./route/product'));

app.listen(port, () => {
    console.log(`Server running at port ${port}`);
})

app.use(async (err: Error, req: Request, res: Response, next : NextFunction) => {
  console.error(`Error at: "${req.originalUrl}": ${err.message}`);
  res.status(500).send(`There was an error at ${req.originalUrl}`);
});