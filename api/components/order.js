const Order = require('../models/order');
const Product = require('../models/product');
const mongoose = require('mongoose');

exports.getAllOrders = (req,res,next)=>{
	Order.find()
		 .select('_id product quatity')
		 .populate('product','name price')
		 .exec()
		 .then(docs=>{
		 	console.log(docs);
		 	res.status(200).json({
		 		count : docs.length,
		 		orders: docs.map(doc=>{
		 			return {
		 				_id:doc._id,
		 				product:doc.product,
		 				quantity:doc.quantity,
		 				request:{
		 					type:'GET',
		 					description:'Get details of the product',
		 					url:'http://localhost:3000/orders/' + doc._id
		 				}
		 			}
		 		})
		 	});
		 })
		 .catch(err=>{
		 	console.log(err);
		 	res.status(500).json({
		 		error:err
		 	});
		 })
};

exports.postNewOrder = (req,res,next)=>{
	Product.findById(req.body.productId)
		   .then(product=>{
		   		if(!product){
		   			return res.status(404).json({
		   				message:'Product Not Found'
		   			});
		   		}
		   		else{
					const order = new Order({
						_id: new mongoose.Types.ObjectId(),
						product:req.body.productId,
						quantity:req.body.quantity
					});
					return order.save();
		   		}
		   })
		   .then(result=>{
				res.status(201).json({
					message:"Order Successfully Placed",
					createdOrder:{
						_id:result._id,
						product:result.product,
						quantity:result.quantity,
					},
					request:{
					 	type:'GET',
					 	description:'Get details of the order',
					 	url:'http://localhost:3000/orders/' + result._id
					}
				});	
			})
			.catch(err=>{
				// console.log(err);
			  	res.status(500).json({
			  		error:err
			  	});
			});
};

exports.getOrder = (req,res,next)=>{
	var id = req.params.orderId;
	Order.findById(id)
		 .populate('product','_id name price')
		 .exec()
		 .then(order=>{
		 	if(!order){
		 		return res.status(404).json({
		 			message:"Order Not Found!!!"
		 		});
		 	}
		 	res.status(200).json({
		 		order:order,
		 		request:{
		 			type:'GET',
		 			description:'Get all Orders',
		 			url:'http://localhost:3000/orders/'
		 		}
		 	});
		 })
		 .catch(err=>{
		 	res.status(500).json({
		 		error:err
		 	})
		 });
}

exports.deleteOrder = (req,res,next)=>{
	const orderId = req.params.orderId;
	Order.remove({_id:orderId})
		 .exec()
		 .then(result=>{
		 	res.status(200).json({
		 		message:'Order Deleted',
		 		request:{
		 			type:'POST',
		 			description:'Place new Order',
		 			url:'http://localhost:3000/orders/'
		 		}
		 	});
		 })
		 .catch(err=>{
		 	res.status(500).json({
		 		error:err
		 	});
		 });
}