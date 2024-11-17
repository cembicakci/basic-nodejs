const mongoose = require("mongoose");
const Order = require("../models/order");
const Product = require("../models/product");

exports.products_get_all = (req, res, next) => {
	Product.find()
		.select("_id name price productImage")
		.exec()
		.then(docs => {
			const response = {
				count: docs.length,
				response: docs.map(doc => {
					return {
						name: doc.name,
						price: doc.price,
						productImage: doc.productImage,
						_id: doc._id,
						request: {
							type: "GET",
							url: "http://localhost:3000/products/" + doc._id
						}
					}
				})
			}
			res.status(200).json(response);
		})
		.catch(err => {
			console.log(err)
			res.status(500).json({ error: err });
		})
}

exports.products_create_product = (req, res, next) => {
	const product = new Product({
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		price: req.body.price,
		productImage: req.file.path
	});

	product.save()
		.then(result => {
			res.status(201).json({
				message: "POST products is OK",
				createdProduct: {
					name: result.name,
					price: result.price,
					productImage: result.productImage,
					_id: result._id,
					request: {
						type: "GET",
						url: "http://localhost:3000/products/" + result._id
					}
				}
			})
		})
		.catch(err => {
			console.log(err)
			res.status(500).json({ error: err })
		})
}

exports.products_get_product = (req, res, next) => {
	const { productId } = req.params
	Product.findById(productId)
		.select("_id name price productImage")
		.exec()
		.then(doc => {
			if (doc) {
				res.status(200).json({
					name: doc.name,
					price: doc.price,
					_id: doc._id,
					request: {
						type: "GET",
						url: "http://localhost:3000/products/" + doc._id
					}
				})
			} else {
				res.status(404).json({ message: "No valid product for provided id" })
			}
		})
		.catch(err => {
			console.log(err)
			res.status(500).json({ error: err })
		})
}

exports.products_patch_product = (req, res, next) => {
	const id = req.params.productId
	const updateOps = {}
	for (const ops of req.body) {
		updateOps[ops.propName] = ops.value
	}

	Product.updateOne({ _id: id }, { $set: updateOps })
		.exec()
		.then(result => {
			res.status(200).json({
				message: "Product Updated!",
				request: {
					type: "GET",
					url: "http://localhost:3000/products/" + result._id
				}
			})
		})
		.catch(err => {
			console.log(err)
			res.status(500).json({
				error: err
			})
		})
}

exports.products_delete_product = (req, res, next) => {
	const id = req.params.productId
	Product.deleteOne({ _id: id })
		.exec()
		.then(result => {
			res.status(201).json({
				message: "Product Deleted!"
			})
		})
		.catch(err => {
			console.log(err)
			res.status(500).json({
				error: err
			})
		})
}