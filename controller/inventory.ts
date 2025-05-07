const model = require('../model/mongoose');

const getProductById = async (req: any, res: any) => {
    const id = req.params.id;
    try {
        await model.productModels.find({product_id : id})
        .then(function(data : object) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(data);
        });
    } catch (error) {
            res.status(500).send('An error has occured while retreiving the data, Oh no!');
    }
}

module.exports = { getProductById};