const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.get('/', (req : any, res: any) => {
    res.send('Hello World, this will be my new API');
} )

app.use('/product', require('./route/product'));

app.listen(port, () => {
    console.log(`Server running at port ${port}`);
})