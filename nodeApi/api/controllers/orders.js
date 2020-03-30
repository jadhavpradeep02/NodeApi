const Order = require('../models/order');
const Product = require('../models/product');
const mongoose = require('mongoose');

exports.orders_all_get = (req, res, next) => {
    Order.find()
    .select('quantity product _id')
    .exec()
    .then(docs => {
        console.log(docs);
        res.status(200).json({
            count: docs.length,
            orders: docs.map(doc => {
                return {
                    _id: doc._id,
                    product: doc.product,
                    quantity: doc.quantity,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/orders/' + doc._id
                    }
                }
            })
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
};

exports.orders_create_order = (req, res, next) => {
    const order = new Order({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId
    });
    order.save()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: 'Order Stores',
            createdOrder:{
                _id: result._id,
                product: result.product,
                quantity: result.quantity
            },
            request: {
                type:'GET',
                url:'http://localhost:3000/orders/' + result._id 
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
}

exports.orders_get_order = (req, res, next) => {
    Order.findById(req.params.orderId).exec()
    .then(order => {
        res.status('200').json({
            oreder: order,
            request: {
                type: 'GET',
                url:'http://localhost:3000/orders/'+order._id
            }
        });    
    }).catch(err =>{
        res.status(500).json({
            error: err
        });
    });
}

exports.orders_delete_order = (req, res, next) => {
    Order.remove({ _id : req.params.orderId})
    .exec()
    .then(result => {
        res.status('200').json({
            message: "Order Deleted",
            request: {
                type: 'POST',
                url:'http://localhost:3000/orders/'+result._id,
                body: {productId: "ID", quantity: "NUMBER"}
            }
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
}