const express = require("express");
const router = express.Router();
const mongoose = require("mongoose")

const Order = require("../models/order");

router.get('/', (req, res, next) => {
	res.status(200).json({
		message: "GET /orders is OK"
	})
})

router.post('/', (req, res, next) => {
	const order = new Order({
		_id: new mongoose.Types.ObjectId(),
		quantity: req.body.quantity,
		product: req.body.productId
	})
	console.log(order)

	order.save()
		.then((result) => {
			console.log(result)
			res.status(201).json(result)
		})
		.catch((err) => {
			console.log(err)
			res.status(500).json({
				error: err.message
			})
		})
})

router.get('/:orderId', (req, res, next) => {
	res.status(200).json({
		message: "GET order_detail is OK",
		orderId: req.params.orderId
	})
})

router.delete('/:orderId', (req, res, next) => {
	res.status(200).json({
		message: "Order deleted",
		orderId: req.params.orderId
	})
})

module.exports = router;

