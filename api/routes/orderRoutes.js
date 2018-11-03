const express = require('express');
const router = express.Router();

router.get('/',(req,res,next)=>{
	res.status(200).json({
		message:"Getting all orders"
	});
});

router.post('/',(req,res,next)=>{
	const order = {
		productId : req.body.productId,
		quantity:req.body.quantity
	}
	res.status(201).json({
		order : order,   
		message : 'Post route for orders'
	});
});

router.get('/:orderId',(req,res,next)=>{
	var id = req.params.productId;
	res.status(200).json({
		message:"Getting a single order",
		id:id
	});
});

router.delete('/:orderId',(req,res,next)=>{
	res.status(200).json({
		message:'Order Deleted!!!'
	});
});

module.exports = router;
