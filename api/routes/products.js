const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
	res.status(200).json({
		message: "GET products is OK"
	});
});

router.post("/", (req, res, next) => {
	res.status(201).json({
		message: "POST products is OK"
	});
});

router.get("/:productId", (req, res, next) => {
	const { productId } = req.params
	if (productId === "special") {
		res.status(200).json({
			message: "Special ID is OK",
			id: productId
		})
	} else {
		res.status(200).json({
			message: "Wrong Id",
			id: productId
		})
	}
})

router.patch("/:productId", (req, res, next) => {
	res.status(200).json({
		message: "Updated product!"
	})
})

router.delete("/:productId", (req, res, next) => {
	res.status(200).json({
		message: "Deleted product!"
	})
})

module.exports = router;